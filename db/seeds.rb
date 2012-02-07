# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Emanuel', :city => cities.first)
max = User.create!(:first_name => "Max", :last_name => "Katz", :password => "hello", :password_confirmation => "hello", :email => "max@quickleft.com")