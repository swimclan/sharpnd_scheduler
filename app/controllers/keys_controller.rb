class KeysController < ApplicationController
  before_filter :api_admin_authorize, :only => :index
  def index
  	@keys = Key.all
  	render :index
  end

  def create
  	puts 'you are in create'
  	puts '=======KEY PARAMS========='
  	puts params
  	puts '=========================='
  	@key = Key.create(key_params)
  	redirect_to '/keys'
  end

  def destroy
  	puts 'you are in destroy'
  	Key.find(params[:key][:id]).destroy
  	redirect_to '/keys'
  end 

  private

  def key_params
  	params.require(:key).permit(:secret_key, :admin)
  end

end
