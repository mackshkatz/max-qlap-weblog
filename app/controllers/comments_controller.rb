class CommentsController < ApplicationController
	def create
		@post = Post.find(params[:post_id])
		@comment = @post.comments.new(params[:comment])

		if @comment.save
			expire_page post_path(@post)
			redirect_to post_path(@post), :notice => "Your comment successfully saved"
		else
			render "posts/show"
		end
	end
end