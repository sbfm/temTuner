// -----------------------------------
// ウィンドウ操作に関わる処理
//
// -----------------------------------
// 編集テムテム変更ボタンの処理
var $selectmonster = 0;
var btns = document.querySelectorAll('.number-btn');
btns[$selectmonster].style.background = "#ffffff";
btns[$selectmonster].style.color = "#000000";
var cards = document.querySelectorAll('.card');
for(let i = 0; i < btns.length; i++){
  (function(n){
    btns[n].addEventListener('click',() => {
      //--------------------------
      // ボタンの処理
      //--------------------------
      // 表示中の項目を消す
      btns[$selectmonster].style.background = "#000000";
      btns[$selectmonster].style.color = "#ffffff";
      // 自分から非表示クラスを除去
      btns[n].style.background = "#ffffff";
      btns[n].style.color = "#000000";
      //--------------------------
      // カードの処理
      //--------------------------
      // 表示中の項目を消す
      cards[$selectmonster].style.display = "none";
      // 自分から非表示クラスを除去
      cards[n].style.display = "block";
      // 選択中の項目を更新
      $selectmonster = n;
    },false);
  })(i);
}
