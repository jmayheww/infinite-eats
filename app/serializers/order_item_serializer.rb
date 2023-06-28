class OrderItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :price, :vendors_product_id, :order_id
end
