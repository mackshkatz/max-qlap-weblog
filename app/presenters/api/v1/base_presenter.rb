class Api::V1::BasePresenter
  attr_accessor :controller, :subject
  delegate :params, :to => :controller
  delegate :errors, :to => :subject

  def initialize(controller, subject)
    @controller = controller
    @subject = subject
  end

  def present(options = {})
    if subject.is_a?(Enumerable)
      present_collection(subject, options)
    else
      present_object(subject, options)
    end
  end

  def present_object(object, options = {})
    return object unless object.errors.empty? # Renders validation errors
    unless options[:include_root]
      if options[:minimal]
        {
          :id => object.id,
          :name => object.name
        }
      else
        object.as_json
      end
    else
      options.merge!(:include_root => false)
      { subject_class.to_sym => present_object(object, options) }
    end
  end

  def present_collection(object, options = {})
    if options[:include_root]
      options.delete_if {|key,value| key == :include_root }
      data_entries = []
      object.each { |obj| data_entries << present_object(obj, options) }
      data_collection = { subject_class.pluralize.to_sym => data_entries }
    else
      data_collection = []
      object.each { |obj| data_collection << present_object(obj, options) }
      data_collection
    end
  end

  def subject_class
    @controller.class.name.gsub!('Api::V1::', '').gsub!('Controller', '').downcase.singularize
  end
end