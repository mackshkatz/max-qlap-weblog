class Post < ActiveRecord::Base
	validates :title, :teaser, :body, :presence => true

	# # internal method rails uses to convert an object
	# # to a url parameter
	# def to_param
	# 	"#{id} #{title}".parameterize
	# end

	extend FriendlyId
	friendly_id :title, :use => :slugged
end
