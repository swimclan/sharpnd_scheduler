// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function() {
	//generate random api keys based on time since epoch
	$('#key-generate').on('click', function(e) {
		console.log('the generate key was pressed');
		e.preventDefault();	
		var time_code = new Date().getTime() * Math.random();
		$('#api-key-field').val(window.btoa(time_code.toString()));
	});
});
