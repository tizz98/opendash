class UpdateLocs < ActiveRecord::Migration
  def self.up
  	Db.all.each do |f|
  		f.update_attribute :loc, 'auto'
  	end
  end
end
