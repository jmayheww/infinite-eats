class FridgeItem < ApplicationRecord
  belongs_to :user
  belongs_to :vendors_product

  def self.find_or_create_with_quantity(params)
    fridge_item = find_by(
      user_id: params[:user_id],
      vendors_product_id: params[:vendors_product_id]
    )

    if fridge_item
      fridge_item.quantity += params[:quantity].to_i
      fridge_item.save!
    else
      fridge_item = create!(params)
    end

    fridge_item
  end
end
