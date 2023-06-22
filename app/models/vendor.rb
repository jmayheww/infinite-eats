class Vendor < ApplicationRecord
  has_many :vendors_products
  has_many :products, through: :vendors_products

  validates_presence_of :name, :email, :phone_number, :address, :city, :state, :zip_code, :website, :description,
                        :delivery_schedule, :average_rating, :logo_image_url
end
