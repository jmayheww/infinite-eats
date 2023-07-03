class Api::OrderItemsController < ApplicationController
  def update
    order_item = OrderItem.find(params[:id])
    order_item.update!(order_item_params)

    order = Order.find(order_item.order_id)
    order.update_total_price
    order.save

    updated_order_item = OrderItem.find(order_item.id)
    updated_order = Order.find(order.id)

    render json: { order: updated_order, order_item: updated_order_item }, status: :ok
  end

  def destroy
    order_item = OrderItem.find(params[:id])
    order = Order.find(order_item.order_id)
    order_item.destroy

    order.update_total_price
    order.save

    render json: @current_user.orders
  end

  private

  def order_item_params
    params.require(:order_item).permit(:quantity, :name, :price)
  end
end
