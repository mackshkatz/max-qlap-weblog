require 'spec_helper'

describe Tag do
  context "there should be no duplicate tags" do
  	before do
  		@tag = Tag.create(:name => "tagname")
  		@tag2 = Tag.new(:name => "tagname")
  	end

  	it "should reject duplicate tag on same post" do
  		@tag2.should_not be_valid
  	end
  end
end
