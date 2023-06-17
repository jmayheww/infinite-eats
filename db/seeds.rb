# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#

# Clear db before seeding
User.destroy_all
Vendor.destroy_all

puts 'seeding database...'

Vendor.create(
  name: 'Walmart',
  email: 'support@walmart.com',
  phone_number: '1234567890',
  address: '702 SW 8th St',
  city: 'Bentonville',
  state: 'AR',
  zip_code: '72716',
  website: 'https://www.walmart.com',
  description: 'An American multinational retail corporation that operates a chain of hypermarkets, discount department stores, and grocery stores.',
  delivery_schedule: 'Monday to Friday',
  average_rating: 4.5,
  logo_image_url: 'https://link_to_walmart_logo.com'
)

puts 'done seeding'
