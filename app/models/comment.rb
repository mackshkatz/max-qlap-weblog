class Comment < ActiveRecord::Base
	validates :email, :presence => true

	belongs_to :posts
end
