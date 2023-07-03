class Product < ApplicationRecord
  has_many :vendors_products, dependent: :destroy
  has_many :vendors, through: :vendors_products

  validates_presence_of :name, :description, :price, :quantity, :category, :brand, :size
end
