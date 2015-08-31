// appointments 

var app = app || {};
app.blueprints = app.blueprints || {};
app.active = app.active || {};

/*----------------------------------------------------
		M O D E L  C O N S T R U C T O R S
----------------------------------------------------*/	
app.blueprints.appointmentModel = Backbone.Model.extend({
	initialize: function() {
		console.log('An appointment model has been instantiated...')

	}
});

/*----------------------------------------------------
	C O L L E C T I O N  C O N S T R U C T O R S
----------------------------------------------------*/
app.blueprints.appointmentCollection = Backbone.Collection.extend({
	url: 'api/appointments',
	model: app.blueprints.appointmentModel,
	initialize: function() {
		console.log('An appointment collection has been instantiated...');
		this.fetch();
		this.on('change', function() {
			this.fetch();
		});
	}
});

$(document).ready(function() {

	/*----------------------------------------------------
				I N S T A N T I A T I O N
	----------------------------------------------------*/
	app.active.appointmentCollection = new app.blueprints.appointmentCollection();

}); // end document.ready
