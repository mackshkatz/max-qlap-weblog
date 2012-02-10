class SessionsController < ApplicationController
	skip_before_filter :require_login, :only => [:index, :new, :create]

	def index
		@posts = Post.all
	end

	def create
		user = User.find_by_email(params[:email])
	  if user && user.authenticate(params[:password])
	    session[:user_id] = user.id
	    redirect_to root_path, :notice => "You have been logged in!"
	  else
	    flash.now[:alert] = "Invalid email or password"
	    render "new" # render :action => "new"
	    # redirect_to login_path, :alert => "Invalid creds"
	  end
	end

	def destroy
		session[:user_id] = nil
	  redirect_to root_path, :notice => "Logged out!"
	end

	def new

	end

end