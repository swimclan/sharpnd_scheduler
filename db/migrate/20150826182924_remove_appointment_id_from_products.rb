class RemoveAppointmentIdFromProducts < ActiveRecord::Migration
  def change
    remove_column :products, :appointment_id, :integer
  end
end
