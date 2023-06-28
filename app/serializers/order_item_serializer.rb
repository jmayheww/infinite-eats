class OrderItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :quantity, :price, :vendors_product_id, :order_id
  belongs_to :order
end
