class Api::SessionsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_unauthorized_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  def create
    user = User.find_by(email: params[:email])

    user&.authenticate(params[:password])
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def destroy
    session.delete :user_id
    head :no_content
  end

  private

  def render_unauthorized_response
    render json: { error: 'Invalid email or password' }, status: :unauthorized
  end

  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end
end
