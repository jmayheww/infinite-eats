class Api::OrderItemsController < ApplicationController
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

    order.order_items.delete(order_item)

    order.update_total_price
    order.save

    render json: @current_user.orders
  end

  private

  def order_item_params
    params.require(:order_item).permit(:quantity, :name, :price)
  end
end
