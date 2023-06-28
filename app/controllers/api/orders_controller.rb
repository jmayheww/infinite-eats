class Api::OrdersController < ApplicationController
  before_action :set_current_user
  before_action :authorize_user

  rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  def index
    orders = Order.all
    render json: orders, status: :ok
  end

  def create
    order = Order.create!(order_params)

    render json: order
  end

  def update
    order = Order.find(params[:id])
    order.update!(order_params)
    render json: order, status: :ok
  end

  private

  def set_current_user
    @current_user = User.find_by(id: session[:user_id])
    puts @current_user
  end

  def authorize_user
    return if @current_user

    render json: { error: 'Unauthorized Access. You must be logged in to access orders' },
           status: :unauthorized
  end

  def order_params
    params.require(:order).permit(
      :user_id,
      :vendor_id,
      :status,
      order_items_attributes: %i[id name quantity price vendors_product_id order_id]
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
