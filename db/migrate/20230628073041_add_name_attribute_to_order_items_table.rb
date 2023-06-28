class AddNameAttributeToOrderItemsTable < ActiveRecord::Migration[7.0]
  def change
    add_column :order_items, :name, :string
  end
end
