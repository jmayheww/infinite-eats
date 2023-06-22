class VendorsProduct < ApplicationRecord
  belongs_to :vendor
  belongs_to :product

  validates_presence_of :price, :quantity
end
