class CreateBanks < ActiveRecord::Migration[8.0]
  def change
    create_table :banks, id: :uuid do |t|
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
