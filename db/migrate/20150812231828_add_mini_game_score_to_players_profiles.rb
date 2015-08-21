class AddMiniGameScoreToPlayersProfiles < ActiveRecord::Migration
  def change
    add_column :players_profiles, :minigame_score, :integer
  end
end
