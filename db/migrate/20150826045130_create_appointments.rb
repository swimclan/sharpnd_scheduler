class CreateAppointments < ActiveRecord::Migration
  def change
    create_table :appointments do |t|
      t.datetime :date_time
      t.string :neighborhood
      t.integer :product_id
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
