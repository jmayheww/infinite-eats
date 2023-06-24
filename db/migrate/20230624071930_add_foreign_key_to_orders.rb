class AddForeignKeyToOrders < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :orders, :users
    add_foreign_key :orders, :vendors
  end
end
