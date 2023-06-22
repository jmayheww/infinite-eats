class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name
      t.string :description
      t.string :image_url
      t.decimal :price
      t.integer :quantity
      t.string :category
      t.string :brand
      t.string :size

      t.timestamps
    end
  end
end
