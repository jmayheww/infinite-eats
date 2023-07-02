class Api::AdminController < ApplicationController
  before_action :authorize_admin

  def admin_index
    users = User.all

    render json: users, each_serializer: AdminSerializer, status: :ok
  end

  private

  def authorize_admin
    return if @current_user && @current_user.email == 'joshsmayhew@gmail.com'

    render json: { message: 'You are not authorized to view this page' },
           status: :unauthorized
  end
end
