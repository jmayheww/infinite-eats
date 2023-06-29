class Order < ApplicationRecord
  belongs_to :user
  belongs_to :vendor
  has_many :order_items, dependent: :destroy
  has_many :vendor_products, through: :order_items

  accepts_nested_attributes_for :order_items
  before_save :update_total_price

  def update_total_price
    self.total_price = order_items.sum { |item| item.quantity * item.price }
  end

  def update_with_order_items(order_items_attributes)
    existing_order_item_ids = order_items.pluck(:id)

    new_order_items = order_items_attributes.reject { |item| existing_order_item_ids.include?(item[:id]) }

    new_order_items.each do |item_params|
      order_items.create!(item_params)
    end

    update!(order_items_attributes: order_items_attributes)
  end
end
