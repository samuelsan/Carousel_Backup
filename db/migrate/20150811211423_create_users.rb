class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string    :provider
      t.string    :uid
      t.string    :oauth_token
      t.string    :name
      # t.string    :email
      # t.boolean   :of_min_age
      # t.string    :profile_photo_url
      t.datetime  :oauth_expires_at

      t.timestamps
    end
  end
end
