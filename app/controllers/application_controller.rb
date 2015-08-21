class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  # before_action :authenticated
  
  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end
  helper_method :current_user
  
  def is_logged_in?
    !!current_user #this returns a boolean value rather than run the method and return the object.
  end
  helper_method :is_logged_in?

  def authenticated
    # render status: 400 if !is_logged_in?
    if (!is_logged_in?)
      # flash[:alert] = "Please sign in to play the demo."
      # redirect_to "/"
      redirect_to ("/"), flash: {alert: "Please sign in to play the demo."}
    end
  end
  helper_method :authenticated

end
