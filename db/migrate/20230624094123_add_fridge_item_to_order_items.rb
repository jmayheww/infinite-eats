class AddFridgeItemToOrderItems < ActiveRecord::Migration[7.0]
  def change
    add_reference :order_items, :fridge_item, foreign_key: true
  end
end
