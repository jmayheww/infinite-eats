class OrderItem < ApplicationRecord
  belongs_to :order
  belongs_to :vendors_product

  validates_presence_of :quantity, :price
  validates :quantity, numericality: { greater_than: 0, message: ' must be greater than 0' }
end
