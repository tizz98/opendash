class AddLocToDb < ActiveRecord::Migration
  def change
    add_column :dbs, :loc, :string
  end
end
