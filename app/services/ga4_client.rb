require "google/analytics/data/v1beta"
require "googleauth"

class Ga4Client
  PROPERTY_ID = ENV.fetch("GA4_PROPERTY_ID")

  def cache(key, ttl: 5.minutes)
    Rails.cache.fetch(key, expires_in: ttl) { yield }
  end

  def initialize
    @client = Google::Analytics::Data::V1beta::AnalyticsData::Client.new do |config|
      config.credentials = JSON.parse(ENV.fetch("GA4_CREDENTIALS_JSON"))
    end
  end

  def pageviews(start_date:, end_date:)
    cache("ga4_pageviews_#{start_date}_#{end_date}") do

      @client.run_report(
        property: "properties/#{PROPERTY_ID}",
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }],
        date_ranges: [{ start_date: start_date, end_date: end_date }]
      ).rows.map do |row|
        {
          page: row.dimension_values[0].value,
          views: row.metric_values[0].value.to_i
        }
      end.reject { |entry| entry[:page].start_with?("/admin") }
    end
  end

  def traffic_sources(start_date:, end_date:)
    cache("ga4_traffic_sources_#{start_date}_#{end_date}") do

      @client.run_report(
        property: "properties/#{PROPERTY_ID}",
        dimensions: [{ name: "sessionSource" }],
        metrics: [{ name: "sessions" }],
        date_ranges: [{ start_date: start_date, end_date: end_date }]
      ).rows.map do |row|
        {
          source: row.dimension_values[0].value,
          sessions: row.metric_values[0].value.to_i
        }
      end
    end
  end

  def realtime_active_users
    @client.run_realtime_report(
      property: "properties/#{PROPERTY_ID}",
      dimensions: [{ name: "unifiedScreenName" }],
      metrics: [{ name: "activeUsers" }]
    ).rows.map do |row|
      {
        screen: row.dimension_values[0].value,
        active_users: row.metric_values[0].value.to_i
      }
    end
  end

  def daily_visitors(start_date:, end_date:)
    cache("ga4_daily_visitors_#{start_date}_#{end_date}") do

      response = @client.run_report(
        property: "properties/#{PROPERTY_ID}",
        dimensions: [{ name: "date" }],
        metrics: [{ name: "activeUsers" }],
        date_ranges: [{ start_date: start_date, end_date: end_date }]
      )
    
      response.rows.map do |row|
        {
          date: Date.strptime(row.dimension_values[0].value, "%Y%m%d").to_s,
          visitors: row.metric_values[0].value.to_i
        }
      end
    end
  end
  
end
