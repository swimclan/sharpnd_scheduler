// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery-ui
//= require jquery.maskedinput
//= require underscore
//= require backbone
//= require turbolinks
//= require_tree .
 

var app = app || {};
app.blueprints = app.blueprints || {};
app.active = app.active || {};

/*----------------------------------------------------
		M O D E L  C O N S T R U C T O R S
----------------------------------------------------*/		
app.blueprints.userModel = Backbone.Model.extend({
	initialize: function() {

	}
});

app.blueprints.appointmentModel = Backbone.Model.extend({
	initialize: function() {

	}
});

app.blueprints.productModel = Backbone.Model.extend({
	initialize: function() {
		console.log('A product model has been instantiated...');
		
	}
});



/*----------------------------------------------------
	C O L L E C T I O N  C O N S T R U C T O R S
----------------------------------------------------*/
app.blueprints.appointmentCollection = Backbone.Collection.extend({
	initialize: function() {

	}
});

app.blueprints.productCollection = Backbone.Collection.extend({
	url: '/api/products',
	model: app.blueprints.productModel,
	initialize: function() {
		console.log('a products collection has been instantiated...');
		this.fetch();
		this.on('change', function() {
			this.fetch();
		})
	}
});

/*----------------------------------------------------
		V I E W  C O N S T R U C T O R S
----------------------------------------------------*/
app.blueprints.productCollectionView = Backbone.View.extend({
	initialize: function() {
		console.log('product collection view has been instantiated...');
		this.render();
		var that = this;
		this.collection.on('sync', function() {
			that.render();
		});
	},
	el: $('#service-radio'),
	render: function() {
		var productsModels = this.collection.models;
		productsModels.forEach(function(model) {
			new app.blueprints.productModelView({
				model: model
			});
		});
		//draw the services buttonset
		$(function() { $('#service-radio').buttonset(); });
	}
});

app.blueprints.productModelView = Backbone.View.extend({
	initialize: function() {
		console.log('A product model view has been instantiated...');
		this.$el = $('#service-radio');
		this.render();
	},
	render: function() {
		var singleProductTemplate = $('#productTemplate').html();
		var renderProductTemplate = _.template(singleProductTemplate);
		this.$el.append(renderProductTemplate(this.model.attributes));
	}

});




/*----------------------------------------------------
		  H E L P E R  F U N C T I O N S
----------------------------------------------------*/
function get_time_string(hours) {
	 //it is pm if hours from 12 onwards
    suffix = (hours >= 12)? 'pm' : 'am';

    //only -12 from hours if it is greater than 12 (if not back at mid night)
    hours = (hours > 12)? hours - 12 : hours;

    //if 00 then it is 12 am
    hours = (hours == '00')? 12 : hours;

    return hours + ':00'+ ' ' + suffix;
}




/*----------------------------------------------------
		M A I N,  T R I G G E R S  &  E V E N T S 
----------------------------------------------------*/
$(document).ready(function() {
	//render the neighborhood radio options
	$(function() { $('#neighborhood-radio').buttonset(); });

	//render the login/register toggle radio options
	$(function() { $('#information-radio').buttonset(); });

	// login/register form templates
	app.login_form_template = $('#login-form').html();
	app.register_form_template = $('#register-form').html();

	//render the default new user template
	app.renderedLoginForm = _.template(app.login_form_template)({});
	app.renderedRegisterForm = _.template(app.register_form_template)({});
	$('#auth-form').html(app.renderedRegisterForm);
	$(function() { $("#phone-field").mask("(999) 999-9999") });
	
	//toggle the login/register forms
	$('#new-user-radio').on('click', function(e) {
		$('#auth-form').html(app.renderedRegisterForm);
		//mask the phone input form field for 10 digit number
		$(function() { $("#phone-field").mask("(999) 999-9999") });
	});
	$('#login-radio').on('click', function(e) {
		$('#auth-form').html(app.renderedLoginForm);
	});

	//draw the date picker	
	$('#datepicker').datepicker({
		minDate: new Date()
	});

	//draw the time slider and bind slide event
	$('#time-slider').slider({
		slide: function( event, ui ) {
			$this = $(this);
			$('#selected-time').html(get_time_string(ui.value));
		}
	});
	$('#time-slider').slider("option", "value", 9);
	$('#selected-time').html(get_time_string($('#time-slider').slider("value")));

	//set the min, max and step for each hour of the day
	$('#time-slider').slider("option", "min", 9);
	$('#time-slider').slider("option", "max", 21);
	$('#time-slider').slider("option", "step", 1);


	//generate random api keys based on time since epoch
	$('#key-generate').on('click', function(e) {
		e.preventDefault();
		var time_code = new Date().getTime();
		var random
		$('#api-key').val(window.btoa(time_code.toString()));
	});

	// ============BACKBONE TRIGGERS=================
		// instantiate a product collection
	app.active.productCollection = new app.blueprints.productCollection();
	//get the products kicked to the DOM
	app.active.productCollectionView = new app.blueprints.productCollectionView({
		collection: app.active.productCollection
	});

}); // end of document.ready
