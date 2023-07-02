class AdminSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :image_url, :users,
             :created_at, :updated_at

  def users
    object.users.map { |user| UserSerializer.new(user).as_json }
  end
end
