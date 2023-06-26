class Api::UsersController < ApplicationController
  before_action :set_current_user, only: %i[show update destroy]
  before_action :authorize_user, only: %i[show update destroy save_payment_method]

  rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotUnique, with: :render_unique_violation_response

  def create
    new_user = User.create!(user_params)

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

  def save_payment_method
    pm_id = params.require(:pm_id)

    @current_user.update(payment_method_id: pm_id)

    render json: @current_user, status: :ok
  end

  private

  # set the current user for the session.

  def set_current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  # authorize the user for the session.

  def authorize_user
    render json: { error: 'Not authorized' }, status: :unauthorized unless @current_user
  end

  # strong params: whitelist of allowed fields for user creation

  def user_params
    params.permit(:email, :password, :password_confirmation)
  end

  # strong params: whitelist of allowed fields for user update

  def profile_params
    params.permit(:user_image, :first_name, :last_name, :street_address, :username, :city, :state, :zip_code,
                  :phone_number, :email)
  end

  # rescue_from handlers

  def render_record_not_found_response(exception)
    render json: { error: "#{exception.model} not found" }, status: :unauthorized
  end

  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end

  def render_unique_violation_response(exception)
    error_message = "#{exception.model} already exists"
    render json: { error: error_message }, status: :unprocessable_entity
  end
end
