class Comment < ActiveRecord::Base
	#validates :email, :presence => true
	belongs_to :post, :touch => true
	after_initialize :init

	def init
		self.approved = false if self.approved.nil?
	end
end
