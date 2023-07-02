class Api::OrdersController < ApplicationController
  before_action :set_order, only: %i[update destroy]
  rescue_from ActiveRecord::RecordInvalid, with: :render_batch_unprocessable_error_response

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
    @order.destroy
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

  def render_batch_unprocessable_error_response(exception)
    order_items_attributes = order_params[:order_items_attributes]

    error_messages = exception.record.errors.full_messages.map do |error_message|
      product_id = error_message.scan(/\d+/).last.to_i
      order_item = order_items_attributes.find { |item| item[:vendors_product_id].to_i == product_id }
      next if order_item.nil? || product_id.zero?

      { product_id: product_id,
        error: 'You cannot add or update any selections to checkout with the quantity of 0. Please adjust the quantity and try again.', order_item: order_item }
    end.compact

    render json: { errors: error_messages }, status: :unprocessable_entity
  end
end
