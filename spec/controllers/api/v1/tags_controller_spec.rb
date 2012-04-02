require 'spec_helper'

describe Api::V1::TagsController do
	before do
		max = User.create!(:first_name => "Max", :last_name => "Katz", :password => "hello", :password_confirmation => "hello", :email => "max@quickleft.com")

		@test_tag = Tag.create(:name => "test")
		@test_tag2 = Tag.create(:name => "test2")
		@test_tag3 = Tag.create(:name => "test3")
		@test_tag4 = Tag.create(:name => "test4")

		@post1 = Post.create(:user => max, :title => "first post", :teaser => "read the first one", :body => "We number one yeaaa")
		@post2 = Post.create(:user => max, :title => "second post", :teaser => "read the second one", :body => "We number two yeaaa")
		@post3 = Post.create(:user => max, :title => "third post", :teaser => "read the third one", :body => "We number three yeaaa")
		@post4 = Post.create(:user => max, :title => "fourth post", :teaser => "read the fourth one", :body => "We number four yeaaa")
		@post5 = Post.create(:user => max, :title => "fifth post", :teaser => "read the fifth one", :body => "We number five yeaaa")
		@post6 = Post.create(:user => max, :title => "sixth post", :teaser => "read the sixth one", :body => "We number six yeaaa")

		@post1.tags << [@test_tag, @test_tag2]
		@post2.tags << [@test_tag, @test_tag4]
		@post3.tags << [@test_tag, @test_tag2]
		@post4.tags << [@test_tag, @test_tag3]
		@post5.tags << [@test_tag, @test_tag2, @test_tag3, @test_tag4]
	end

	it "should show posts filtered by tag" do
		expected_json = [
			{
				:author => "max", # should be author: instead?
				:title => "first post",
				:teaser => "read the first one",
				:body => "We number one yeaaa"
			},
			{
				:author => "max",
				:title => "third post",
				:teaser => "read the third one",
				:body => "We number three yeaaa"
			},
			{
				:author => "max",
				:title => "fifth post",
				:teaser => "read the fifth one",
				:body => "We number five yeaaa"
			}
		]
		get :show, :tag_id => @test_tag2.id
		response.body.should == expected_json
	end
end