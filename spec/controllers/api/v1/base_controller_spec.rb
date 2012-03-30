require 'spec_helper'

describe Api::V1::BaseController do
	before do
		@post = Post.create(:title => "Test Title", :body => "Test Body", :teaser => "Test Teaser", :user_id => "1")
		@post2 = Post.create(:title => "Test Title2", :body => "Test Body2", :teaser => "Test Teaser2", :user_id => "2")
		@post3 = Post.create(:title => "Test Title3", :body => "Test Body3", :teaser => "Test Teaser3", :user_id => "2")

		@user = User.create(:first_name => "max", :last_name => "katz", :password => "hash", :password_confirmation => "hash")

		5.times do |i|
			@tag = Tag.create(:name => "tagz#{i}")
		end

		@comment = @post.comments.create(:body => "Test comment body", :email => "test@test.com", :approved => true)
		@comment2 = @post.comments.create(:body => "Test comment body2", :email => "test2@test.com")
		@comment3 = @post.comments.create(:body => "Test comment body3", :email => "test3@test.com")
	end

	it "should count the number of each model" do
		expected_json = { 
			counts: {
				posts: 3,
				authors: 1,
				tags: 5,
				comments: 3
			}
		}.to_json
		get :stats
		response.body.should == expected_json
	end
end