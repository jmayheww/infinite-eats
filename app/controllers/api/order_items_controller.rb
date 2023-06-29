class Api::OrderItemsController < ApplicationController
  before_action :set_current_user
  before_action :authorize_user

  def update
    order_item = OrderItem.find(params[:id])
    if order_item.update(order_item_params)
      render json: order_item
    else
      render json: { errors: order_item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_current_user
    @current_user = User.find_by(id: session[:user_id])
  end

  def authorize_user
    return if @current_user

    render json: { error: 'Unauthorized Access. You must be logged in to access orders' },
           status: :unauthorized
  end

  def order_item_params
    params.require(:order_item).permit(:quantity, :name, :price)
  end
end
