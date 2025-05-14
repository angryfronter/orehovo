class CreateGearboxes < ActiveRecord::Migration[8.0]
  def change
    create_table :gearboxes, id: :uuid do |t|
      t.string :name

      t.timestamps
    end
  end
end
