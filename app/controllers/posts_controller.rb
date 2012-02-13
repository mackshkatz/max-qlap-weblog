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

	def edit
		@post = Post.find(params[:id])
	end

	def update
		@post = Post.find(params[:id])
		if @post.update_attributes(params[:post])
			redirect_to root_path
		else
			flash.now[:alert] = "Update didn't save"
			render :edit
		end
	end

end
