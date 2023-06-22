class CreateVendorsProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :vendors_products do |t|
      t.references :vendor, null: false, foreign_key: true
      t.references :product, null: false, foreign_key: true
      t.decimal :price
      t.integer :quantity
      t.string :category
      t.string :brand
      t.string :size
      t.string :description
      t.string :image_url
      t.string :name

      t.timestamps
    end
  end
end
