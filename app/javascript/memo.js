function memo() {
  const submit = document.getElementById("submit");   // index.html.erbのform.submitのidをもとに『投稿する』ボタンの情報を取得する
  submit.addEventListener("click", (e) => {   // click」した場合に実行される関数を定義
    const formData = new FormData(document.getElementById("form"));   // index.html.erbの<%= form_with url:  "/posts", method: :post,id: "form" do |form| %>の中のidを取得し、フォームに入力されたデータを取得
    const XHR = new XMLHttpRequest();   // 非同期通信を実現するために必要なオブジェクトの生成
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";   // レスポンスの形式をjsonに定義
    XHR.send(formData);   // 上記で定義した、formの入力データの送信
    XHR.onload = () => {
      const item = XHR.response.post;   // レスポンスとして返却されたメモのレコードデータの取得
      const list = document.getElementById("list");   // HTMLを描画する際の場所を指定するため、描画する親要素のlist要素を取得
      const formText = document.getElementById("content");    // 入力したのちにそのままになるのを防ぐため（メモの入力フォームをリセットするため対象であるcontentを取得）
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);    // list要素に対して、HTMLをlist要素の直後に挿入

      formText.value = "";   // 入力フォームの中をリセットするため

      if (XHR.status != 200) {    // レスポンスがエラー（ステータスコードが200以外）だった場合の処理
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
      } else {
        return null;
      }
    };

    XHR.onerror = function () {   // リクエストの送信自体が失敗でエラーが起きたときに呼ばれるイベントハンドラー
      alert("Request failed");
    };

    e.preventDefault();   // イベントハンドラーが実行し終わったら、今回のイベントをキャンセルする
  })
}
window.addEventListener("load", memo);    // window（ページ）をload（読み込んだ時）に実行