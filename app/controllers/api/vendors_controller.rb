class Api::VendorsController < ApplicationController
  def index
    vendors = Vendor.all
    render json: vendors, each_serializer: VendorSerializer
  end

  def show
    vendor = Vendor.find(params[:id])
    render json: vendor, serializer: VendorSerializer
  end
end
