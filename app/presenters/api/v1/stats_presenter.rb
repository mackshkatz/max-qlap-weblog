class Api::V1::StatsPresenter < Api::V1::BasePresenter
	def present
		{
			counts: {
				posts: Post.count,
				authors: User.count,
				tags: Tag.count,
				comments: Comment.count
			}
		}
	end
end