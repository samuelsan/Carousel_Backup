require 'test_helper'

class CarouselControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

end
