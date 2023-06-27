class Api::OrdersController < ApplicationController
  before_action :set_current_user
  before_action :authorize_user

  rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  def create
    order = Order.create!(order_params)

    render json: order
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
    params.require(:order).permit(:user_id, :vendor_id, :status,
                                  order_items_attributes: %i[vendors_product_id quantity price])
  end

  def render_record_not_found_response(exception)
    render json: { error: "#{exception.model} not found" }, status: :unauthorized
  end

  def render_unprocessable_entity_response(exception)
    puts exception.record.errors.full_messages
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end
end
