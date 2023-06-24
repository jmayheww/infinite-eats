class User < ApplicationRecord
  has_secure_password

  has_many :orders
  has_many :vendors, through: :orders
  has_many :fridge_items
  has_many :vendor_products, through: :fridge_items

  validates :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 6 }
end
