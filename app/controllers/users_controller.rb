class UsersController < ApplicationController
	def login
		if params
			@user = User.find_by :email_address => params[:email_address]
		else
			@user = User.find_by :email_address => user_request_params[:email_address]
		end
		if @user && @user.authenticate(params[:password])
	  		response.headers["Status"] = "200 OK"
	  		render json: @user, :status => 200
	  	else
	  		response.headers["Status"] = "401 Unauthorized"
	  		render plain: "Login failed: Email address and/or password do not match our records", :status => 401
	  	end

	end

	def register
	  	if params
	  		@user = User.new(user_params)
	  	else
	  		@user = User.new(user_request_body)
	  	end
	  	if User.find_by(:email_address => @user.email_address).nil? && @user.save
	  		response_data = JSON.parse(@user.to_json).merge(:responseText => 'Thank you for registering your account')
	  		response.headers["Status"] = "201 Created"
	  		render json: response_data, :status => 201
	  	else
	  		response.headers["Status"] = "400 Bad Request"
	  		render plain: "User already exists or passwords do not match", :status => 400
	  	end
	end

private

def user_params
	params.permit(:first_name, :last_name, :email_address, :password, :password_confirmation, :address_1, :address_2, :city, :state, :zip, :phone_number)
end

def user_request_params
	user_request_body = JSON.parse(request.body.read.to_s)
	permit_params = [:first_name, :last_name, :email_address, :password, :password_confirmation, :address_1, :address_2, :city, :state, :zip, :phone_number]
	user_request_body.keys.each do |key|
		if permit_params.include?(key) == false
			return false
		end
	end
	user_request_body
end

end