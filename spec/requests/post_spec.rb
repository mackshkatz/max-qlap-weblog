require 'spec_helper'

describe "Blog homepage is displaying post titles" do
	before do
		@user = User.create(:first_name => "Groundskeeper", :last_name => "Willie", :email => "willie@springfield.edu", :password => "hello", :password_confirmation => "hello")
		login(@user, "hello")
		visit new_post_path
		fill_in "post_title", :with => "test title"
		fill_in "post_teaser", :with => "this is the portion of my post I want anyone to be able to see"
		fill_in "post_body", :with => "test body"
		click_button "Create"
	end

	it "should show what the user just entered" do
		visit posts_path
		page.should have_content "test title"
	end

	it "should allow user to edit an existing blog post" do
		click_link "test title"
		click_link "Edit Post"
		fill_in "post_title", :with => "updated title"
		click_button "Update"
		page.should have_content "updated title"
	end

	it "should render errors on the page if a user tries to create/update an invalid post" do
		click_link "test title"
		click_link "Edit Post"
		fill_in "post_title", :with => ""
		click_button "Update"
		page.should have_content "Title can't be blank"
	end

	it "Blog homepage shows the teaser for each post" do
		page.should have_content "this is the portion of my post I want anyone to be able to see"
	end
end



