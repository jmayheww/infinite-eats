class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :created_at, :updated_at, :username, :first_name, :last_name,
             :street_address, :city, :state, :postal_code, :phone_number,
             :user_image, :payment_method_id, :stripe_customer_id, :orders, :vendors

  has_many :orders
  has_many :fridge_items

  def vendors
    object.orders.map(&:vendor).uniq
  end
end
