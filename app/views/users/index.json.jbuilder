json.array!(@users) do |user|
  json.extract! user, :id, :username, :name, :email, :gender, :bio, :facebook
  json.url user_url(user, format: :json)
end
