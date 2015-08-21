class PlayersProfile < ActiveRecord::Base

  belongs_to  :user

  has_many    :items, through: :inventory_items

end
