class Api::OrdersController < ApplicationController
  before_action :set_current_user
  before_action :authorize_user
  before_action :set_order, only: [:update]

  rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  # app/controllers/api/orders_controller.rb

  def create_or_update
    # Check if an order exists for the current user belonging to a specific vendor and also pending
    order = @current_user.orders.find_by(vendor_id: order_params[:vendor_id], status: 'pending')
    puts order

    if order
      # If order exists, check if the order_items_attributes match any of the order item params in the request
      order_items_attributes = order_params[:order_items_attributes]

      order_items_attributes.each do |order_item_params|
        order_item = order.order_items.find_by(vendors_product_id: order_item_params[:vendors_product_id])

        if order_item
          # If order item exists, update the quantity and price
          order_item.update!(
            quantity: order_item_params[:quantity],
            price: order_item_params[:price]
          )
        else
          # If order item does not exist, create a new order item
          order.order_items.create!(
            vendors_product_id: order_item_params[:vendors_product_id],
            quantity: order_item_params[:quantity],
            price: order_item_params[:price],
            name: order_item_params[:name]
          )
        end
      end
    else
      # If order does not exist, create a new order with order item attributes that take in your params
      order = Order.create!(
        user_id: @current_user.id,
        vendor_id: order_params[:vendor_id],
        status: 'pending',
        order_items_attributes: order_params[:order_items_attributes]
      )
    end

    # After creating or updating order items, update the order total
    order.total_price = order.order_items.sum('price * quantity')
    order.save!

    render json: order, status: :ok
  end

  def destroy
    order = Order.find(params[:id])
    order.destroy
    render json: { message: 'Order successfully deleted' }
  end

  private

  def set_current_user
    @current_user = User.find_by(id: session[:user_id])
  end

  def set_order
    @order = Order.find(params[:id])
  end

  def authorize_user
    return if @current_user

    render json: { error: 'Unauthorized Access. You must be logged in to access orders' },
           status: :unauthorized
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

  def render_record_not_found_response(exception)
    render json: { error: "#{exception.model} not found" }, status: :unauthorized
  end

  def render_unprocessable_entity_response(exception)
    order_items_attributes = order_params[:order_items_attributes]

    error_messages = exception.record.errors.full_messages.map do |error_message|
      product_id = error_message.scan(/\d+/).last.to_i
      order_item = order_items_attributes.find { |item| item[:vendors_product_id].to_i == product_id }
      next if order_item.nil? || product_id.zero?

      { product_id: product_id, error: error_message, order_item: order_item }
    end.compact

    render json: { errors: error_messages }, status: :unprocessable_entity
  end
end
