@import './data/td.js'
@import './data/tld.js'
@import './data/tll.js'
@import './data/trl.js'
@import './data/ts.js'

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

function resetCard() {
  // 要素の追加
  document.getElementById("lv").value = "72";
  for(var i=0; i<7; i++) {
    document.getElementById("sv_" + String(i)).value = "50";
    document.getElementById("tv_" + String(i)).value = "0";
  }
}
//BSの更新
function setBaseStatus(no) {
  // 要素の追加
  for(var i=0; i<7; i++) {
    // forum追加されたとき用の拡張で０をいれてる
    document.getElementById("bs_" + String(i)).innerHTML = ts[no][0][i];
  }
}
function upDateTrate(no){
  // 要素の削除
  tl = document.getElementById('trate');
  while(tl.lastChild) { tl.removeChild(tl.lastChild); }
  // 要素の追加
  for(var i=0; i < tll[no].length; i++) {
    let op = document.createElement("option");
    op.value = tll[no][i]; // 個性のキー名
    op.text = trl[tll[no][i]][0]; // 個性名
    document.getElementById("trate").appendChild(op.cloneNode(true));
  }
}

function upDateTotal(){
  var lv = document.getElementById("lv").value;
  for(var i=0; i<7; i++) {
    var bs = document.getElementById("bs_" + String(i)).innerHTML;
    var sv = document.getElementById("sv_" + String(i)).value;
    var tv = document.getElementById("tv_" + String(i)).value;
    var to = "--";
    // 未設定時は計算しない
    if(bs != "--"){
      try {
        if(i==0){
          to = CalcHpStats (Number(lv),Number(bs),Number(sv),Number(tv));
        } else if(i==1){;
          to = CalcStaStats (Number(lv),Number(bs),Number(sv),Number(tv));
        } else {
          to = CalcStats (Number(lv),Number(bs),Number(sv),Number(tv));
        }
      } catch (error) {
        to = "--";
      }
    }else {
      to = "--";
    }
    document.getElementById("to_" + String(i)).innerHTML = to;
  }
}
// -----------------------
// temtemが更新されたときの処理
// -----------------------
function inputChange(event) {
  let zukanNo = event.currentTarget.value;
  // テクニックリストを更新する
  setTechnique(zukanNo, 0);
  //道具のリセット【未実装】
  //レベルとSVとTVのリセット
  resetCard();
  //BSの更新
  setBaseStatus(zukanNo);
  //totalの計算しなおし？
  upDateTotal();
  //alert(CalcHpStats(72,100,100,100));
  // 個性リストの更新
  upDateTrate(zukanNo);
}
// 名前変更を感知する
let text = document.getElementById('name33');
text.addEventListener('change', inputChange);

document.getElementById('lv').addEventListener('change', upDateTotal);
for(var i=0; i<7; i++){
  document.getElementById('tv_' + String(i)).addEventListener('change', upDateTotal);
  document.getElementById('sv_' + String(i)).addEventListener('change', upDateTotal);
}

