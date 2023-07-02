class FridgeItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :quantity, :vendors_product_id, :vendors_product
end
