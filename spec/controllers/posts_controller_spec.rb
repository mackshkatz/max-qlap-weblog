require 'spec_helper'

describe PostsController do
	describe "GET 'RSS Feed'" do
		it "should be successful" do
			get 'index', :format => 'rss'
			response.should be_success
		end
	end
end
