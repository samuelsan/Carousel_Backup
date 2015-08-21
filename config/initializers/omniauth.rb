OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV["FACEBOOK_APP_ID"], ENV["FACEBOOK_SECRET_KEY"], :info_fields => 'name,email,age_range'
end

OmniAuth.config.on_failure = Proc.new do |env|
  OmniAuth::FailureEndpoint.new(env).redirect_to_failure
end
