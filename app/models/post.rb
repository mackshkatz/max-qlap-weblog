class Post < ActiveRecord::Base
	validates :title, :teaser, :body, :presence => true

	belongs_to :user
	has_and_belongs_to_many :tags
	has_many :comments

	#passing the friendly_id method the title attribute to use that for the url
	extend FriendlyId
	friendly_id :title, :use => :slugged

	mount_uploader :image, ImageUploader
	# specify string in posts form for tag 'post[tags]'
	# in this model use before filter to do logic that is currently in create action of posts controller
end
