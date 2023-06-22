# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

require 'json'
require 'faker'

puts 'seeding database...'

# Clear db before seeding
User.destroy_all
Vendor.destroy_all
Product.destroy_all
VendorsProduct.destroy_all

# sample vendors

puts 'creating vendors...'

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
  logo_image_url: 'https://www.denverchildrensfoundation.org/wp-content/uploads/2021/09/target-logo-300x90.png'
}

costco = {
  name: 'Costco',
  email: 'costcocare@costco.com',
  phone_number: '8007742678',
  address: '999 Lake Dr',
  city: 'Issaquah',
  state: 'WA',
  zip_code: '98027',
  website: 'https://www.costco.com',
  description: 'An American multinational corporation which operates a chain of membership-only big-box retail stores.',
  delivery_schedule: 'Monday to Sunday',
  average_rating: 4.2,
  logo_image_url: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Costco_Wholesale_logo_2010-10-26.svg'
}

# create vendors in db

Vendor.create!([walmart, target, costco])

# create products in db
puts 'creating products...'

products_file = File.read('db/products.json')
products_data = JSON.parse(products_file)

products_data.each do |product|
  Product.create!(
    category: product['category'],
    brand: product['brand'],
    description: product['description'],
    image_url: product['image_url'],
    name: product['product_name'],
    quantity: Faker::Number.between(from: 1, to: 100),
    price: Faker::Commerce.price,
    size: Faker::Number.between(from: 1, to: 100)
  )
end

# create vendors_products in db
puts 'creating vendors_products...'

# Fetch all products and vendors
products = Product.all
vendors = Vendor.all

# Create vendors_products
products.each do |product|
  vendors_product = VendorsProduct.create!(
    product: product,
    vendor: vendors.sample,
    price: Faker::Commerce.price,
    quantity: Faker::Number.between(from: 1, to: 100)
  )
  product.vendors_products << vendors_product
end

puts 'done seeding'
