class OrderItem < ApplicationRecord
  belongs_to :order
  belongs_to :vendors_product

  has_many :users, through: :order

  validates_presence_of :quantity, :price
  validates :quantity, numericality: { greater_than: 0 }

  validate :quantity_greater_than_zero

  private

  def quantity_greater_than_zero
    errors.add(:quantity, "must be greater than 0 for product #{vendors_product_id}") if quantity.nil? || quantity <= 0
  end
end
