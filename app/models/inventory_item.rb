class InventoryItem < ActiveRecord::Base
  self.table_name   = :inventory_items
  self.primary_keys = :profile_id, :item_id
end
