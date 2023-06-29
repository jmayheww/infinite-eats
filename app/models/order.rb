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
end
