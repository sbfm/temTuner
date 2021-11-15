@import './lib/td.js'
@import './lib/tld.js'

// td:テクニックリスト
// tld:覚えるテクニックリスト[図鑑][0-]
// alert(td[tld["1"][0][0]][0]); // 名前を引く
// ID 管理名
// 名称・タイプ・ダメージ・STAコスト・ホールド・プライオリティ・ターゲット・追加効果
// Synergy タイプ　ダメージ　コスト　ホールド　プライオリティ　ターゲット　Effects

function setTechnique(no,forum) {
  // 要素の削除
  for(var i=0; i<4; i++){
    sl = document.getElementById('kibun' + i);
    while(sl.lastChild) { sl.removeChild(sl.lastChild); }
  }
  // そもそも初期データのjsいじればこれいらないのでは？
  let op = document.createElement("option");
  op.value = "";  // 特技の管理キー名
  op.text = "-----";   //0:技名
  document.getElementById("kibun0").appendChild(op.cloneNode(true));
  document.getElementById("kibun1").appendChild(op.cloneNode(true));
  document.getElementById("kibun2").appendChild(op.cloneNode(true));
  document.getElementById("kibun3").appendChild(op.cloneNode(true));
  // 要素の追加
  for(var i=0; i<tld[no][forum].length; i++){
    let op = document.createElement("option");
    op.value = tld[no][forum][i];  // 特技の管理キー名
    op.text = td[tld[no][forum][i]][0];   //0:技名
    document.getElementById("kibun0").appendChild(op.cloneNode(true));
    document.getElementById("kibun1").appendChild(op.cloneNode(true));
    document.getElementById("kibun2").appendChild(op.cloneNode(true));
    document.getElementById("kibun3").appendChild(op.cloneNode(true));
  }
}
// -----------------------
// 更新されたときの処理
// -----------------------
function inputChange(event) {
  let zukanNo = event.currentTarget.value;
  // テクニックリストを更新する
  setTechnique(zukanNo, 0);
  //道具のリセット【未実装】
  //レベルのリセット【未実装】
  //SVのリセット【未実装】
  //TVのリセット【未実装】
  //BSの更新【未実装】
  //totalの計算しなおし？
}
// 名前変更を感知する
let text = document.getElementById('name33');
text.addEventListener('change', inputChange);
