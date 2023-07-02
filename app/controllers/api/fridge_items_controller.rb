class Api::FridgeItemsController < ApplicationController
  before_action :set_current_user
  before_action :authorize_user

  rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  def create
    fridge_items = params[:fridge_items].map do |item_params|
      item_params[:user_id] = @current_user.id
      fridge_item = FridgeItem.find_or_create_with_quantity(create_fridge_item_params(item_params))

      # update total ordered quantity of linked vendors_product

      fridge_item.vendors_product.increment_quantity(item_params[:quantity].to_i)

      fridge_item
    end

    @current_user.fridge_items << fridge_items
    @current_user.save!

    render json: @current_user, status: :created
  end

  def update
    fridge_item = FridgeItem.find(params[:id])
    fridge_item.update!(update_fridge_item_params)

    updated_fridge = @current_user.fridge_items

    render json: updated_fridge, status: :ok
  end

  def destroy
    fridge_item = FridgeItem.find(params[:id])
    fridge_item.destroy

    updated_fridge_items = @current_user.fridge_items

    render json: updated_fridge_items, status: :ok
  end

  private

  def create_fridge_item_params(item)
    item.permit(:vendors_product_id, :quantity, :name, :user_id)
  end

  def update_fridge_item_params
    params.require(:fridge_item).permit(:quantity, :id)
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
