require 'spec_helper'

describe "Guests can view posts for a given tag" do
	before do
		@user = User.create(:first_name => "Groundskeeper", :last_name => "Willie", :email => "willie@springfield.edu", :password => "hello", :password_confirmation => "hello")
		login(@user, "hello")
		visit new_post_path
		fill_in "post_title", :with => "test title"
		fill_in "post_teaser", :with => "this is the portion of my post I want anyone to be able to see"
		fill_in "post_body", :with => "test body"
		fill_in "tags", :with => "test-tag"
		click_button "Create"
	end

	it "should show the tags as links on homepage" do
		page.should have_link "test-tag"
	end

	it "should filter all posts for a given tag" do
		click_link "test-tag"
		current_path.should == "/posts/tags/test-tag"
		page.should have_content "test title"
	end
end