class SessionsController < ApplicationController

  def create
    user              = User.from_omniauth(env["omniauth.auth"])
    session[:user_id] = user.id
    redirect_to         carousel_index_path
  end

  def destroy
    session[:user_id] = nil
    redirect_to         root_url
  end

  def create_failure
    redirect_to     root_url
    flash[:alert] = params[:message] # if using sinatra-flash or rack-flash
  end

end
