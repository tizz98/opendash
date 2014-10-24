class Db < ActiveRecord::Base
	serialize :stocks
	serialize :modOrder

	validates :temp, presence: true,
					length: { is: 1 }

	validates :time, presence: true,
					length: { is: 2 }
end
