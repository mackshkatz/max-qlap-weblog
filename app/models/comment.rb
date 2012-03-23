class Comment < ActiveRecord::Base
	#validates :email, :presence => true
	belongs_to :post, :touch => true
	after_initialize :init

	def init
		self.approved = false if self.approved.nil?
	end

	scope :approved, where(:approved => true)
	# def approved_true
	# 	where(:approved => true)
	# end
end
