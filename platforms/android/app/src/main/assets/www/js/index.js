/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.initialSetups();
        setRandomBg()
    },

    // Update DOM on a Received Event
    initialSetups: function() {
        $('.show-verse a').on('click', function() {
            $('.loading-error').css('display', 'none');
            $('.loading-verse').css('display','block');
            $('.show-verse').css('display', 'none');
            getDailyVerse();
        });
        $('.social-share').on('click', function () {
            $('.social-share').css('display', 'none');
            savePhoto();
        });
    }
};

function getDailyVerse() {
    $.ajax({
        url: 'https://beta.ourmanna.com/api/v1/get/?format=json&order=random',
        datatype: 'json',
        error: function () {
            $('.loading-verse').css('display', 'none');
            // $('.loading-error').css('display', 'block');
            $('.show-verse').text('Error! Please try again.');
            $('.show-verse').css('display', 'block');
        },
        success: function (data) {
            $('.verse-text').text(data.verse.details.text);
            $('.verse-ref').text(data.verse.details.reference);
            $('.loading-verse').css('display', 'none');
            $('.verse-inner').css({ 'opacity': '1' });
            $('.social-share').css('display', 'block');
        },
        type: 'GET'
    });
}

function savePhoto() {
    navigator.screenshot.save(function (error, res) {
        if (error) {
            //console.error(error);
            //$('.social-share').text('Error...');
        } else {
            //console.log('ok', res.filePath);
            //$('.social-share').text(res.filePath);
            sharePhoto(res.filePath);
        }
    }, 'jpg', 50);
}

function sharePhoto(filePath) {
    window.plugins.socialsharing.share(null, null, 'file://'+filePath, function () { /*console.log('share ok')*/ }, function (errormsg) { $('.social-share').css('display', 'block'); });
    
}
function setRandomBg(){
    let randomNum = Math.ceil(Math.random()*11);
    $('body').css('background-image', "url(img/bg"+randomNum+".jpg)");
}

app.initialize();