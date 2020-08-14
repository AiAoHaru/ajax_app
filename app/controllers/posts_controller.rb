class PostsController < ApplicationController
  def index
    @posts = Post.all # 全てのレコードを@postsに代入
    # @post = Post.find(1) # 1番目のレコードを@postに代入←これを使う場合は、index.html.erbのコメントの方を参照！
    # @post = "これはコントローラーで定義したインスタンス変数を確認するための文字列です"
  end

  def new
  end

  def create
    Post.create(content: params[:content])
  end

end
