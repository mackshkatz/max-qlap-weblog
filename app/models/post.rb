class Post < ActiveRecord::Base
	validates :title, :teaser, :body, :presence => true
	#before_save :get_tag_names

	belongs_to :user
	has_and_belongs_to_many :tags
	has_many :comments

	#passing the friendly_id method the title attribute to use that for the url
	extend FriendlyId
	friendly_id :title, :use => :slugged

	mount_uploader :image, ImageUploader
	# specify string in posts form for tag 'post[tags]'
	# in this model use before filter to do logic that is currently in create action of posts controller


	# @post.attach_tags_from_params
	def attach_tags_from_params(params)
		tag_names = params[:tags].split
		tag_names.each do |tag_name|
			tag = Tag.find_or_create_by_name(tag_name)
			self.tags << tag
		end		
	end

	# Post.find_all_before_2011
	def self.find_all_before_2011

	end
end
