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