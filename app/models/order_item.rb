class OrderItem < ApplicationRecord
  belongs_to :order
  belongs_to :vendors_product

  validates_presence_of :quantity, :price
end
