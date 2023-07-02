class Api::VendorsController < ApplicationController
  skip_before_action :authenticate_user

  def index
    vendors = Vendor.all
    render json: vendors, each_serializer: VendorSerializer
  end

  def show
    vendor = Vendor.find(params[:id])
    render json: vendor, serializer: VendorSerializer
  rescue ActiveRecord::RecordNotFound => e
    render_record_not_found_response(e)
  end
end
