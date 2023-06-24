class RenameVendorProductIdInOrderItems < ActiveRecord::Migration[7.0]
  def change
    rename_column :order_items, :vendor_product_id, :vendors_product_id
  end
end
