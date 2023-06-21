require 'stripe'

class Api::PaymentsController < ApplicationController
  def create
    Stripe.api_key = ENV['STRIPE_SECRET_KEY']

    session = Stripe::Checkout::Session.create(
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt'
          },
          unit_amount: 2000
        },
        quantity: 1,
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: 10
        }
      }],
      mode: 'payment',
      success_url: YOUR_SUCCESS_URL,
      cancel_url: YOUR_CANCEL_URL
    )

    render json: { id: session.id }
  end
end
