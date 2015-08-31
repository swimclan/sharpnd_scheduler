class AddAdminToKeys < ActiveRecord::Migration
  def change
    add_column :keys, :admin, :bool
  end
end
