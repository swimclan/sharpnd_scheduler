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

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function register_button_handler() {
	$('#auth-form').unbind('click', loginAjax);
	$('#auth-form').on('click', 'button', registerAjax);
}

function login_button_handler() {
	$('#auth-form').unbind('click', registerAjax);
	$('#auth-form').on('click', 'button', loginAjax);	
}


function loginAjax(e) {
	console.log('login button clicked');
	var user_login_data = $('#login-fields').serializeObject();
	$.ajax({
		url: '/login',
		type: 'POST',
		dataType: 'json',
		data: user_login_data,
		success: function(data) {
			console.log('Login successful [' + data.email_address + ']');
			render_user_data(data);
			// set the global user data
			app.user = data;
			set_current_section($('#auth-form'));
			auto_scroll();
		},
		error: function(err) {
			console.log('error respose from login: ');
			console.log(err);
			$('#login-response').html(err.responseText);
		}
	});
}

function registerAjax(e) {
	e.preventDefault();
	var new_user_data = $('#registration-fields').serializeObject();
	$.ajax({
		url: '/register',
		type: 'POST',
		dataType: 'json',
		data: new_user_data,
		success: function(data) {
			console.log('registration successful ['+ data.email_address + ']');
			render_user_data(data);
			// set the global user data
			app.user = data;			
			$('#register-response').html(data.responseText);
			$('#new-user-radio').attr('checked', '');
			$('#login-radio').attr('checked', 'checked');
			set_current_section($('#auth-form'));
			auto_scroll();


		},
		error: function(err) {
			console.log('error respose from registration: ');
			console.log(err);
			$('#register-response').html(err.responseText);
		}
	});
}

function render_user_data(data) {
	var logged_in_user_template = $('#logged-in-user').html();
	var render_logged_in_user_template = _.template(logged_in_user_template);
	// render a user data form with logged in user information
	$('#auth-form').html(render_logged_in_user_template(data));
	$('#user-fields').addClass('styled-form');
}

function auto_scroll() {
	var $next_section = $('#' + app.sections[app.current_section]);
	var distance_to_next = $next_section.offset().top;
	$('html, body').animate({
		scrollTop: distance_to_next
	}, 400, 'swing');
}

function radio_scroll_handler(section) {
	// move user to each form item after click
	$('#'+section+'-radio').children('input').on('change', function(e) {
		set_current_section($(this));
		auto_scroll();
	});
}

function set_current_section($selector) {
	app.current_section = app.sections.indexOf($selector.parents('.row').attr('id')) + 1;
	return true;
}

function get_appointment_model() {
	var appointment = {};
	appointment.neighborhood = $('#neighborhood-radio').children('input:checked').val();
	appointment.product_id = $('#service-radio').children('input:checked').val();
	appointment.user_id = $('#userid-field').val();
	var date = $('#date-selected').val().split('/');
	var time = $('#time-slider').slider("value");
	appointment.date_time = new Date(date[2], date[0] - 1, date[1], time, 0, 0);
	console.log(appointment);
	return validate_model(appointment);
}

function validate_model(obj) {
	console.log('in validate_model');
	var valid = true;
	Object.keys(obj).forEach(function(key) {
		console.log(obj[key]);
		if (typeof obj[key] === 'undefined' || obj[key] === 'Invalid Date') {
			console.log('missing data for key: ' + key);
			valid = false;
		}
	});
	return valid ? obj : false;
}

function blackout($container, $modal_background) {
	$container.hide(50);
	$modal_background.show(50);
}

function lightout($container, $modal_background) {
	$container.show(50);
	$modal_background.hide(50);
}

function render_modal(data, $template_selector) {
	var template = $template_selector.html();
	var render_template = _.template(template);
	blackout(app.$container, app.$modal_background)
	app.$modal_background.append(render_template(data));
	// make sure to include the modal close click handler after modal environment is rendered
	set_modal_close_handler();
}

function set_modal_close_handler() {
	$('.sharpnd-modal-close').on('click', function(e) {
		console.log('modal close has been clicked...');
		lightout(app.$container, app.$modal_background);
	});
}

function datify(date) {
	return new Date(date);
}

function set_key_generate_handler() {
	//generate random api keys based on time since epoch
	$('#key-generate').on('click', function(e) {
		console.log('the generate key was pressed');
		e.preventDefault();	
		var time_code = new Date().getTime() * Math.random();
		$('#api-key-field').val(window.btoa(time_code.toString()));
	});
}

/*----------------------------------------------------
		M A I N,  T R I G G E R S  &  E V E N T S 
----------------------------------------------------*/
$(document).ready(function() {
	console.log('---------------------------');
	console.log('I am in doc.ready app.js..');
	console.log('---------------------------');
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
	app.renderedRegisterForm = _.template(app.register_form_template)({});
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
			$('#send-response').html('Please complete all fields to continue');
		}
	});

	//make the on click events work on the toggle buttons
	$('.toggle').on('click', 'label', function(e) {
		$(this).addClass('active');
		$(this).siblings('label').removeClass('active');
	});

}); // end of document.ready
