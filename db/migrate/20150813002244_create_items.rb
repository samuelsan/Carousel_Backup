class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string          :name
      t.integer         :space_occupied
      t.integer         :cost
      t.integer         :weight
      t.timestamps
    end
  end
end
