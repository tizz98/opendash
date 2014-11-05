class ChangeColors < ActiveRecord::Migration
  def up
  	add_column :dbs, :bg, :string, :default => '373a47'
  	add_column :dbs, :fg, :string, :default => 'ffffff'
  end

  def down
  	remove_column :dbs, :bg
  	remove_column :dbs, :fg
  end
end
