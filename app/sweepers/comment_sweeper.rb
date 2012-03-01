class CommentSweeper < ActionController::Caching::Sweeper
	observe Comment

	def sweep(comment)
		expire_fragment 'comment_section'
	end

	alias_method :after_create, :sweep
end