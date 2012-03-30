class Api::V1::BaseController < ActionController::Base
	def stats
		presenter = StatsPresenter.new
		render :json => presenter.present and return
	end
end