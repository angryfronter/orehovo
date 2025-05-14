class Api::MarksController < ApplicationController
  def index
    marks = Mark.all
    brand_logos = load_brand_logos
    enriched_marks = marks.map do |mark|
      logo = brand_logos[mark.name.upcase] || '/placeholder.svg'
      {
        id: mark.id,
        name: mark.name,
        logo: logo
      }
    end

    render json: { marks: enriched_marks }
  end

  private

  def load_brand_logos
    file_path = Rails.root.join('config', 'brand_logos', 'data.json')
    data = JSON.parse(File.read(file_path))
    data.index_by { |b| b['name'].upcase }
        .transform_values { |b| b['image']['source'] }
  rescue => e
    Rails.logger.error("Error loading brand logos: #{e.message}")
    {}
  end
end
