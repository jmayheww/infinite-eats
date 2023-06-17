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

ActiveRecord::Schema[7.0].define(version: 20_230_617_090_423) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'users', force: :cascade do |t|
    t.string 'username'
    t.string 'email'
    t.string 'password_digest'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.string 'first_name'
    t.string 'last_name'
    t.string 'street_address'
    t.string 'city'
    t.string 'state'
    t.string 'postal_code'
    t.string 'phone_number'
  end

  create_table 'vendors', force: :cascade do |t|
    t.string 'name', null: false
    t.string 'email', null: false
    t.string 'phone_number'
    t.string 'address'
    t.string 'city'
    t.string 'state'
    t.string 'zip_code'
    t.string 'website'
    t.string 'description'
    t.string 'delivery_schedule'
    t.decimal 'average_rating'
    t.string 'logo_image_url'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end
end
