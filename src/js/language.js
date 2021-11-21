
function setViewText(id,cKey) {
// どこになにを ckeyはもげ
  var nameset = document.getElementById(id);
  // すべてのキーを確認
  for(var state of nameset) {
    // state.value：キー値
    // 日本語訳があるかどうかの確認
    if (state.value in cKey) {
      // あったら書き換え innerText対応有無で対応を変える
      if (typeof(state.innerText) != 'undefined') {
        state.innerText = cKey[state.value];
      } else {
        state.text = cKey[state.value];
      }
    }
  }
}

// 言語を変更するやつ
function changename(lang, columntail) {
  tail = "";
  if(lang == "JP") {
    tail = "_j";
  }
  // 日本語に変更
  // 名前
  setViewText("name33" + columntail, eval("tn" + tail));
}
// 言語を変更するやつ
function changetechnic(lang, columntail) {
  tail = "";
  if(lang == "JP") {
    tail = "_j";
    setViewText("kibun" + columntail + "_0", eval("td" + tail));
  } else {
    // その他の場合default
    data = [];
    for (let i in td){
      if (i != "0"){
        data.append([i,td[1]]);
      }
    }
    setViewText("kibun" + columntail + "_0", data);
  }
  // 日本語に変更
  // 名前
}
function changeLangage(lang, tail){
    changename(lang, tail);
    changetechnic(lang, tail);
}
// リスナー登録用
function changeNamelistener(event) {
  for(var i=0; i<8; i++){
    changeLangage(event.currentTarget.value, "_" + i)
  }
}
