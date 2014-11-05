class UpdateColors < ActiveRecord::Migration
  def change
  	  Db.all.each do |f|
  		f.update_attribute :bg, '373u47'
  		f.update_attribute :fg, 'ffffff'
  	end
  end
end
