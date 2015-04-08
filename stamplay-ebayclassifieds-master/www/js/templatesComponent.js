angular.module('starter.templatesComponent', [])
.factory('EmailTemplate', function(){
	return {
		confirmPublish : function(scope, item){
			return data = {
							to:       scope.publish.email,
							toname:   scope.publish.email, 
					 		from:     'stambay@stamplay.com',
					 		fromname: 'StamBay',
					 		subject:  'Offer '+ item.name,
					 		body:     'Please copy the code and insert to app for complete the publish of your offers </br> '+
					 							'Code : '+item._id
						}
		},
		contactSeller: function(scope, item){
			return data = {
							to:       item.email,
							toname:   item.email, 
					 		from:     scope.contact.email,
					 		fromname: 'StamBay',
					 		subject:  'Offer '+ item.name,
					 		body:     scope.contact.text
						}
		}
	}				
})
.factory('PopupTemplate', function(){
	return {
		popupEmailPublish : function(){
			return data = {
					     title: 'An Email sent to You',
					     template: 'Check the email and confirm the publish',
							 buttons: [{text: '<b>Ok</b>',
							        		type: 'button-energized'}]
							 }
		},
		deleteItem: function(){
			return data = {
		     title: 'Delete an Offer',
		     template: 'Are you sure you want to delete this offer?',
				 okText: 'Delete', 
				 okType: 'button-energized'
			}
		},
		confirmItem : function($scope){
			return data = {
		    template: '<input type="text" ng-model="modal.itemId">',
		    title: 'Enter code',
		    subTitle: 'Enter the code we sent you via email',
		    scope: $scope,
		    buttons: [
		      { text: 'Cancel' },
		      {
		        text: '<b>Save</b>',
		        type: 'button-energized',
		        onTap: function(e) {
		          if (!$scope.modal.itemId || $scope.modal.itemId.length != 24) {
		            e.preventDefault();
		          } else {
		          	 return $scope.modal.itemId
		          }
		        }
		      }
	    	]
	  	}
		}
	}				
})

