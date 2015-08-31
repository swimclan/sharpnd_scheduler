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
	Object.keys(obj).forEach(function(key) {
		console.log(key);
		if (!obj[key]) {
			console.log('missing data for key: ' + key);
			return false;
		}
	});
	console.log('model is valid');
	return obj;
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
