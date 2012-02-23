# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Emanuel', :city => cities.first)
max = User.create!(:first_name => "Max", :last_name => "Katz", :password => "hello", :password_confirmation => "hello", :email => "max@quickleft.com")
kali = User.create!(:first_name => "Kali", :last_name => "Adams", :password => "bye", :password_confirmation => "bye", :email => "kali@quickleft.com")

# post1 = max.posts.create(title: "my post title", body: "my body")
# or
# post1 = Post.create(user: max, title: "my post title", body: "my body")

post1 = Post.create(:user => max, :title => "first post", :teaser => "read the first one", :body => "We number one yeaaa").tags.create(:name => "test")
post2 = Post.create(:user => max, :title => "second post", :teaser => "lurk inside", :body => "We number two yeaaa").tags.create(:name => "test")
post3 = Post.create(:user => max, :title => "third post", :teaser => "attention getter", :body => "We number three yeaaa").tags.create(:name => "shmeh")
post4 = Post.create(:user => max, :title => "fourth post", :teaser => "gadgdf", :body => "We number four yeaaa").tags.create(:name => "test")
post5 = Post.create(:user => kali, :title => "fifth post", :teaser => "read the first one", :body => "We number five yeaaa").tags.create(:name => "test")
post6 = Post.create(:user => kali, :title => "sixth post", :teaser => "read the first one", :body => "We number six yeaaa").tags.create(:name => "two")
post7 = Post.create(:user => max, :title => "seventh post", :teaser => "read the first one", :body => "We number seven yeaaa").tags.create(:name => "two")
post8 = Post.create(:user => max, :title => "eighth post", :teaser => "read the first one", :body => "We number eight yeaaa").tags.create(:name => "test")
post9 = Post.create(:user => max, :title => "ninth post", :teaser => "sgadsg", :body => "We number nine yeaaa").tags.create(:name => "shmeh")
post10 = Post.create(:user => kali, :title => "tenth post", :teaser => "read the last one", :body => "We number ten yeaaa").tags.create(:name => "two")
