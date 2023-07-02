class VendorsProduct < ApplicationRecord
  belongs_to :vendor
  belongs_to :product

  has_many :order_items
  has_many :orders, through: :order_items

  delegate :name, :category, :brand, :size, :description, :image_url, to: :product

  validates_presence_of :price, :quantity
  validates :product, uniqueness: { scope: :vendor }

  def increment_quantity(by_amount)
    self.quantity += by_amount
    save!
  end
end
