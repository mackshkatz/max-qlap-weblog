class Api::V1::PostsController < Api::V1::BaseController
  before_filter :find_post
  before_filter :find_posts
  # before_filter :find_todo_items, :only => [:index]
  # before_filter :find_todo_item, :only => [:show]

  def index
    present @posts
  end

  def show
    present @post
  end

  def create
    @post = Post.new(params[:post])
    @post.save
    present @post
  end

  private

  def find_posts
    @posts = Post.all
  end
  
  def find_post
    @post = Post.find(params[:id]) if params[:id]
  end
  # def find_todo_items
  #   @todo_items = @todo_list ? @todo_list.todo_items : TodoItem.all
  # end

  # def find_todo_item
  #   if @todo_list
  #     @todo_item = @todo_list.todo_items.find(params[:id])
  #   else
  #     @todo_item = TodoItem.find(params[:id])
  #   end
  # end
end

