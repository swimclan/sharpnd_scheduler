class ProductsController < ApplicationController
  before_filter :api_authorize
  
  def all
    @products = Product.all
    render json: @products
  end

  def find
    @product = Product.find(params[:id])
    render json: @product 
  end

  def create
    if params
      puts 'params exist...  using params...'
      input_data = product_params
    else
      puts 'params does not exist... Using request body...'
      input_data = JSON.parse(request.body.read)
    end
    @product = Product.create(input_data)
    render json: @product
  end

  def update
    if params
      puts 'params exist...  using params...'
      input_data = product_params
    else
      puts 'params does not exist... Using request body...'
      input_data = JSON.parse(request.body.read)
    end
    @product = Product.find(params[:id])
    @product.update(input_data)
    render json: @product
  end

  def destroy
  end

  private

  def product_params
    params.permit(:product_name)
  end

end
