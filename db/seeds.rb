ActiveRecord::Base.transaction do
  require 'json'
  require 'faker'
  puts 'Seeding the database...'

  # Clear db before seeding
  User.destroy_all
  Vendor.destroy_all
  Product.destroy_all
  VendorsProduct.destroy_all
  Order.destroy_all
  OrderItem.destroy_all
  FridgeItem.destroy_all

  # Sample vendors
  puts 'Creating vendors...'

  walmart = Vendor.create!(
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
  )

  target = Vendor.create!(
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
  )

  costco = Vendor.create!(
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
  )

  # Create products
  puts 'Creating products...'

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
      price: Faker::Commerce.price(range: 1..100.0),
      size: Faker::Number.between(from: 1, to: 100)
    )
  end

  # Create vendors_products
  puts 'Creating vendors_products...'

  Product.all.each do |product|
    VendorsProduct.create!(
      vendor: [walmart, target, costco].sample,
      product: product,
      price: Faker::Commerce.price(range: 1..100.0),
      quantity: Faker::Number.between(from: 1, to: 100)
    )
  end

  # Create users
  puts 'Creating users...'

  10.times do
    user = User.create!(
      email: Faker::Internet.email,
      password: 'password',
      password_confirmation: 'password'
    )

    # update user with additional profile_params
    user.update!(
      username: Faker::Internet.username,
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      street_address: Faker::Address.street_address,
      city: Faker::Address.city,
      state: Faker::Address.state,
      postal_code: Faker::Address.postcode,
      phone_number: Faker::PhoneNumber.phone_number,
      user_image: Faker::Avatar.image
    )
  end

  # Create orders, order_items, fridge_items
  puts 'Creating orders, order_items, fridge_items...'

  users = User.all
  vendors_products = VendorsProduct.all

  users.each do |user|
    order = Order.create!(
      user: user,
      vendor: [walmart, target, costco].sample,
      status: %w[pending completed].sample,
      total_price: Faker::Commerce.price(range: 1..1000.0),
      delivery_address: Faker::Address.full_address,
      payment_method: ['Credit Card', 'PayPal', 'Cash on Delivery'].sample,
      stripe_payment_intent_id: Faker::Alphanumeric.alphanumeric(number: 10)
    )

    # Creating between 1-5 order_items per order
    rand(1..5).times do
      quantity = Faker::Number.between(from: 1, to: 10)
      vendors_product = vendors_products.sample
      OrderItem.create!(
        order: order,
        vendors_product: vendors_product,
        quantity: quantity,
        price: vendors_product.price
      )

      # Check if user already has a fridge item for the vendors product
      fridge_item = user.fridge_items.find_by(vendors_product: vendors_product)

      if fridge_item
        # Update the quantity of existing fridge item
        fridge_item.quantity += quantity
        fridge_item.save!
      else
        # Create new fridge item for the user
        FridgeItem.create!(
          user: user,
          vendors_product: vendors_product,
          quantity: quantity
        )
      end
    end
  end

  puts 'Done seeding the database!'
end
