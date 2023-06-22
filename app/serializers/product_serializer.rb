class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :image_url, :price, :quantity, :category, :brand, :size, :vendors

  def vendors
    object.vendors.map { |v| VendorSerializer.new(v).as_json }
  end
end
