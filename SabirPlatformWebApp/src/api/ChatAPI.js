/**
 * Created by sabir on 06.04.17.
 */
import * as constants from '../constants/config'
import Parse from 'parse'

const ChatAPI = {

    transformChatMessage: function(m){
        if (m == undefined){
            return undefined;
        }
        return {
            id: m.id,
            timestamp: (new Date(m.createdAt)).getTime(),
            updatedTimestamp: (new Date(m.updatedAt)).getTime(),
            status: m.get('status'),

            viewed: (m.get('viewed') == undefined) ? false : m.get('viewed'),

            content: m.get('content'),
            attachments: m.get('attachments'),
            fromId: m.get('fromId'),
            toId: m.get('toId')
        }
    },

    //this method requires fromId, toId, lastUpdatedAt timestamp
    loadPairMessages: function(data, success, error){
        if (data == undefined){
            error({message: 'data is not defined'});
            return;
        }
        if (data.fromId == undefined || data.toId == undefined){
            error({message: 'fromId or toId is not defined'});
            return;
        }
        var fromTimestamp = (data.lastUpdatedAt == undefined) ? 0 : data.lastUpdatedAt;

        var date = new Date(+fromTimestamp);
        var usersIds = [data.fromId, data.toId];

        var q = new Parse.Query('ChatMessage');
        q.limit(100000);

        q.greaterThan('updatedAt', date);
        q.containedIn('fromId', usersIds);
        q.containedIn('toId', usersIds);
        q.addDescending('updatedAt');

        var self = this;

        q.find(function(results){
            if (results == undefined){
                results = [];
            }
            results = results.map(function(r){
                return self.transformChatMessage(r);
            });
            success(results);
        });
    },

    loadUserMessages: function(data, success, error){
        var fromTimestamp = (data.lastUpdatedAt == undefined) ? 0 : data.lastUpdatedAt;
        var date = new Date(+fromTimestamp);

        var toMeQ = new Parse.Query('ChatMessage');
        toMeQ.equalTo('toId', data.userId);
        toMeQ.greaterThan('updatedAt', date);
        var fromMeQ = new Parse.Query('ChatMessage');
        fromMeQ.equalTo('fromId', data.userId);
        fromMeQ.greaterThan('updatedAt', date);
        var q = Parse.Query.or(toMeQ, fromMeQ);
        q.limit(10000);
        var self = this;
        return new Promise(function(resolve, reject){
            q.find(function(results){
                results = results.map(function(message){
                    return self.transformChatMessage(message);
                });
                resolve(results);
            });
        })
    },

    createMessage: function(data, success, error){
        var ChatMessage = Parse.Object.extend('ChatMessage');
        var m = new ChatMessage();
        var allowedMap = {fromId: '', toId: '', content: '', attachments: ''};
        for (var key in data){
            if (allowedMap[key] == undefined){
                continue;
            }
            m.set(key, data[key]);
        }
        var self = this;
        return new Promise(function(resolve, reject){
            m.save().then(function(savedMessage){
                resolve(self.transformChatMessage(savedMessage));
            })
        });
    },

    makeMessagesViewed: function(ids){
        var self = this;
        return new Promise(function(resolve, reject){
            if (ids == undefined || ids.length == 0){
                resolve([]);
                return;
            }
            var q = new Parse.Query('ChatMessage');
            q.containedIn('objectId', ids);
            q.find(function(results){
                for (var i in results){
                    results[i].set('viewed', true);
                }
                Parse.Object.saveAll(results, {
                    success: function(savedMessages){
                        savedMessages = savedMessages.map(function(m){
                            return self.transformChatMessage(m)
                        });
                        resolve(savedMessages);
                    },
                    error: function(e){
                        reject(e);
                    }
                });
            });
        });
    }


}

export  default ChatAPI;