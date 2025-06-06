class CreateCarPromotionsJoinTable < ActiveRecord::Migration[8.0]
  def change
    create_join_table :cars, :promotions, column_options: { type: :uuid } do |t|
      t.index :car_id
      t.index :promotion_id
    end
  end
end
