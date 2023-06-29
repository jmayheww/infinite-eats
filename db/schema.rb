# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_06_29_213717) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "fridge_items", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "vendors_product_id", null: false
    t.integer "quantity", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_fridge_items_on_user_id"
    t.index ["vendors_product_id"], name: "index_fridge_items_on_vendors_product_id"
  end

  create_table "order_items", force: :cascade do |t|
    t.bigint "order_id", null: false
    t.bigint "vendors_product_id", null: false
    t.integer "quantity", null: false
    t.decimal "price", precision: 10, scale: 2, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "fridge_item_id"
    t.string "name"
    t.index ["fridge_item_id"], name: "index_order_items_on_fridge_item_id"
    t.index ["order_id"], name: "index_order_items_on_order_id"
    t.index ["vendors_product_id"], name: "index_order_items_on_vendors_product_id"
  end

  create_table "orders", force: :cascade do |t|
    t.string "status", default: "pending"
    t.decimal "total_price", precision: 10, scale: 2
    t.bigint "user_id", null: false
    t.bigint "vendor_id", null: false
    t.string "delivery_address"
    t.string "payment_method"
    t.string "stripe_payment_intent_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_orders_on_user_id"
    t.index ["vendor_id"], name: "index_orders_on_vendor_id"
  end

  create_table "products", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.string "image_url"
    t.decimal "price"
    t.integer "quantity"
    t.string "category"
    t.string "brand"
    t.string "size"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "street_address"
    t.string "city"
    t.string "state"
    t.string "postal_code"
    t.string "phone_number"
    t.string "user_image"
    t.string "stripe_customer_id"
    t.string "stripe_default_payment_method"
    t.string "payment_method_id"
  end

  create_table "vendors", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.string "phone_number"
    t.string "address"
    t.string "city"
    t.string "state"
    t.string "zip_code"
    t.string "website"
    t.string "description"
    t.string "delivery_schedule"
    t.decimal "average_rating"
    t.string "logo_image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "vendors_products", force: :cascade do |t|
    t.bigint "vendor_id", null: false
    t.bigint "product_id", null: false
    t.decimal "price"
    t.integer "quantity"
    t.string "category"
    t.string "brand"
    t.string "size"
    t.string "description"
    t.string "image_url"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "checkout_quantity"
    t.index ["product_id"], name: "index_vendors_products_on_product_id"
    t.index ["vendor_id"], name: "index_vendors_products_on_vendor_id"
  end

  add_foreign_key "fridge_items", "users"
  add_foreign_key "fridge_items", "vendors_products"
  add_foreign_key "order_items", "fridge_items"
  add_foreign_key "order_items", "orders"
  add_foreign_key "order_items", "vendors_products"
  add_foreign_key "orders", "users"
  add_foreign_key "orders", "vendors"
  add_foreign_key "vendors_products", "products"
  add_foreign_key "vendors_products", "vendors"
end
