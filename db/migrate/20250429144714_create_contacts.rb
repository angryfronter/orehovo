class CreateContacts < ActiveRecord::Migration[8.0]
  def change
    create_table :contacts, id: :uuid do |t|
      t.string :address
      t.string :phone
      t.string :email
      t.string :opening_hours
      t.string :website_name
      t.string :website_description
      t.string :facebook_link
      t.string :vk_link
      t.string :instagram_link

      t.timestamps
    end
  end
end
