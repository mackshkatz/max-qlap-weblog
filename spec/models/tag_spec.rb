require 'spec_helper'

describe Tag do
  context "there should be no duplicate tags" do
  	before do
  		@tag = Tag.new(:name => ["tagname", "tagname"])
  	end

  	it "should reject duplicate tag on same post" do
  		@tag.should_not be_valid
  	end
  end
end
