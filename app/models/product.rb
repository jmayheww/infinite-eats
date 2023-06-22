class Product < ApplicationRecord
  has_many :vendors_products, dependent: :destroy
  has_many :vendors, through: :vendors_products, dependent: :destroy

  validates_presence_of :name, :description, :image_url, :price, :quantity, :category, :brand, :size
end
