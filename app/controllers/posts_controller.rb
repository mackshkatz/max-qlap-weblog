class PostsController < ApplicationController
	def index
		@posts = Post.all
	end

	def create
		@post = Post.new(params[:id])
		if @post.save
			redirect_to posts_path
		else
			render new_post_path
		end
	end

	def new
		@post = Post.new
	end
end
