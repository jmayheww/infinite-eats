# Welcome to Infinite Eats

### Your one-stop platform for a seamless grocery shopping experience, complete with comprehensive fridge management tools, top-notch vendors, and a secure payment system powered by Stripe.

> Use Infinite Eats to revolutionize your household or business' food and inventory management and ordering process. Access a wide variety of products from reputable vendors, manage your fridge inventory with real-time updates, customize and automate orders, and secure your payments with Stripe. All this and more, in one convenient platform. Uncomplicate your life with Infinite Eats and never worry about an empty fridge again.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Github Repository](#github-repository)
- [Project Philosophy](#project-philosophy)
- [General User Experience](#general-user-experience)
- [Features](#features)
- [Installation and Set-up Guide](#installation-and-set-up-guide)
- [How to Use](#how-to-use)
- [Resources and Documentation](#resources-and-documentation)
- [Technologies Used](#technologies-used)
  - [Languages and Frameworks](#languages-and-frameworks)
  - [Main Package Installations](#main-package-installations)
- [Deployment](#deployment)
- [Author](#author)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Github Repository

- [Infinite Eats Repository](https://github.com/jmayheww/infinite-eats)

## Project Philosophy

At Infinite Eats, we strive to offer a more user-friendly and efficient solution to the challenges of managing household and business inventory. Whether you're a busy parent trying to stay on top of your family's grocery needs or a restaurant owner looking to streamline your ordering process, Infinite Eats is here to simplify and ease the burden of inventory tracking.

With our real-time fridge inventory tracking and robust ordering system, we empower users to take control of their inventory management like never before. Our goal is to provide a seamless and efficient solution that ensures you never run out of essential items. We are continuously working on updates to enable customization and automation of the restocking and vendor ordering process based on individualized parameters.

## General User Experience

Infinite Eats offers a comprehensive and intuitive user experience. Our platform allows users to browse through a wide range of vendors and their products, making it easy to find and order their preferred items. The real-time fridge inventory feature enables users to update their inventory in real-time, ensuring accurate tracking of available items.

To simplify the restocking process, users can set up automated or custom orders based on their unique needs. We prioritize security and reliability, which is why we have integrated a secure checkout process powered by Stripe, guaranteeing a safe and trustworthy ordering experience.

## Features

- Browse and search a wide variety of products from top-notch vendors
- View and purchase best-selling products
- Manage your fridge inventory with real-time updates
- Customize or automate restocking and vendor orders based on your individualized needs
- Secure checkout process powered by Stripe

## Installation and Set-up Guide

1. Fork and clone the repository:

   ```
   git clone https://github.com/jmayheww/infinite-eats
   ```

2. Navigate to the project directory and install the necessary gems:

   ```
   cd infinite-eats
   bundle install
   ```

3. Navigate to the client directory and install the necessary npm packages:

   ```
   cd client
   npm install
   ```

4. In project root, set up the database and seed data:

   ```
   rails db:create
   rails db:migrate
   rails db:seed
   ```

5. In a new terminal window, start the Rails server:

   ```
   rails s
   ```

6. In another terminal window, start the React app:

   ```
   cd client
   npm start --prefix client
   ```

7. Visit `http://localhost:4000` in your browser to use the app.

## How to Use

_TODO: Include a walkthrough video or detailed instructions here._

## Resources and Documentation

- [Rails documentation](https://guides.rubyonrails.org/)
- [React.js documentation](https://reactjs.org/docs/getting-started.html)
- [React-Router documentation](https://reactrouter.com/)
- [Stripe documentation](https://stripe.com/docs/api)
- [Render documentation](https://render.com/docs)

## Technologies Used

### Languages and Frameworks

- Ruby
- Ruby on Rails
- JavaScript
- React
- CSS

### Main Package Installations

- @stripe/react-stripe-js
- @stripe/stripe-js
- active_model_serializers
- bcrypt
- bootsnap
- faker
- pg
- puma
- create-react-app
- react-router-dom
- react-scripts
- stripe
- tzinfo-data

## Deployment

This application is deployed with [Render](https://render.com). Render is a unified platform to build and run all your apps and websites with free SSL, a global CDN, private networks and auto deploys from Git.

If you want to deploy your own version of this application to Render, follow their [documentation](https://render.com/docs).

## Author

👤 **Joshua Mayhew**

- Github: [@jmayheww](https://github.com/jmayheww)
- LinkedIn: [@joshua-mayhew](https://www.linkedin.com/in/joshua-mayhew-28883a89/)
