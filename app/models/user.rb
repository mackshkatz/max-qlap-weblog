class User < ActiveRecord::Base
	has_secure_password
	has_many :posts

	def full_name
		"#{first_name} #{last_name}"
	end

	extend FriendlyId
	friendly_id :first_name, :use => :slugged
end