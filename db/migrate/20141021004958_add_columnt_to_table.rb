class AddColumntToTable < ActiveRecord::Migration
  def change
    add_column :dbs, :uid, :string
  end
end
