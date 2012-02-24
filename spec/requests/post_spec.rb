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

	it "Blog homepage only shows last 5 posts" do
		10.times do	|x|
			visit new_post_path
			fill_in "post_title", :with => "#{x} test title"
			fill_in "post_teaser", :with => "#{x} this is the portion of my post I want anyone to be able to see"
			fill_in "post_body", :with => "#{x} test body"
			click_button "Create"
		end
		page.should_not have_content "4 test title"
	end

	it "Slug should be the same as post title, instead of post id" do
		click_link "test title"
		current_path.should == "/posts/test-title"
	end

	it "Should allow anyone to comment on a post" do
		click_link "test title"
		fill_in "comment_body", :with => "comment body"
		fill_in "comment_email", :with => "max@test.com"
		click_button "Create"
		page.should have_content "comment body"
	end
end



