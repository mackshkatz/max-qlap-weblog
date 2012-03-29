require 'spec_helper'

describe PostsPresenter do
	before do
		@post = Post.create(:title => "Test Title", :body => "Test Body", :teaser => "Test Teaser")
	end

	it "should present the post" do
		presented_post = PostsPresenter.new(@post)
		expected_json = {
			:title => "Test Title",
			:body => "Test Body",
			:teaser => "Test Teaser"
		}

		presented_post.present.should == expected_json
	end
end