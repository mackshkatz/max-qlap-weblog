class Api::V1::CommentsController < Api::V1::BaseController
	def index
		@post = Post.find(params[:post_id])
		@comments = @post.comments.all
		presenter = CommentsPresenter.new(@comments)
		render :json => presenter.present and return
	end

	def unapproved
		@comments = Comment.where(:approved => false)
		presenter = CommentsPresenter.new(@comments)
		render :json => presenter.present and return
	end
end