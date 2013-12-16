jQuery Lazy Script Plugin
====================

##Overview
jQuery plugin for lazy loading scripts to reduce the page loading time.


###Lazy Types
Lazy types are: scroll, visible, click, hover, delay

###With lazy type :scroll 
scripts are loaded when the window is scrolled.
````javascript
    var options = {
        type: "scroll",
        scripts: [
			"http://platform.twitter.com/widgets.js",
			"http://connect.facebook.net/en_US/all.js#xfbml=1&appId=445577382175430",
			"https://apis.google.com/js/plusone.js"
				],
        success: function () {
             FB.init({ status: true, cookie: true, xfbml: true });
        }
    };
    $.lazyscript(options);
````

###With lazy type : visible
scripts are loaded when a specific div is visible on-screen ( while scrolling).
````javascript
    var options = {
        type: "visible",
        id:"mydiv", //div Id
        scripts: [
			"1.js",
			"2.js",
			"3.js"
				],
        success: function () {
        
        }
    };
    $.lazyscript(options);

````

###with lazy type: click
scripts are loaded when clicked on a div
````javascript
    var options = {
        type: "click",
        id:"mybutton",
        scripts: [
			"1.js",
			"2.js",
			"3.js"
				],
        success: function () {
        
        }
    };
    $.lazyscript(options);

````

###with lazy type: hover
scripts are loaded when mouse hover on a div
````javascript
    var options = {
        type: "hover",
        id:"mybutton",
        scripts: [
			"1.js",
			"2.js",
			"3.js"
				],
        success: function () {
        
        }
    };
    $.lazyscript(options);

````

###with lazy type: delay
scripts are loaded with some delay
````javascript
    var options = {
        type: "delay",
        time:5000, //5secs
        scripts: [
			"1.js",
			"2.js",
			"3.js"
				],
        success: function () {
        
        }
    };
    $.lazyscript(options);

````

####Tutorial
---
http://hayageek.com/examples/jquery/lazy-script/index.php
