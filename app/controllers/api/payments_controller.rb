require 'stripe'

class Api::PaymentsController < ApplicationController
  before_action :validate_payment_params, only: [:create_payment_intent]

  Stripe.api_key = ENV['STRIPE_SECRET_KEY']

  def create_payment_intent
    intent = Stripe::PaymentIntent.create({
                                            amount: params[:amount],
                                            currency: 'usd',
                                            metadata: { integration_check: 'accept_a_payment' }
                                          })

    render json: { clientSecret: intent.client_secret }
  rescue Stripe::StripeError => e
    render json: { error: e.message }, status: 400
  end

  private

  def validate_payment_params
    params[:amount] = params[:amount].to_i

    # Validate that params[:amount] is a positive integer
    return if params[:amount].is_a?(Integer) && params[:amount] > 0

    render json: { error: 'Invalid amount parameter. It should be a positive integer.' }, status: 400
    nil

    # Add more validations as necessary
  end
end
