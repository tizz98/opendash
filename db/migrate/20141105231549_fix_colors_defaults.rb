class FixColorsDefaults < ActiveRecord::Migration
  def self.up
  	change_column :dbs, :bg, :string, :default => '#373a47'
  	change_column :dbs, :fg, :string, :default => '#ffffff'

  	Db.all.each do |f|
  		f.update_attribute :bg, '#373a47'
  		f.update_attribute :fg, '#ffffff'
  	end
  end

  def self.down
    # You can't currently remove default values in Rails
    raise ActiveRecord::IrreversibleMigration, "Can't remove the default"
  end
end
