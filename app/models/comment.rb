class Comment < ActiveRecord::Base
	#validates :email, :presence => true
	belongs_to :post, :touch => true
	after_initialize :init

	def init
		self.approved = false if self.approved.nil?
	end

	scope :approved, lambda { |value = true| where(:approved => value) }
	# def self.approved ( value = true )
	# 	self.where(:approved => value)
	# end

end
