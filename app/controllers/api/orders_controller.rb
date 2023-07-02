class Api::OrdersController < ApplicationController
  before_action :set_order, only: [:update]

  def create_or_update
    Order.create_or_update(order_params, @current_user)
    user_orders = @current_user.orders

    render json: user_orders, status: :ok
  end

  def update
    @order.update!(order_params)
    user_orders = @current_user.orders
    render json: user_orders, status: :ok
  end

  def destroy
    order = Order.find(params[:id])
    order.destroy
    user_orders = @current_user.orders
    render json: user_orders, status: :ok
  end

  private

  def set_order
    @order = Order.find(params[:id])
  end

  def order_params
    params.require(:order).permit(
      :user_id,
      :status,
      :vendor_id,
      order_items_attributes: %i[
        id
        vendors_product_id
        quantity
        price
        name
      ]
    )
  end
end
