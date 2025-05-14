class CreateDriveTypes < ActiveRecord::Migration[8.0]
  def change
    create_table :drive_types do |t|
      t.string :name

      t.timestamps
    end
  end
end
