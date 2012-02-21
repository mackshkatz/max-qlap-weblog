require 'spec_helper'

describe Tag do
  context "there should be no duplicate tags" do
  	before do
  		@post = Post.new(:title => "title test1", :teaser => "teaser test1", :body => "body test1", :tags => ["tagname", "tagname"])
  	end

  	it "should reject duplicate tag on same post" do
  		@post.should_not be_valid
  	end
  end
end
