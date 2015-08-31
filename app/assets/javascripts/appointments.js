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

/*----------------------------------------------------
		V I E W  C O N S T R U C T O R S
----------------------------------------------------*/
app.blueprints.appointmentCollectionView = Backbone.View.extend({
	initialize: function() {
		console.log('an appointment collection view was instantiated');
		this.$el = $('#admin-each-appointment');
		this.render();
		var that = this;
		this.collection.on('sync', function() {
			that.render();
		});
	},
	render: function() {
		this.$el.html('');
		this.collection.models.forEach(function(model) {
			new app.blueprints.appointmentModelView({
				model: model
			});
		});
	}
});

app.blueprints.appointmentModelView = Backbone.View.extend({
		initialize: function() {
			console.log('An appointment model view has been instantiated');
			this.$el = $('#admin-each-appointment');
			this.render();
		}, 
		render: function() {
			// make the date fields are
			this.model.attributes.date_time = $.datepicker.formatDate('MM dd, yy', datify(this.model.attributes.date_time));
			this.model.attributes.created_at = $.datepicker.formatDate('MM dd, yy', datify(this.model.attributes.created_at));
			this.model.attributes.updated_at = $.datepicker.formatDate('MM dd, yy', datify(this.model.attributes.updated_at));

			var viewTemplate = $('#appointments-list-template').html();
			var renderTemplate = _.template(viewTemplate);
			var renderedData = renderTemplate(this.model.attributes);
			renderedData.date_time = new Date(renderedData.date_time);			
			this.$el.append(renderedData);
		}
});

$(document).ready(function() {
	console.log('----------------------------------');
	console.log('I am in doc.ready appointment.js..');
	console.log('----------------------------------');	
	/*----------------------------------------------------
		A P P O I N T M E N T  I N S T A N T I A T I O N
	----------------------------------------------------*/
	app.active.appointmentCollection = new app.blueprints.appointmentCollection();
	app.active.appointmentCollectionView = new app.blueprints.appointmentCollectionView({
		collection: app.active.appointmentCollection
	});
});
