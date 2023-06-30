require 'stripe'

class Api::PaymentsController < ApplicationController
  before_action :validate_payment_params, only: [:create_payment_intent]
  before_action :set_current_user, only: [:create_payment_intent]
  before_action :authorize_user, only: [:create_payment_intent]

  Stripe.api_key = ENV['STRIPE_SECRET_KEY']

  def create_payment_intent
    intent = Stripe::PaymentIntent.create({
                                            amount: params[:amount],
                                            currency: 'usd',
                                            metadata: { integration_check: 'accept_a_payment' },
                                            payment_method_types: ['card'],
                                            customer: @current_user.stripe_customer_id
                                          })

    render json: { clientSecret: intent.client_secret }
  rescue Stripe::StripeError => e
    render json: { error: e.message }, status: 400
  end

  private

  # Set the current user for the session.
  def set_current_user
    @current_user = User.find_by(id: session[:user_id])
  end

  def authorize_user
    render json: { error: 'Not authorized' }, status: :unauthorized unless @current_user
  end

  def validate_payment_params
    params[:amount] = params[:amount].to_i

    # Validate that params[:amount] is a positive integer
    return if params[:amount].is_a?(Integer) && params[:amount] > 0

    render json: { error: 'Invalid amount parameter. It should be a positive integer.' }, status: 400
  end
end
