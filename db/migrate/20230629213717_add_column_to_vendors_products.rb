class AddColumnToVendorsProducts < ActiveRecord::Migration[7.0]
  def change
    add_column :vendors_products, :checkout_quantity, :integer
  end
end
