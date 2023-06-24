class CreateFridgeItems < ActiveRecord::Migration[7.0]
  def change
    create_table :fridge_items do |t|
      t.bigint :user_id, null: false
      t.bigint :vendors_product_id, null: false
      t.integer :quantity, null: false
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false
      t.index :user_id, name: 'index_fridge_items_on_user_id'
      t.index :vendors_product_id, name: 'index_fridge_items_on_vendors_product_id'
    end
    add_foreign_key :fridge_items, :users
    add_foreign_key :fridge_items, :vendors_products, column: :vendors_product_id
  end
end
