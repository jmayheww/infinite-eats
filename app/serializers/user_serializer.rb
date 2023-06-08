class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :password_digest, :created_at, :updated_at
end
