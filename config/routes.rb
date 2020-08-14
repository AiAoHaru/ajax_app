Rails.application.routes.draw do
  root to: 'posts#index'
  # get 'posts', to: 'posts#index'
  # get 'posts/new', to:'posts#new'  ⇨  投稿完了のページを使用しないため
  post 'posts', to: 'posts#create'
end
