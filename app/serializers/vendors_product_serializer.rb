class VendorsProductSerializer < ActiveModel::Serializer
  attributes :id, :price, :quantity, :category, :brand, :size, :description, :image_url, :name

  belongs_to :vendor
  belongs_to :product
end
