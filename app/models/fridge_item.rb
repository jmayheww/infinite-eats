class FridgeItem < ApplicationRecord
  belongs_to :user
  belongs_to :vendors_product
end
