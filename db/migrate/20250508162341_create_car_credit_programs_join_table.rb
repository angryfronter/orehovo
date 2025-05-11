class CreateCarCreditProgramsJoinTable < ActiveRecord::Migration[8.0]
  def change
    create_join_table :cars, :credit_programs, id: :uuid do |t|
      t.index :car_id
      t.index :credit_program_id
    end
  end
end
