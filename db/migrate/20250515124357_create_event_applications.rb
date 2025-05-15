class CreateEventApplications < ActiveRecord::Migration[8.0]
  def change
    create_table :event_applications, id: :uuid do |t|
      t.string :full_name
      t.string :phone_number
      t.references :event, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
