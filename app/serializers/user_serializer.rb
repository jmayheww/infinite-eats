class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :created_at, :updated_at, :username, :first_name, :last_name, :street_address, :city, :state,
             :postal_code, :phone_number, :user_image, :payment_method_id, :stripe_customer_id,
             :order_items
  has_many :orders

  def order_items
    object.orders.flat_map do |order|
      order.order_items.map do |order_item|
        OrderItemSerializer.new(order_item).attributes
      end
    end
  end
end
