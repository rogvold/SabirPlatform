/**
 * Created by sabir on 25.03.17.
 */

import * as constants from '../constants/config'
import Parse from 'parse/react-native'

const CommentsAPI = {

    transformComment(s){
        if (s == undefined){
            return null;
        }
        return {
            id: s.id,
            timestamp: (new Date(s.createdAt)).getTime(),
            updatedTimestamp: (new Date(s.updatedAt)).getTime(),
            userId: s.get('userId'),

            relatedId: s.get('relatedId'),
            text: s.get('text')
        }
    }

}

export  default CommentsAPI;