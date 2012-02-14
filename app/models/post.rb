class Post < ActiveRecord::Base
	validates :title, :teaser, :body, :presence => true
end
