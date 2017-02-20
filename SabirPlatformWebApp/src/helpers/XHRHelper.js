/**
 * Created by sabir on 07.01.17.
 */

const XHRHelper = {

    UPLOAD_IMAGE_URL: 'http://ecgexpress.sabir.pro/upload.php',

    getXmlHttp: function(){
        var xmlhttp;
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                xmlhttp = false;
            }
        }
        if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
            xmlhttp = new XMLHttpRequest();
        }
        return xmlhttp;
    },

    //returns blob uri
    loadFile: function(url, onSuccess, onError, onProgress, asBlob){
        console.log('loadFile: url = ', url);
        if (url == undefined){
            return;
        }
        var xmlhttp = this.getXmlHttp();
        xmlhttp.responseType = "blob";
        xmlhttp.onload = function() {
            if (this.status == 200) {
                if (asBlob == true){
                    onSuccess(this.response);
                }else {
                    var blob_uri = URL.createObjectURL(this.response);
                    onSuccess(blob_uri);
                }
            }else {
                if (onError != undefined){
                    onError();
                }
            }
        };
        xmlhttp.onerror = function(){
            if (onError != undefined){
                onError();
            }
        }
        xmlhttp.onprogress = function(event){
            if (onProgress != undefined){
                onProgress(event.loaded, event.total);
            }
        }
        xmlhttp.open('GET', url, true);
        xmlhttp.send(null);
    },


    loadFileAsBlobAsPromise: function(url){
        console.log('loadFileAsBlobAsPromise: url = ' + url);
        var self = this;
        return new Promise(function(resolve, reject){
            self.loadFile(url, function(blob){
                resolve({blob: blob, url: url});
            }, function(){
                reject();
            }, undefined, true);
        });
    },

    uploadFile: function(file, onSuccess, onError, onProgress){
        var uploadUrl = 'http://ecgexpress.sabir.pro/dropzone/upload.php';
        var baseDir = 'http://www.englishpatientdrive.pw/dropzone/uploads/';

        var xhr = this.getXmlHttp();
        var formData = new FormData();
        formData.append("file", file);

        xhr.onload = function() {
            if (this.status == 200) {
                console.log('onload occured: this.response = ', this.response);
                onSuccess(baseDir + this.response);
                //var blob_uri = URL.createObjectURL(this.response);
                //onSuccess(blob_uri);
            }else {
                //onError();
            }
        };
        xhr.onerror = function(){
            onError();
        }
        xhr.upload.onprogress = function(event){
            if (onProgress != undefined){
                console.log('onprogress: event = ', event);
                var perc = Math.round(1000.0 * event.loaded / event.total) / 10.0;
                onProgress(perc);
                //onProgress(event.loaded, event.total);
            }
        }
        xhr.open('POST', uploadUrl, true);
        xhr.send(formData);
    },

    uploadImage: function(file, onSuccess, onError, onProgress){
        console.log('uploadImage: file = ', file);

        var uploadUrl = this.UPLOAD_IMAGE_URL;
        var xhr = this.getXmlHttp();
        var formData = new FormData();
        formData.append("file", file);

        xhr.onload = function() {
            if (this.status == 200) {
                console.log('onload occured: this.response = ', this.response);
                onSuccess(JSON.parse(this.response));
            }else {
                onError();
            }
        };
        xhr.onerror = function(){
            onError();
        }
        xhr.upload.onprogress = function(event){
            if (onProgress != undefined){
                console.log('onprogress: event = ', event);
                var perc = Math.round(1000.0 * event.loaded / event.total) / 10.0;
                onProgress(perc);
            }
        }
        xhr.open('POST', uploadUrl, true);
        xhr.send(formData);
    },

    uploadImageAsPromise: function(file){
        var self = this;
        return new Promise(function(resolve, reject){
            self.uploadImage(file, function(uploadedObj){
                resolve(uploadedObj);
            }, function(){
                reject();
            }, ()=>{}, ()=>{});
        });
    }

}

export default XHRHelper
