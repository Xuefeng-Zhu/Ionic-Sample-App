stamplay-ebayclassifieds
========================

A mobile Post &amp; Search free local classifieds app like Ebay's one. Built with Ionic Framework

![EbayClassifieds](http://blog.stamplay.com/wp-content/uploads/2014/10/white.jpg "EbayClassifieds")

This time we go mobile! Today’s tutorial will show you how to use Stamplay with the amazing Ionic Framework to create a fully fledged native mobile app. We wanted to deliver something that can be reused in many context so we decided to build an Ebay Classifieds clone to let users post, search and sell their items.

We love javascript and front end framework and this time we show you how you can create this app using Ionic and [AngularJS](http://angularjs.org) to implement the client side logic. Here are the user stories for this example:

* as a guest user I can read and search posted items filtering them by Category or City
* as a guest user I can post an item I’d like to sell
* as a guest user I need to confirm to have provided valid email address before posting a new item
* as a guest/logged user I can reach out to the owner of an item I want
* as a logged user I can to track my listings
* as a guest/logged user I can get in touch with the app adminsitrator
* as a guest user I can signup with email and password to be able to fully interact with the content of the website.

To start building your own version of this great tutorial go and create a new project on [Stamplay](https://stamplay.com) , follow this guide to see how to configure the back-end and then use the code on the Github repository to build your native client.

-----------------------
# Anatomy

This Ebay Classifieds clone is built around the following building blocks

* [Users](https://www.stamplay.com/docs#user)
* [Custom Objects](https://www.stamplay.com/docs#customobject)
* Mailchimp
* [Email](https://www.stamplay.com/docs#email)


After creating a new app on Stamplay let’s start by picking the component we need in this app that are. Lets see one-by-one how they are configured:

### User

We chose to not do fancy things on the user signup this time and to go for the classic email+password. So we really only need to add the user component to our app recipe :)

### Custom Object

Let’s define the entities for this app, we will define “Item”, “Category” and “Area” that are defined as follows:

##### Item

* Name: `photo`, Type: `file`, required, the item’s picture
* Name: `price`, Type: `number`, required, the item’s price
* Name: `description`, Type: `string`, required, the author of the question (it will contain one user’s _id)
* Name: `email`, Type: string, `optional`, the item’s owner email address
* Name: `address`, Type: `string`, answers posted for the current question listed as an array of answer’s _id s
* Name: `tags`, Type: `collection` of category, the categories associated to the item listed as an array of categories’ _id
* Name: `name`, Type: `string`, required, the name of the item
* Name: `area`, Type: `relation` to an area, required, the item’s owner area
* Name: `telephone`, Type: `string`, required, the item’s owner phone number
* Name: `user`, Type: `user_relation`, optional, the user who published this item
* Name: `published`, Type: `boolean`, required, the status of the item (public or not)

##### Category

the categories available to classify posted items. These can be created only by the admin:

* Name: `name`, Type: `string`, required, the name of the category

##### Area

the categories available to classify posted items. These can be created only by the admin:

Name: `name`, Type: `string`, unique, required, area’s name

After setting up this Stamplay will instantly expose Restful APIs for our newly resources the following URIs:

`https://APPID.stamplay.com/api/cobject/v0/item`
`https://APPID.stamplay.com/api/cobject/v0/category`
`https://APPID.stamplay.com/api/cobject/v0/area`

##### Email

This component doesn’t need any setup, couldn’t be easier than that ;)


-----------------------


## Creating the server side logic with Tasks

Now let's add the tasks that will define the server side of our app. For our app we want that:

### When a user signs up, send him a welcome email

Trigger : User - Signup

Action: Email - Send

**User signup configuration**

	none

**Email Send configuration**

	to: {{user.email}} 
	  from: classifieds@stamplay.com 
  	  name: "Stamplay Classifieds"
	  Subject: "Thanks for ordering with Stamplay FoodMe"
	  Body: "Hi {{user.name.firstName}}, <br/> 
	        welcome to our Post and Search mobile service
	        <br/>
	        the easiest way to share what you want to sell search what you want to buy!"

-----------------------

### Adding initial content to the app

In the Admin section you can edit and manage data saved by your app. Here you can add content and we will now use it to create the tags that we want to make available. Click on “Admin” and then “Custom-Object” to access to the data admin section, then select “Area” or “Category” from the dropdown and start adding yours.

![EbayClassifieds Admin](http://blog.stamplay.com/wp-content/uploads/2014/10/Schermata-2014-10-07-alle-15.17.26.png "EbayClassifieds Admin")


-----------------------

## The app built with Ionic

The Ionic app is organized with a router, a service and some controllers to handle the front end logic. Let’s analyze more in depth how they’re defined.

##### Get Ionic framework our machine.

Make sure you have an up-to-date version of Node.js installed on your system. If you don’t have Node.js installed, you can install it from here. Open a terminal window and install Cordova and Ionic:

	npm install -g cordova ionic

##### Getting the project

First, clone this repository :

	git clone git@github.com:Stamplay/stamplay-ebayclassifieds

Or download it as a zip file

	https://github.com/Stamplay/stamplay-ebayclassifieds/archive/master.zip

Configure App Id, API key and Base URL

Once you have downloaded the project you need to type in the app.js file the authorization credential to enable your app talking with our cloud platform. You can find all these informations in your app settings view.

![EbayClassifieds Admin](http://blog.stamplay.com/wp-content/uploads/2014/10/Schermata-2014-10-07-alle-12.39.13.png "EbayClassifieds Admin")


##### Preview the app

If you did all the previous steps on stamplay.com you can now preview the app in the iOS (or Android) emulator by launching the following commands from the root of your project folder:

iOS (requires iOS dev environment installed on a Mac)

	ionic platform ios  //adds the ios platform to your project
	ionic emulate ios --target="iPhone (Retina 4-inch)"

Android (requires Android dev environment installed)

	ionic platform android  //adds the android platform to your project
	ionic emulate android
	
\**Currently on iOS 8 emulator there is a known issue that prevent the keyboard and picker views to be shown correctly. So if you can’t see that be sure that “Connect Hardware Keyboard” isn’t selected.*

![EbayClassifieds iOS emulator](http://blog.stamplay.com/wp-content/uploads/2014/10/Schermata-2014-10-07-alle-14.15.26.png "EbayClassifieds iOS emulator")



## The architecture made with AngularJS

##### /www/js/app.js

This is the Ionic app starter and the Angular way of creating an application. Here we are telling angular to include the ionic module which includes all of the Ionic code which will process the tags above and make our app come to life.

“Angular.module” is a global place for creating, registering and retrieving Angular modules. ‘starter’ is the name of this angular module (also set in a <body> attribute in index.html).  ‘starter.services’ is found in services.js while ‘starter.controllers’ is found in controllers.js

App.js also contain the router that is in charge to load and deliver the right view reacting to URL changes so its main scope is to list the urls that our AngularJS app need to resolve. The routes are:

	/tab
	/item
	/item/:itemid  – to show item details
	/publish – to show publish item view
	/account – to show user account view
	/settings – to show app settings
	/settings/login – shows the login form
	/settings/signup – shows the form to let guest users to register
	/settings/contact – shows the a contact form
	/settings/terms – terms of agreement of our app


##### /www/js/services.js

this file contains the service factories that are leveraged by the whole app to make API requests against the platform. Moreover it has a main Promise, used by every API call that setup the HTTP Headers needed to make an authenticated request using your App Id and Api Key.

```
	.factory('Promise',function($http, APPID, APIKEY, BASEURL){
 	    return {
   		resolve : function(data){
     		   data.url = BASEURL + data.url 
     		   if(!data.headers)
       		      data.headers = {}
     		   data.headers.Authorization = 'Basic '+ btoa(APPID+":"+APIKEY);
     		   var call = $http(data)
     		   return call;
   		}
 	    }
	})
```

##### /www/js/controllers.js

AngularJS controllers act as the glue between views and services. A controller often invokes a method in a service to get data that it stores in a scope variable so that it can be displayed by the view. In this module, you find the following controllers:

**FindCtrl**, Item manages the serach result list view
**ItemCtrl** manages the item details view.
**PublishCtrl** manages the publish item view
**AccountCtrl** manages the user account view
**SettingsCtrl** manages the settings view
**LoginCtrl** manages the user login and signup view


That’s it, you can keep navigating through the code available on GitHub and tell us if you need anything. So for any questions drop an email to giuliano.iacobelli@stamplay.com :)

Ciao!


