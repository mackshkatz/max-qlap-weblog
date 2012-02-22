class Tag < ActiveRecord::Base
	has_and_belongs_to_many :posts
	# validates :name, :uniqueness => true

	# extend FriendlyId
	# friendly_id :name, :use => :slugged
end
