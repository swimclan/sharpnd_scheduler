// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var app = app || {};
app.blueprints = app.blueprints || {};
app.active = app.active || {};

/*----------------------------------------------------
		M A I N,  T R I G G E R S  &  E V E N T S 
----------------------------------------------------*/
$(document).ready(function() {
	// the wrapper jQuery selector object (for global display stuff)
	app.$container = $('.container-fluid');

	// the thank you modal jQuery selector
	app.$thank_you_modal_template = $('#thank_you_modal');

	// modal background selector for blacking out the background
	app.$modal_background = $('#modal-bg');

	// all section ids
	app.sections = ['neighborhood', 'product', 'information', 'date', 'time'];

	//initialize current section
	app.current_section = 1;

	//draw the neighborhood radio options
	app.$neighborhood_radio = $('#neighborhood-radio');
	$(function() { app.$neighborhood_radio .buttonset(); });

	//draw the login/register toggle radio options
	$(function() { $('#information-radio').buttonset(); });

	// set the neighborhood selector scroll handler
	radio_scroll_handler('neighborhood');

	//draw the date picker	
	$('#datepicker').datepicker({
		minDate: new Date(),
		onSelect: function(date) {
			$('#date-selected').val(date);
			set_current_section($(this));
			auto_scroll();
		},
		prevText: '<span class="glyphicon glyphicon-circle-arrow-left" aria-hidden="true"></span>',
		nextText: '<span class="glyphicon glyphicon-circle-arrow-right" aria-hidden="true"></span>'
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

	// login/register form templates
	app.login_form_template = $('#login-form').html();
	app.register_form_template = $('#register-form').html();

	//render the default new user template
	app.renderedLoginForm = _.template(app.login_form_template)({});
	app.renderedRegisterForm = _.template(app.register_form_template)({
		email_address: '',
		password: '',
		password_confirmation: '',
		first_name: '',
		last_name: '',
		address_1: '',
		address_2: '',
		city: '',
		state: '',
		zip: '',
		phone_number: ''
	});
	$('#auth-form').html(app.renderedRegisterForm);
	$(function() { $("#phone-field").mask("(999) 999-9999") });
	register_button_handler();
	
	//toggle the login/register forms
	$('#new-user-radio').on('click', function(e) {
		$('#auth-form').html(app.renderedRegisterForm);
		//mask the phone input form field for 10 digit number
		$(function() { $("#phone-field").mask("(999) 999-9999") });
		register_button_handler();
	});
	$('#login-radio').on('click', function(e) {
		$('#auth-form').html(app.renderedLoginForm);
		login_button_handler();
		// auto_scroll_handler();
	});

	// on click of the submit appointment collect all the form data
	$('#send-button').on('click', function(e) {
		var send_data = get_appointment_model();
		console.log('about to send this data: ');
		console.log('-------------------------');
		console.log(send_data);
		if (send_data) {
			console.log('send data exists! sending to collection...');
			app.active.appointmentCollection.create(send_data);
			// render the appointment model view
			render_modal(app.user, app.$thank_you_modal_template);
			
		} else {
			// render error message
			console.log('nothing was sent please rendering an error to the user');
		}
	});

	//make the on click events work on the toggle buttons
	$('.toggle').on('click', 'label', function(e) {
		$(this).addClass('active');
		$(this).siblings('label').removeClass('active');
	});
	
}); // end of document.ready