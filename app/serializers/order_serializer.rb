class OrderSerializer < ActiveModel::Serializer
  attributes :id, :status, :vendor_id, :user_id, :total_price, :order_items, :vendor, :user

  belongs_to :vendor
  belongs_to :user
  has_many :order_items
end
