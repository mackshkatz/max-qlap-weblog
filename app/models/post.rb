class Post < ActiveRecord::Base
	validates :title, :teaser, :body, :presence => true

	belongs_to :user
	has_and_belongs_to_many :tags
	has_many :comments

	#passing the friendly_id method the title attribute to use that for the url
	extend FriendlyId
	friendly_id :title, :use => :slugged

	mount_uploader :image, ImageUploader

	def attach_tags_from_params(params)
		tag_names = params[:tags].split
		tag_names.each do |tag_name|
			tag = Tag.find_or_create_by_name(tag_name)
			self.tags << tag
		end		
	end
end
