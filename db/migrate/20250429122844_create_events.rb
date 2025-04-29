class CreateEvents < ActiveRecord::Migration[8.0]
  def change
    create_table :events do |t|
      t.string :name
      t.text :description
      t.datetime :date
      t.string :location
      t.integer :event_type, default: 0

      t.timestamps
    end
  end
end
