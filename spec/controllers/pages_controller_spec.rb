require 'spec_helper'

describe PagesController do
	describe "GET 'About me'" do
		it "should be successful" do
			get 'about'
			response.should be_success
		end
	end
end