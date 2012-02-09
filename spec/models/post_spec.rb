# require 'spec_helper'

# describe Post do
# 	it "should require valid title and body" do
# 		should validate_uniqueness_of(:title)
# 		should validate_uniqueness_of(:body)
# 	end
# end

require 'spec_helper'

describe Post do

	context "valid post" do
		before do
			@post = Post.new(:title => "title test", :body => "body test")
		end

		it "should require valid title and body" do
			@post.should be_valid
		end
	end

	context "invalid post" do
		before do
			@post = Post.new()
		end

		it "should require a title and body" do
			@post.should_not be_valid
		end
	end

end