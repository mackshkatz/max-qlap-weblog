require 'spec_helper'

describe Api::V1::CommentsController do
	before do
		@post = Post.create(:title => "Test Title", :body => "Test Body", :teaser => "Test Teaser")
		@comment = @post.comments.create(:body => "Test comment body", :email => "test@test.com", :approved => true)
		@comment2 = @post.comments.create(:body => "Test comment body2", :email => "test2@test.com")
		@comment3 = @post.comments.create(:body => "Test comment body3", :email => "test3@test.com")
	end
	it "should return unapproved comments" do
		expected_json = [
			{
				:body => "Test comment body2",
				:email => "test2@test.com",
				:approved => false
			},
			{
				:body => "Test comment body3",
				:email => "test3@test.com",
				:approved => false
			}
		].to_json
		get :unapproved
		response.body.should == expected_json
	end
end