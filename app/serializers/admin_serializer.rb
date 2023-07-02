class AdminSerializer < ActiveModel::Serializer
  attributes :id, :email, :created_at, :updated_at, :username, :first_name, :last_name, :street_address, :city, :state,
             :postal_code, :phone_number, :user_image, :payment_method_id, :stripe_customer_id, :orders, :vendors, :order_items

  def order_items
    object.order_items.map { |order_item| OrderItemSerializer.new(order_item).as_json }
  end
end
