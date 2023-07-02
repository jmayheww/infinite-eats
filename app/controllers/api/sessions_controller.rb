class Api::SessionsController < ApplicationController
  skip_before_action :authenticate_user, only: [:create]

  def create
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render_unauthorized_response
    end
  end

  def destroy
    session.delete :user_id
    head :no_content
  end

  private

  def render_unauthorized_response
    render json: { error: 'Invalid email or password' }, status: :unauthorized
  end
end
