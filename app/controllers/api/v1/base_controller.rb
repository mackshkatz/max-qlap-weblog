class Api::V1::BaseController < ActionController::Base
  respond_to :json, :xml

  before_filter :set_default_response_format
  around_filter :catch_exceptions

  def present(instance, options = {})
    presenter = presenter_class.new(self, instance)
    respond_with presenter.present(options), :location => nil
  end

  def presenter_class
    (self.class.name.gsub!('Controller', '').singularize + 'Presenter').constantize
  end  
  
  private

  def set_default_response_format
    request.format = :json unless params[:format]
  end

  def render_error(msg)
    render json: { :error => msg }, :status => 500
  end

  def render_record_not_found
    render json: { :error => 'record not found' }, :status => 404
  end

  def catch_exceptions
    yield
  rescue ActiveRecord::RecordNotFound
    render_record_not_found
  rescue Exception => e
    Rails.logger.debug e.inspect
    Rails.logger.debug e.message.inspect
    e.backtrace.each { |l| Rails.logger.debug l.inspect }
    render_error e.message
  end

end
