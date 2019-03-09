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
let app = {
    pages: [],
    show: new Event('show'),
    init:function(){
        app.pages = document.querySelectorAll(".page");
        app.pages.forEach((pg)=>{
            pg.addEventListener("show", app.pageShown);
        })

        document.querySelectorAll(".link").forEach((link)=>{
            link.addEventListener("click", app.nav);
        })
        history.replaceState({}, "Home", "#home");
        window.addEventListener('hashchange', app.poppin);
        app.addListeners();
    },
    nav:function(ev){
        ev.preventDefault();
        let currentPage = ev.target.getAttribute('data-target');
        document.querySelector('.active').classList.remove("active");
        document.getElementById(currentPage).classList.add('active');
        history.pushState({}, currentPage, `#${currentPage}`);
    },
    pageShown: function(ev){

    },
    poppin: function(ev){
        console.log(location.hash, 'popstate event');
    },
        
    
    addListeners: function() {
        document.querySelector("#add-btn").addEventListener("click", app.addNote);
        cordova.plugins.notification.local.on("click", function(notification) {
            navigator.notification.alert("clicked: " + notification.id);

            console.log(notification.data);
        });
        cordova.plugins.notification.local.on("trigger", function(notification){
            navigator.notification.alert("triggered: ", notification.id);
        });
    },

    addNote: function(ev) {
        //let props = cordova.plugins.notification.local.getDefaults();

        let inOneMin = new Date();
        inOneMin.setMinutes(inOneMin.getMinutes() + 1);
        let id = new Date().getMilliseconds();

        let noteOptions = {
            id: id,
            title: "This is the Title",
            text: "Don't forget to do the thing!",
            at: inOneMin,
            badge: 1,
            data: {
                prop: "prop value",
                num: 42
            }
        };

        cordova.plugins.notification.local.schedule(noteOptions);

        cordova.plugins.notification.local.GetScheduled(poop => {
            let list = document.getElementById()
        })

        navigator.notification.alert("Added notification id " + id);

        cordova.plugins.notification.local.cancel(id, function() {
        });
        cordova.plugins.notification.local.clear(id, function() {
        });
        cordova.plugins.notification.local.isPresent(id, function(present) {
        });
    }
    // Application Constructor
    // initialize: function() {
    //     document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    // },

    // // deviceready Event Handler
    // //
    // // Bind any cordova events here. Common events are:
    // // 'pause', 'resume', etc.
    // onDeviceReady: function() {
    //     this.receivedEvent('deviceready');
    // },

    // // Update DOM on a Received Event
    // receivedEvent: function(id) {
    //     var parentElement = document.getElementById(id);
    //     var listeningElement = parentElement.querySelector('.listening');
    //     var receivedElement = parentElement.querySelector('.received');

    //     listeningElement.setAttribute('style', 'display:none;');
    //     receivedElement.setAttribute('style', 'display:block;');

    //     console.log('Received Event: ' + id);
    // }
};

document.addEventListener('deviceready', app.init);

//app.initialize();
