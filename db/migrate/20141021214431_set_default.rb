class SetDefault < ActiveRecord::Migration
  def self.up
  	change_column :dbs, :temp, :string, :default => 'f'
  	change_column :dbs, :time, :string, :default => '24'
  	change_column :dbs, :stocks, :text, :default => ['AAPL', 'MSFT', 'NFLX', 'YHOO']
  	change_column :dbs, :modOrder, :text, :default => ['date', 'clock', 'weather', 'news', 'stocks']
  end

  def self.down
    # You can't currently remove default values in Rails
    raise ActiveRecord::IrreversibleMigration, "Can't remove the default"
  end
end
