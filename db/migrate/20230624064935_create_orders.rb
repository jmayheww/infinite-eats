class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders do |t|
      t.string 'status', default: 'pending'
      t.decimal 'total_price', precision: 10, scale: 2
      t.bigint 'user_id', null: false
      t.bigint 'vendor_id', null: false
      t.string 'delivery_address'
      t.string 'payment_method'
      t.string 'stripe_payment_intent_id'
      t.datetime 'created_at', null: false
      t.datetime 'updated_at', null: false
      t.index ['user_id'], name: 'index_orders_on_user_id'
      t.index ['vendor_id'], name: 'index_orders_on_vendor_id'
    end
  end
end
