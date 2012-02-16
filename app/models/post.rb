class Post < ActiveRecord::Base
	validates :title, :teaser, :body, :presence => true

	belongs_to :user

	# # internal method rails uses to convert an object
	# # to a url parameter
	# def to_param
	# 	"#{id} #{title}".parameterize
	# end

	#passing the friendly_id method the title attribute to use that for the url
	extend FriendlyId
	friendly_id :title, :use => :slugged

end
