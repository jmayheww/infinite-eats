require 'stripe'

class Api::PaymentsController < ApplicationController
  def create
    Stripe.api_key = ENV['STRIPE_SECRET_KEY']

    payment_intent = Stripe::PaymentIntent.create(
      amount: params[:amount],
      currency: 'usd',
      metadata: {
        user_id: current_user.id
      }
    )

    payment_method = params[:payment_method_id]
    payment_intent.confirm(payment_method: payment_method)

    render json: { status: payment_intent.status }
  rescue Stripe::CardError => e
    render json: { error: e.message }
  end
end
