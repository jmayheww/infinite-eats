class User < ApplicationRecord
  has_secure_password

  # has many associations

  has_many :orders, dependent: :destroy
  has_many :fridge_items, dependent: :destroy

  # has many, through associations

  has_many :order_items, through: :orders
  has_many :vendors, through: :orders
  has_many :vendors_products, through: :order_items

  validates :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 6 }, on: :create
  validates :payment_method_id, presence: true, on: :save_payment_method
end
