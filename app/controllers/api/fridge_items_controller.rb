class Api::FridgeItemsController < ApplicationController
  def create
    fridge_items = params[:fridge_items].map do |item_params|
      item_params[:user_id] = @current_user.id
      fridge_item = FridgeItem.find_or_create_with_quantity(create_fridge_item_params(item_params))

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

    updated_fridge_item = FridgeItem.find(fridge_item.id)

    render json: updated_fridge_item, status: :ok
  end

  def destroy
    fridge_item = FridgeItem.find(params[:id])
    fridge_item.destroy

    head :no_content
  end

  private

  def create_fridge_item_params(item)
    item.permit(:vendors_product_id, :quantity, :name, :user_id)
  end

  def update_fridge_item_params
    params.require(:fridge_item).permit(:quantity, :id)
  end
end
