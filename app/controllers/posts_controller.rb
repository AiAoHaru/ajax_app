class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")
    # .order(id: "DESC")と記載することで、レコードを降順に並び替えられる
    # 全てのレコードを@postsに代入
    # @post = Post.find(1) # 1番目のレコードを@postに代入←これを使う場合は、index.html.erbのコメントの方を参照！
    # @post = "これはコントローラーで定義したインスタンス変数を確認するための文字列です"
  end

  # 削除
  # def new
  # end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index
  end

  def checked
    post = Post.find(params[:id])
    if post.checked then
      post.update(checked: false)
    else
      post.update(checked: true)
    end

    item = Post.find(params[:id])
    render json: { post: item }
  end
end
