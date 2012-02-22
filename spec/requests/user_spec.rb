require 'spec_helper'

describe "A user can log in", :type => :request do
	before do
		@user = User.create(:first_name => "Groundskeeper", :last_name => "Willie", :email => "willie@springfield.edu", :password => "hello", :password_confirmation => "hello")
	end

	it "should allow the user to log in" do
		visit login_path
		fill_in "email", :with => "willie@springfield.edu"
		fill_in "password", :with => "hello"
		click_button "Log in"
		page.should have_content "You have been logged in!"
		page.should have_content "Create-a-post"
	end

	it "Slug should be the same as post author's name, instead of post author's id" do
		visit login_path
		fill_in "email", :with => "willie@springfield.edu"
		fill_in "password", :with => "hello"
		click_button "Log in"
		click_link "Create-a-post"
		fill_in "post_title", :with => "test title"
		fill_in "post_teaser", :with => "this is the portion of my post I want anyone to be able to see"
		fill_in "post_body", :with => "test body"
		click_button "Create"
		click_link "Groundskeeper"
		current_path.should == "/posts/author/Groundskeeper"
		page.should have_content "Groundskeeper"
	end
end

describe "A guest user" do
	before do
		@user = User.create(:first_name => "Groundskeeper", :last_name => "Willie", :email => "willie@springfield.edu", :password => "hello", :password_confirmation => "hello")
	end
	
	it "should not have the create-a-post page if not logged in" do
		visit root_path
		page.should_not have_content "Create-a-post"
	end
end