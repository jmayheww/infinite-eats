class Api::OrderItemsController < ApplicationController
  before_action :set_current_user
  before_action :authorize_user

  class Api::OrderItemsController < ApplicationController
    before_action :set_current_user
    before_action :authorize_user

    def update
      order_item = OrderItem.find(params[:id])
      order_item.update!(order_item_params)
      order = Order.find(order_item.order_id)
      order.update_total_price
      order.save

      render json: @current_user.orders
    end

    def destroy
      order_item = OrderItem.find(params[:id])
      order = Order.find(order_item.order_id)
      order_item.destroy

      # Remove the destroyed order item from the order's association
      order.order_items.delete(order_item)

      # Update the total price after removing the order item
      order.update_total_price
      order.save

      render json: @current_user.orders
    end

    private

    def set_current_user
      @current_user = User.find_by(id: session[:user_id])
    end

    def authorize_user
      return if @current_user

      render json: { error: 'Unauthorized Access. You must be logged in to access orders' },
             status: :unauthorized
    end

    def order_item_params
      params.require(:order_item).permit(:quantity, :name, :price)
    end
  end
end
