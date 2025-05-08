# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_05_08_111220) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "cars", force: :cascade do |t|
    t.integer "external_id"
    t.string "unique_id"
    t.jsonb "offer_type", default: {}
    t.jsonb "mark", default: {}
    t.jsonb "model", default: {}
    t.jsonb "generation", default: {}
    t.string "modification"
    t.string "modification_auto_ru_xml_id"
    t.string "complectation"
    t.jsonb "body_type", default: {}
    t.jsonb "category", default: {}
    t.string "car_type"
    t.jsonb "section", default: {}
    t.integer "dealer_id"
    t.string "dealer_name"
    t.text "dealer_description"
    t.integer "engine_power"
    t.integer "engine_power_kwh"
    t.float "engine_volume"
    t.jsonb "engine_type", default: {}
    t.jsonb "gearbox", default: {}
    t.jsonb "drive_type", default: {}
    t.jsonb "color", default: {}
    t.boolean "is_metallic"
    t.jsonb "wheel", default: {}
    t.jsonb "owners", default: {}
    t.jsonb "state", default: {}
    t.jsonb "passport", default: {}
    t.integer "year"
    t.integer "run"
    t.integer "price"
    t.integer "price_old"
    t.string "vin"
    t.text "description"
    t.text "note"
    t.jsonb "specifications", default: []
    t.jsonb "equipment", default: {}
    t.jsonb "equipment_groups", default: {}
    t.jsonb "tags", default: []
    t.boolean "is_active"
    t.datetime "remote_created_at"
    t.datetime "remote_updated_at"
    t.boolean "visible", default: true
    t.boolean "is_hot_offer", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "contacts", force: :cascade do |t|
    t.string "address"
    t.string "phone"
    t.string "email"
    t.string "opening_hours"
    t.string "website_name"
    t.string "website_description"
    t.string "facebook_link"
    t.string "vk_link"
    t.string "instagram_link"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "credit_programs", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.decimal "interest_rate", precision: 5, scale: 2
    t.integer "term"
    t.decimal "down_payment", precision: 10, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "events", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "date"
    t.string "location"
    t.integer "event_type", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "promotions", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.datetime "started_at"
    t.datetime "finished_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
end
