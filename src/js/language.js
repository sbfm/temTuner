
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
  // lang: 言語
  // columntail :チームのテムテムを識別する番号
  //
  tail = "";
  if(lang == "JP") {
    tail = "_j";
    for(var i=0 ;i < 4;i++) {
      setViewText("kibun_" + String(i) + columntail, eval("td" + tail));
    }
  } else {
    // その他の場合default
    data = {};
    for (let i in td){
      if (i != "0"){
        data[i] = td[i][0];
      }
    }
    for(var i = 0;i < 4;i++) {
      setViewText("kibun_" + String(i) + columntail, data);
    }
  }
  // 日本語に変更
  // 名前
}
// 言語を変更するやつ
function changetrate(lang, columntail) {
  tail = "";
  if(lang == "JP") {
    tail = "_j";
    setViewText("trate" + columntail, eval("trl" + tail));
  } else {
    var data = [];
    for (let i in trl){
      if (i != 0){
        data[i] = trl[i][0];
      }
    }
    setViewText("trate" + columntail, data);
  }
  // 日本語に変更
  // 名前
}
// 言語を変更するやつ
function changeitem(lang, columntail) {
  tail = "";
  if(lang == "JP") {
    tail = "_j";
    setViewText("item" + columntail, eval("ti" + tail));
  } else {
    var data = [];
    for (let i in ti){
      if (i != 0){
        data[i] = ti[i][0];
      }
    }
    setViewText("item" + columntail, data);
  }
  // 日本語に変更
  // 名前
}
function changeLangage(lang, tail){
    changename(lang, tail);
    changetechnic(lang, tail);
    changetrate(lang, tail);
    changeitem(lang, tail);
}
// リスナー登録用
function changeNamelistener(event) {
  for(var i=0; i<8; i++){
    changeLangage(event.currentTarget.value, "_" + i)
  }
}
