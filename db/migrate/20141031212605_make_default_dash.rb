class MakeDefaultDash < ActiveRecord::Migration
  def up
  	Db.create uid: 'default'
  end

  def down
  	db = Db.where(:uid => 'default')
  	db.destroy
  end
end
