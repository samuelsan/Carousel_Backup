class AddUserIdToPlayersProfiles < ActiveRecord::Migration
  def change
    add_column :players_profiles, :user_id, :integer
  end
end
