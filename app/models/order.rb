class Order < ApplicationRecord
  belongs_to :user
  belongs_to :vendor
  has_many :order_items, dependent: :destroy
  has_many :vendor_products, through: :order_items

  accepts_nested_attributes_for :order_items
  before_save :update_total_price

  def update_total_price
    self.total_price = order_items.sum { |item| item.quantity * item.price }
  end

  def self.create_or_update(order_params, current_user)
    order = current_user.orders.find_by(vendor_id: order_params[:vendor_id], status: 'pending')

    order ||= Order.create!(
      user_id: current_user.id,
      vendor_id: order_params[:vendor_id],
      status: 'pending'
    )

    order_items_attributes = order_params[:order_items_attributes]
    order_items_attributes.each do |order_item_params|
      order_item = order.order_items.find_by(vendors_product_id: order_item_params[:vendors_product_id])

      order_item ||= order.order_items.create!(
        vendors_product_id: order_item_params[:vendors_product_id],
        quantity: order_item_params[:quantity],
        price: order_item_params[:price],
        name: order_item_params[:name]
      )

      order_item.update!(
        quantity: order_item_params[:quantity],
        price: order_item_params[:price],
        name: order_item_params[:name]
      )
    end

    order.update_total_price
    order.save!
  end

  def update_with_order_items(order_items_attributes)
    existing_order_item_ids = order_items.pluck(:id)

    new_order_items = order_items_attributes.reject { |item| existing_order_item_ids.include?(item[:id]) }

    new_order_items.each do |item_params|
      order_items.create!(item_params)
    end

    update_total_price
    save!
  end
end
