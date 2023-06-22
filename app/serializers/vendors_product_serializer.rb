class VendorsProductSerializer < ActiveModel::Serializer
  attributes :id
  has_one :vendor
  has_one :product
end
