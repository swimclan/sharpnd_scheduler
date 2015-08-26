class AppointmentsController < ApplicationController
  def index
    @appointments = Appointment.all
    render json: @appointments
  end

  def find
    @appointment = Appointment.find(params[:id])
    render json: @appointment
  end

  def create
    
    @appointment = Appointment.create(:date_time => params[:date_time], :neighborhood => params[:neighborhood], :product_id => params[:product_id], :user_id => params[:user_id])
    render json: @appointment
  end

  def update
    @appointment = Appointment.find(params[:id])
    @appointment.update(:date_time => params[:date_time], :neighborhood => params[:neighborhood], :product_id => params[:product_id], :user_id => params[:user_id])
    render json: @appointment
  end

  def destroy
  end

  private
  def appointment_params
    params.require(:appointment).permit(:date_time, :neighborhood, :product_id, :user_id)
  end
end
