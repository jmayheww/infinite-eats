class Api::FridgeItemsController < ApplicationController
  before_action :set_current_user
  before_action :authorize_user

  rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  def create
    fridge_items = params[:fridge_items].map do |item_params|
      item_params[:user_id] = @current_user.id
      FridgeItem.create!(fridge_item_params(item_params))
    end

    @current_user.fridge_items << fridge_items
    @current_user.save!

    render json: @current_user, status: :created
  end

  private

  def fridge_item_params(item)
    item.permit(
      :vendors_product_id,
      :quantity,
      :name,
      :user_id
    )
  end

  def set_current_user
    @current_user = User.find_by(id: session[:user_id])
  end

  def authorize_user
    return if @current_user

    render json: { error: 'Unauthorized Access. You must be logged in to access orders' },
           status: :unauthorized
  end

  def render_record_not_found_response(exception)
    render json: { error: "#{exception.model} not found" }, status: :unauthorized
  end

  def render_unprocessable_entity_response(exception)
    render json: { error: exception.record.errors.full_messages }, status: :unprocessable_entity
  end
end
