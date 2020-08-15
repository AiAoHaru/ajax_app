class ApplicationController < ActionController::Base
  before_action :basic_auth
  
  def index # indexアクションを定義した
  end

  private

  def basic_auth
    authenticate_or_request_with_http_basic do |username, password|
      # username == 'admin' && password == '2222'
      # binding.pry   # 止まったら、以下２つを実行（usernameとpassword）し、正しく取得できるか確認したい
      username == ENV["BASIC_AUTH_USER"] && password == ENV["BASIC_AUTH_PASSWORD"]  # 環境変数を読み込む記述に変更
    end
  end
end