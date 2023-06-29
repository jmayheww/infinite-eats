class OrderSerializer < ActiveModel::Serializer
  attributes :id, :status, :vendor_id, :user_id, :total_price, :order_items, :vendor

  belongs_to :vendor
  has_many :order_items
end
