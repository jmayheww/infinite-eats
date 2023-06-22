class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :image_url, :price, :quantity, :category, :brand, :size, :vendors_products

  def vendors_products
    object.vendors_products.map { |vp| VendorsProductSerializer.new(vp).as_json }
  end
end
