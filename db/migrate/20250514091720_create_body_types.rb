class CreateBodyTypes < ActiveRecord::Migration[8.0]
  def change
    create_table :body_types, id: :uuid do |t|
      t.string :name

      t.timestamps
    end
  end
end
