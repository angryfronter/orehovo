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

ActiveRecord::Schema[8.0].define(version: 2025_04_29_122844) do
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

  create_table "car_colors", force: :cascade do |t|
    t.bigint "car_id"
    t.string "name"
    t.string "hex"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["car_id"], name: "index_car_colors_on_car_id"
  end

  create_table "car_configurations", force: :cascade do |t|
    t.bigint "car_id"
    t.string "name"
    t.integer "price"
    t.text "features", default: [], array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["car_id"], name: "index_car_configurations_on_car_id"
  end

  create_table "car_dimensions", force: :cascade do |t|
    t.bigint "car_id"
    t.integer "length"
    t.integer "width"
    t.integer "height"
    t.integer "wheelbase"
    t.integer "ground_clearance"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["car_id"], name: "index_car_dimensions_on_car_id"
  end

  create_table "car_engines", force: :cascade do |t|
    t.bigint "car_id"
    t.string "engine_type"
    t.integer "power"
    t.integer "torque"
    t.integer "displacement"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["car_id"], name: "index_car_engines_on_car_id"
  end

  create_table "car_features", force: :cascade do |t|
    t.bigint "car_id"
    t.string "category"
    t.text "description", default: [], array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["car_id"], name: "index_car_features_on_car_id"
  end

  create_table "car_images", force: :cascade do |t|
    t.bigint "car_id"
    t.string "image_url"
    t.string "color_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["car_id"], name: "index_car_images_on_car_id"
  end

  create_table "cars", force: :cascade do |t|
    t.string "brand"
    t.string "model"
    t.integer "price"
    t.integer "year"
    t.string "transmission"
    t.string "drivetrain"
    t.string "fuel_type"
    t.integer "fuel_tank"
    t.string "body_type"
    t.string "color"
    t.integer "discount"
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
  add_foreign_key "car_colors", "cars"
  add_foreign_key "car_configurations", "cars"
  add_foreign_key "car_dimensions", "cars"
  add_foreign_key "car_engines", "cars"
  add_foreign_key "car_features", "cars"
  add_foreign_key "car_images", "cars"
end
