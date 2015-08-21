class ModifyUsersTable < ActiveRecord::Migration
  
  def change
    add_column :users,  :email,             :text
    add_column :users,  :age,               :integer
    add_column :users,  :profile_photo_url, :text
  end

end
