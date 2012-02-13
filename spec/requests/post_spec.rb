require 'spec_helper'

describe "Blog homepage is displaying post titles" do
	before do
		@user = User.create(:first_name => "Groundskeeper", :last_name => "Willie", :email => "willie@springfield.edu", :password => "hello", :password_confirmation => "hello")
		visit login_path
		fill_in "email", :with => "willie@springfield.edu"
		fill_in "password", :with => "hello"
		click_button "Log in"
		visit new_post_path
		fill_in "title", :with => "test title"
		fill_in "body", :with => "test body"
		click_button "Create"
	end

	it "should show what the user just entered" do
		visit posts_path
		page.should have_content "test title"
	end
end