class AdminController < ApplicationController
  before_filter :api_admin_authorize, :only => :index

  def index
    render :index
  end

  def noaccess
    render :noaccess
  end

end
