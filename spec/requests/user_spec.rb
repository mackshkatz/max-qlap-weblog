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
	end
end

describe "A guest can't see a certain link" do
	context "A guest user" do
		it "should not have the create-a-post page if not logged in" do
			visit root_path
			page.should_not have_content "Create-a-post"
		end
	end

	context "A user" do
		it "should have the create-a-post page if logged in" do
			visit root_path
			fill_in "email", :with => "willie@springfield.edu"
			fill_in "password", :with => "hello"
			click_button "Log in"
			page.should have_content "Create-a-post"
		end
	end
end