class Api::V1::PostsController < Api::V1::BaseController
	def index
		@posts = Post.all
		presenter = PostsPresenter.new(@posts)
		render :json => presenter.present and return
	end

	def show
		@post = Post.find(params[:id])
		presenter = PostsPresenter.new([@post])
		render :json => presenter.present and return
	end
end