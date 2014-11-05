class FixColorsDefault < ActiveRecord::Migration
  def change
  	Db.all.each do |f|
  		f.update_attribute :bg, '373a47'
  	end
  end
end
