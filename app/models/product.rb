class Product < ApplicationRecord
  has_many :vendors_products
  has_many :vendors, through: :vendors_products
end
