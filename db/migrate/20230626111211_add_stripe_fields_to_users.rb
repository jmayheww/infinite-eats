class AddStripeFieldsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :stripe_customer_id, :string
    add_column :users, :stripe_default_payment_method, :string
  end
end
