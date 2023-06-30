class OrderItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :quantity, :price, :vendors_product_id, :order_id, :vendors_product
  belongs_to :order
  belongs_to :vendors_product
end
