class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :image_url, :price, :quantity, :category, :brand, :size, :vendors
end
