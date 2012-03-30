class Api::V1::PostsPresenter < Api::V1::BasePresenter
	attr_accessor :posts

	def initialize(posts)
		@posts = posts
	end

	def present
		posts_array = []
		self.posts.each do |post|
			posts_array << {
				:title => post.title,
				:body => post.body,
				:teaser => post.teaser
			}
		end
		posts_array
	end
end