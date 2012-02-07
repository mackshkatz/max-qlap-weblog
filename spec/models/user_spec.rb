require 'spec_helper'

describe User do
  before do
  	@user = User.create(:first_name => "David", :last_name => "Aragon")
	end

	it "should return the user's full name" do
		@user.full_name.should == "David Aragon"
	end

end
