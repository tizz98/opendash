class CreateDbs < ActiveRecord::Migration
  def change
    create_table :dbs do |t|
      t.string :temp
      t.integer :time
      t.text :stocks
      t.text :modOrder

      t.timestamps
    end
  end
end
