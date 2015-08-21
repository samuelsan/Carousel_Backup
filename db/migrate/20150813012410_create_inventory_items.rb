class CreateInventoryItems < ActiveRecord::Migration
  def change
    create_table :inventory_items do |t|
      t.integer     :profile_id
      t.integer     :item_id
      t.integer     :qty        #quantity

      t.timestamps
    end
  end
end
