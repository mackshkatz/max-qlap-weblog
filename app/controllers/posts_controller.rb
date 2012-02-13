class PostsController < ApplicationController
	before_filter :require_login, :except => [:index]

	def index
		@posts = Post.all
	end

	def create
		@post = Post.new(params[:post])
		if @post.save
			redirect_to posts_path
		else
			render new_post_path
		end
	end

	def new
		@post = Post.new
	end

	def show
		@post = Post.find(params[:id])
	end
end
