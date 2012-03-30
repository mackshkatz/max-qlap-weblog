class CommentsPresenter < Api::V1::BasePresenter
	attr_accessor :comments

	def initialize(comments)
		@comments = comments
	end

	def present
		comments_array = []
		self.comments.each do |comment|
			comments_array << {
				:body => comment.body,
				:email => comment.email,
				:approved => comment.approved
			}
		end
		comments_array
	end

	def count
		
	end
end