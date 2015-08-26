class AppointmentsController < ApplicationController
  before_filter :api_authorize
  def index

    @appointments = Appointment.all
    render json: @appointments
  end

  def find
    @appointment = Appointment.find(params[:id])
    render json: @appointment
  end

  def create
    if params
      puts 'params exist... using params...'
      input_data = appointment_params
    else
      puts 'params don\'t exist trying the request body...'
      puts "Request body: #{request.body.read}"
      input_data = JSON.parse(request.body.read)
    end
    @appointment = Appointment.create(input_data)
    render json: @appointment
  end

  def update
    if params
      puts 'params exist... using params...'
      input_data = appointment_params
    else
      puts 'params don\'t exist trying the request body...'
      puts "Request body: #{request.body.read}"
      input_data = JSON.parse(request.body.read)
    end
    @appointment = Appointment.find(params[:id])
    @appointment.update(input_data)
    render json: @appointment
  end

  def destroy
    @appointment = Appointment.find(params[:id])
    @appointment.destroy
    render json: @appointment
  end

  private
  def appointment_params
    params.permit(:date_time, :neighborhood, :product_id, :user_id)
  end
end
