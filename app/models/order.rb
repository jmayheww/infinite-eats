class Order < ApplicationRecord
  belongs_to :user
  belongs_to :vendor
  has_many :order_items, dependent: :destroy
  has_many :vendor_products, through: :order_items

  accepts_nested_attributes_for :order_items
end
