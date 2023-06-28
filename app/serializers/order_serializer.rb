class OrderSerializer < ActiveModel::Serializer
  attributes :id, :status, :vendor_id, :user_id

  belongs_to :user
  has_many :order_items
end
