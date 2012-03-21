require 'spec_helper'

describe SessionsController do
	before do
		@user = User.create(:id => 1, :first_name => "testy", :last_name => "cole" )
		session[:user_id] = @user.id
	end

	describe "When logging out" do
		it "nullifies the session" do
			delete :destroy, :user_id => 1
			session[:user_id].should == nil
		end
	end
end