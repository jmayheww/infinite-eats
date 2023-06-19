# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#

# Clear db before seeding
User.destroy_all
Vendor.destroy_all

puts 'seeding database...'

# sample vendors

walmart = {
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
  logo_image_url: 'https://cdn.corporate.walmart.com/dims4/WMT/71169a3/2147483647/strip/true/crop/2389x930+0+0/resize/980x381!/quality/90/?url=https%3A%2F%2Fcdn.corporate.walmart.com%2Fd6%2Fe7%2F48e91bac4a8ca8f22985b3682370%2Fwalmart-logos-lockupwtag-horiz-blu-rgb.png'
}

target = {
  name: 'Target',
  email: 'customer.service@target.com',
  phone_number: '8005913869',
  address: '1000 Nicollet Mall',
  city: 'Minneapolis',
  state: 'MN',
  zip_code: '55403',
  website: 'https://www.target.com',
  description: 'An American retail corporation, the 8th-largest retailer in the United States, and is a component of the S&P 500 Index.',
  delivery_schedule: 'Monday to Sunday',
  average_rating: 4.3,
  logo_image_url: 'https://target.scene7.com/is/image/Target/GUEST_b4088cb0-3556-4e4e-9e50-65a7f2c20b36?wid=1380&hei=720&qlt=80&fmt=webp'
}

safeway = {
  name: 'Safeway',
  email: 'MS.safeway.customer.care.03251@safeway.com',
  phone_number: '8777233929',
  address: '5918 Stoneridge Mall Rd',
  city: 'Pleasanton',
  state: 'CA',
  zip_code: '94588',
  website: 'https://www.safeway.com',
  description: 'An American supermarket chain founded in April 1915 in American Falls, Idaho by Marion Barton Skaggs.',
  delivery_schedule: 'Monday to Sunday',
  average_rating: 4.1,
  logo_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Safeway_logo.svg/1200px-Safeway_logo.svg.png'
}

# create vendors in db

Vendor.create!(walmart)
Vendor.create!(target)
Vendor.create!(safeway)

puts 'done seeding'
