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

At Infinite Eats, we understand the challenges of managing stock and inventory, whether it's for a private individual household or within the fast-paced food service industry. That's why we've developed a platform that aims to streamline and ease the burden of tracking "fridge" inventory. With access to real-time fridge inventory tracking and a robust ordering system, Infinite Eats empowers users to take control of their inventory management like never before.

Our goal is to provide a seamless and efficient solution that allows users to effortlessly track their inventory, ensuring that they never run out of essential items. With our future updates, we're working towards enabling users to customize and automate the restocking and vendor ordering process based on individualized parameters.

## General User Experience

Infinite Eats provides users with the ability to browse through a range of vendors and their products. Users can order their preferred products, update their fridge inventory in real-time, and set up automated or custom orders for restocking their "fridges". A secure checkout process is provided via Stripe, ensuring a safe and reliable shopping experience.

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
