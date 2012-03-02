class Comment < ActiveRecord::Base
	#validates :email, :presence => true

	belongs_to :post, :touch => true
end
