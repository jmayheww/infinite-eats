class CreateOrderItems < ActiveRecord::Migration[7.0]
  def change
    create_table :order_items, force: :cascade do |t|
      t.bigint :order_id, null: false
      t.bigint :vendors_product_id, null: false
      t.integer :quantity, null: false
      t.decimal :price, precision: 10, scale: 2, null: false
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false
      t.index :order_id, name: 'index_order_items_on_order_id'
      t.index :vendors_product_id, name: 'index_order_items_on_vendors_product_id'
    end
    add_foreign_key :order_items, :orders
    add_foreign_key :order_items, :vendors_products, column: :vendors_product_id
  end
end
