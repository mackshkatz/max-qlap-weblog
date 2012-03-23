class CommentsController < ApplicationController
	def index
		@comments = Comment.approved
	end

	def create
		@post = Post.find(params[:post_id])
		@comment = @post.comments.new(params[:comment])

		if @comment.save
			redirect_to post_path(@post), :notice => "Your comment successfully saved"
		else
			render "posts/show"
		end
	end

	def update
		@comment = Comment.find(params[:id])
		@comment.approved = true
		@comment.save
		redirect_to comments_path
	end
end