class FridgeItem < ApplicationRecord
  belongs_to :user
  belongs_to :vendors_product

  validates :vendors_product_id, uniqueness: { scope: :user_id }
  validates :quantity, presence: true, numericality: { greater_than: 0 }, on: [:create]

  def self.find_or_create_with_quantity(params)
    fridge_item = find_by(
      user_id: params[:user_id],
      vendors_product_id: params[:vendors_product_id]
    )

    if fridge_item
      fridge_item.update(quantity: fridge_item.quantity + params[:quantity].to_i)
    else
      fridge_item = create!(params)
    end

    fridge_item
  end
end
