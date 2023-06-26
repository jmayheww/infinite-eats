class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :created_at, :updated_at, :username, :first_name, :last_name, :street_address, :city, :state,
             :postal_code, :phone_number, :user_image
end
