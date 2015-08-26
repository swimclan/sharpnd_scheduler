class AppointmentsController < ApplicationController
  def index
    @appointments = Appointment.all
    respond_to do |format|
       # show.html.erb
      format.html { render json: @appointments }
      format.xml { render xml: @appointments }
    end
  end

  def find
  end

  def create
    
  end

  def update
  end

  def destroy
  end
end
