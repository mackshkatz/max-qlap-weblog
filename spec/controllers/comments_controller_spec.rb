require 'spec_helper'

describe CommentsController do

	before do
		@comment1 = Comment.create(:id => 1, :body => 'one', :email => 'test@test.com' )
		@comment2 = Comment.create(:id => 2, :body => 'two', :email => 'test@test.com' )
		@comment3 = Comment.create(:id => 3, :body => 'three', :email => 'test@test.com' )
	end

	describe "When getting the index" do
		it "lists out all the comments pending approval" do
			get :index
			assigns(:comments).count.should == 3
		end
	end

	describe "When approving a comment" do
		it "changed the approved attribute to true" do
			put :update, :id => 1
			Comment.find(1).approved.should == true
		end
	end
end