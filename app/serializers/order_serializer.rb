class OrderSerializer < ActiveModel::Serializer
  attributes :id, :status, :vendor_id, :user_id, :total_price

  belongs_to :user
  belongs_to :vendor
  has_many :order_items
end
