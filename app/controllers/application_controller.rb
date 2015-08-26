class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  def api_authorize
  	api_cookie = cookies[:apiKey]
  	puts '=======API COOKIE=========='
  	puts api_cookie
  	puts '==========================='
  	if Key.find_by(:secret_key => api_cookie).nil?
  		render json: { :status => 'error', :message => 'invalid or missing api key'}
  	end
  end

end
