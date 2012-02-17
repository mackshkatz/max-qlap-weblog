class PostsController < ApplicationController
	before_filter :require_login, :except => [:index]

	def index
		if params[:user_id]
			@posts = Post.where(:user_id => params[:user_id]).paginate(:page => params[:page])
		else	
			@posts = Post.paginate(:page => params[:page], :per_page => 5, :order => 'created_at DESC')
			# Post.all#(:order => 'created_at ASC')
		end
	end

	def create
		@post = current_user.posts.new(params[:post])

		# you could use this if you wanted to add a hidden field in the create
		# form that posted the user_id writing the post, but bad practice
		# @post = Post.new(params[:post]) params[:post][:user_id]

		# old code
		# @post = Post.new(params[:post])
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
