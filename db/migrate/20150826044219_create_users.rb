class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email_address
      t.string :password_digest
      t.string :address_1
      t.string :address_2
      t.string :city
      t.string :state
      t.integer :zip
      t.string :phone_number

      t.timestamps null: false
    end
  end
end
