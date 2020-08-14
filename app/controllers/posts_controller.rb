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
    post = Post.create(content: params[:content], checked: false)
    render json:{ post: post }
  end

  def checked
    
    # binding.pry  # paramsとしてidが届いているか確認する。止まったら、paramsと入力！

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
