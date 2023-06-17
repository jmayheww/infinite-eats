class CreateVendors < ActiveRecord::Migration[7.0]
  def change
    create_table :vendors do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :phone_number
      t.string :address
      t.string :city
      t.string :state
      t.string :zip_code
      t.string :website
      t.string :description
      t.string :delivery_schedule
      t.decimal :average_rating
      t.string :logo_image_url

      t.timestamps
    end
  end
end
