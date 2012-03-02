class PostSweeper < ActionController::Caching::Sweeper
	observe Post

	def sweep(post)
		expire_page posts_path
		expire_page '/'
	end

	alias_method :after_update, :sweep
	alias_method :after_create, :sweep
	alias_method :after_destroy, :sweep
end