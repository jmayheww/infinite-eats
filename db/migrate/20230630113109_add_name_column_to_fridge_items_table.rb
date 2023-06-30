class AddNameColumnToFridgeItemsTable < ActiveRecord::Migration[7.0]
  def change
    add_column :fridge_items, :name, :string
  end
end
