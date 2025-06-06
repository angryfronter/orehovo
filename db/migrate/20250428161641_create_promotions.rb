class CreatePromotions < ActiveRecord::Migration[8.0]
  def change
    create_table :promotions, id: :uuid do |t|
      t.string :title
      t.text :description
      t.datetime :started_at
      t.datetime :finished_at
      t.boolean  :visible, default: true

      t.timestamps
    end
  end
end
