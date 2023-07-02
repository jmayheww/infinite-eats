class Api::UsersController < ApplicationController
  skip_before_action :authenticate_user, only: [:create]

  def create
    new_user = User.create!(user_params)

    # Set your secret key. Remember to switch to your live secret key in production!
    # See your keys here: https://dashboard.stripe.com/account/apikeys
    Stripe.api_key = Rails.application.credentials.dig(:stripe, :secret_key)

    # Creates a new Stripe customer on signup
    customer = Stripe::Customer.create({ email: new_user.email })

    # Update the user with their new Stripe customer ID
    new_user.update!(stripe_customer_id: customer.id)

    session[:user_id] = new_user.id
    render json: new_user, status: :created
  end

  def show
    render json: @current_user, status: :ok
  end

  def update
    @current_user.update!(profile_params)
    render json: @current_user, status: :ok
  end

  def destroy
    @current_user.destroy
    head :no_content
  end

  private

  # strong params: whitelist of allowed fields for user creation
  def user_params
    params.permit(:email, :password, :password_confirmation, :stripe_customer_id)
  end

  # strong params: whitelist of allowed fields for user update
  def profile_params
    params.permit(:user_image, :first_name, :last_name, :street_address, :username, :city, :state, :postal_code,
                  :phone_number, :email)
  end
end
