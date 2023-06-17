class VendorSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :phone_number, :address, :city, :state, :zip_code, :website, :description,
             :delivery_schedule, :average_rating, :logo_image_url
end
