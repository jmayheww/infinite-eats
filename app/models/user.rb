class User < ApplicationRecord
  has_secure_password

  has_many :orders, dependent: :destroy
  has_many :vendors, through: :orders
  has_many :fridge_items, dependent: :destroy
  has_many :vendor_products, through: :fridge_items

  validates :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 6 }, on: :create
  validates :payment_method_id, presence: true, on: :save_payment_method
end
