require 'spec_helper'

describe Api::V1::PostsController do
	before do
		@post = Post.create(:title => "Test Title", :body => "Test Body", :teaser => "Test Teaser")
		@post2 = Post.create(:title => "Test Title2", :body => "Test Body2", :teaser => "Test Teaser2")
	end
	it "should return presented post" do
		expected_json = [
			{
				:title => "Test Title",
				:body => "Test Body",
				:teaser => "Test Teaser"
			},
			{
				:title => "Test Title2",
				:body => "Test Body2",
				:teaser => "Test Teaser2"
			}
		].to_json
		get :index
		response.body.should == expected_json
	end

	it "should return specified post" do
		expected_json = [{
				:title => "Test Title",
				:body => "Test Body",
				:teaser => "Test Teaser"
			}].to_json
		get :show, :id => @post.id
		response.body.should == expected_json
	end
end