class Api::AnalyticsController < ApplicationController
  def index
    start_date = params[:start_date] || Date.today.to_s
    end_date = params[:end_date] || Date.today.to_s

    client = Ga4Client.new

    render json: {
      pageviews: client.pageviews(start_date: start_date, end_date: end_date),
      traffic_sources: client.traffic_sources(start_date: start_date, end_date: end_date),
      daily_visitors: client.daily_visitors(start_date: start_date, end_date: end_date),
      realtime_data: client.realtime_active_users
    }
  end
end
