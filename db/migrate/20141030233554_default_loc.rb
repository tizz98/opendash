class DefaultLoc < ActiveRecord::Migration
  def self.up
  	change_column :dbs, :loc, :string, :default => 'auto'
  end

  def self.down
    # You can't currently remove default values in Rails
    raise ActiveRecord::IrreversibleMigration, "Can't remove the default"
  end
end