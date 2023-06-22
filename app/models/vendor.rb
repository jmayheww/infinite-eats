class Vendor < ApplicationRecord
  has_many :vendors_products
  has_many :products, through: :vendors_products
  has_many :orders
  has_many :users, through: :orders

  validates :name, presence: true
  validates :email, presence: true
  validates :phone_number, presence: true
  validates :address, presence: true
  validates :city, presence: true
  validates :state, presence: true, length: { is: 2 }
  validates :zip_code, presence: true, length: { is: 5 }
  validates :website, presence: true
  validates :description, presence: true
  validates :delivery_schedule, presence: true
  validates :average_rating, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 5 }
  validates :logo_image_url, presence: true
end
