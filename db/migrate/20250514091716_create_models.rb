class CreateModels < ActiveRecord::Migration[8.0]
  def change
    create_table :models, id: :uuid do |t|
      t.string :name
      t.references :mark, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
