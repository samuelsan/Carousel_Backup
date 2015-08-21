class CreatePlayersProfiles < ActiveRecord::Migration
  def change
    create_table :players_profiles do |t|
      t.integer :total_score

      t.timestamps
    end
  end
end
