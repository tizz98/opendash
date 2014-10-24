class ChangeColumn < ActiveRecord::Migration
  def change
  	change_column :dbs, :time, :string
  end
end
