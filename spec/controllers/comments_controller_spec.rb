require 'spec_helper'

describe CommentsController do

	before do
		@comment1 = Comment.create(:body => 'one', :email => 'test@test.com' )
		@comment2 = Comment.create(:body => 'two', :email => 'test@test.com' )
		@comment3 = Comment.create(:body => 'three', :email => 'test@test.com' )
		@comments = [ @comment1, @comment2, @comment3 ]
	end

	describe "When getting the index" do
		it "lists out all the comments pending approval" do
			get :index
			assigns(:comments).count.should == 3
		end
	end
end