class Api::UsersController < ApplicationController
  before_action :set_current_user, only: %i[show update destroy]

  rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotUnique, with: :render_unique_violation_response

  def show
    render json: @current_user, status: :ok
  end

  private

  def set_current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  def render_record_not_found_response(_exception)
    render json: { error: 'Not authorized.' }, status: :unauthorized
  end

  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end

  def render_unique_violation_response(_exception)
    error_message = "#{model} already exists"
    render json: { error: error_message }, status: :unprocessable_entity
  end
end
