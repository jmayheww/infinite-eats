class VendorsProduct < ApplicationRecord
  belongs_to :vendor
  belongs_to :product

  delegate :name, :category, :brand, :size, :description, :image_url, to: :product

  validates_presence_of :price, :quantity
  validates :product, uniqueness: { scope: :vendor }
end
