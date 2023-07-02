# app/controllers/application_controller.rb
class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :set_current_user
  before_action :authenticate_user

  rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  private

  def set_current_user
    @current_user = User.find_by(id: session[:user_id])
  end

  def authenticate_user
    render json: { errors: ['Not authorized'] }, status: :unauthorized unless @current_user
  end

  def render_record_not_found_response(exception)
    render json: { error: "#{exception.model} not found" }, status: :not_found
  end

  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end
end
