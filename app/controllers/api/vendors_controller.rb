class Api::VendorsController < ApplicationController
  def index
    vendors = Vendor.all
    render json: vendors
  end

  def show
    vendor = Vendor.find(params[:id])
    render json: vendor
  end
end
