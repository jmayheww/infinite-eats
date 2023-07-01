class VendorsProductSerializer < ActiveModel::Serializer
  attributes :id, :price, :quantity, :category, :brand, :size, :description, :image_url, :name, :total_ordered_quantity

  belongs_to :product

  def total_ordered_quantity
    object.order_items.sum(:quantity)
  end
end
