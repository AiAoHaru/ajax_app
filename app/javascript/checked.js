function check() {
  const posts = document.getElementsByClassName("post");   // postというクラス名を持つ要素を取得し、投稿の数だけ複数あるためpostsという変数に定義しデーターを取得する。
  // posts.forEach(function (post) { });
  postsA = Array.from(posts);   // Array.fromを用いることで、配列に変換する。ブラウザでconsole.log(postsA)で調べると配列に変換されているのが確認できる
  postsA.forEach(function (post) {
    if (post.getAttribute("data-load") != null) {   // 一回読み込みしている場合には、（return nullの後に書いた、post.setAttribute("data-load", "true");）を実行し、data-loadを追加することで、2回目以降には、data-loadはnullではなくなり、処理が中断される。
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", (e) => {   // 投稿をクリックしたときに下記の処理を行う設定
      const postId = post.getAttribute("data-id");    // メモのidの属性値の取得
      const XHR = new XMLHttpRequest();
      XHR.open("GET", `/posts/${postId}`, true);    // どのようなリクエストをするか指定する
      XHR.responseType = "json";    // リクエストを送る際にレスポンスの情報の形（JSON）を指定する
      XHR.send();
      XHR.onload = () => {    // レスポンスなどの受信が成功した際に呼び出されるイベントハンドラー
        const item = XHR.response.post;
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }

        if (XHR.status != 200) {    // レスポンスがエラー（ステータスコードが200以外）だった場合の処理
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
        } else {
          return null;
        }
      };
      XHR.onerror = () => {   // リクエストの送信自体が失敗でエラーが起きたときに呼ばれるイベントハンドラー
        alert("Request failed");
      };

      e.preventDefault();   // イベントハンドラーが実行し終わったら、今回のイベントをキャンセルする
    });
  });
}

setInterval(check, 1000);   // checkの実行タイミングを調整。1秒に一回のペースでcheck関数を実行させる

// window.addEventListener("load", check);   // イベントをwindow（ページ）をload（読み込んだ時）に実行する記述