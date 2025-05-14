require 'open-uri'

class CarImporterService
  API_URL = 'https://app.plex-crm.ru/api/v3/offers/website/627'
  TOKEN = 'ezo4ysJQm1r1ZiFsFxBtp7zOV5rYAgYY9o3RWkz325009358'

  def self.import(count = 5)
    url = "#{API_URL}?limit=#{count}"
    response = URI.open(url, "Authorization" => "Bearer #{TOKEN}").read
    data = JSON.parse(response)

    data["items"].first(count).each do |item|

      mark = Mark.find_or_create_by!(name: item["mark"]["title"])
      model = Model.find_or_create_by!(name: item["model"]["title"], mark: mark)
      body_type = BodyType.find_or_create_by!(name: item["bodyType"]["title"])
      gearbox = Gearbox.find_or_create_by!(name: item["gearbox"]["title"])
      drive_type = DriveType.find_or_create_by!(name: item["driveType"]["title"])

      car = Car.create!(
        external_id: item["id"],
        unique_id: item["uniqueId"],
        offer_type: item["offerType"],
        mark: mark,
        model: model,
        generation: item["generation"],
        modification: item["modification"],
        modification_auto_ru_xml_id: item["modificationAutoRuXmlId"],
        complectation: item["complectation"],
        body_type: body_type,
        category: item["category"],
        car_type: item.dig("type", "title"),
        section: item["section"],
        dealer_id: item["dealerId"],
        dealer_name: item["dealerName"],
        dealer_description: item["dealerDescription"],
        engine_power: item["enginePower"],
        engine_volume: item["engineVolume"],
        engine_type: item["engineType"],
        gearbox: gearbox,
        drive_type: drive_type,
        color: item["color"],
        is_metallic: item["isMetallic"],
        wheel: item["wheel"],
        owners: item["owners"],
        state: item["state"],
        year: item["year"],
        run: item["run"],
        price: item["price"],
        price_old: item["priceOld"],
        vin: item["vin"],
        description: item["description"],
        note: item["note"],
        specifications: item["specifications"],
        equipment: item["equipment"],
        equipment_groups: item["equipmentGroups"],
        tags: [],
        is_active: item["isActive"],
        remote_created_at: item["createdAt"],
        remote_updated_at: item["updatedAt"]
      )

      attach_images(car, item["images"])
    end
  end

  def self.attach_images(car, images)
    return if images.blank?

    images.each do |img|
      url = img["original"]
      next unless url.present?

      file = URI.open(url)
      filename = File.basename(URI.parse(url).path)
      car.images.attach(io: file, filename: filename, content_type: 'image/jpeg')
    end
  end
end
