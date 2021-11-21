@import './data/td.js'
@import './data/tld.js'
@import './data/tll.js'
@import './data/trl.js'
@import './data/ts.js'
@import './data/ti.js'

// td:テクニックリスト
// tld:覚えるテクニックリスト[図鑑][0-]
// alert(td[tld["1"][0][0]][0]); // 名前を引く
// ID 管理名
// 名称・タイプ・ダメージ・STAコスト・ホールド・プライオリティ・ターゲット・追加効果
// Synergy タイプ　ダメージ　コスト　ホールド　プライオリティ　ターゲット　Effects

function setTechnique(no,forum,team) {
  // 要素の削除
  for(var i=0; i<4; i++){
    sl = document.getElementById('kibun' + "_" + i + "_" + team);
    while(sl.lastChild) { sl.removeChild(sl.lastChild); }
  }
  // 要素の追加
  for(var i=0; i<tld[no][forum].length; i++){
    let op = document.createElement("option");
    op.value = tld[no][forum][i];  // 特技の管理キー名
    op.text = td[tld[no][forum][i]][0];   //0:技名
    document.getElementById("kibun_0" + "_" + team).appendChild(op.cloneNode(true));
    document.getElementById("kibun_1" + "_" + team).appendChild(op.cloneNode(true));
    document.getElementById("kibun_2" + "_" + team).appendChild(op.cloneNode(true));
    document.getElementById("kibun_3" + "_" + team).appendChild(op.cloneNode(true));
  }
}

// lv sv tv要素のリセット
function resetCard(team) {
  // 要素の追加
  document.getElementById("lv" + "_" + team).value = "72";
  for(var i=0; i<7; i++) {
    document.getElementById("sv_" + String(i) + "_" + team).value = "50";
    document.getElementById("tv_" + String(i) + "_" + team).value = "0";
  }
}
//BSの更新
function setBaseStatus(no,team) {
  // 要素の追加
  for(var i=0; i<7; i++) {
    // forum追加されたとき用の拡張で０をいれてる
    document.getElementById("bs_" + String(i) + "_" + team).innerHTML = ts[no][0][i];
  }
}

function setItem(team){
  // 要素の削除
  for (let key in ti) {
    let op = document.createElement("option");
    op.value = key; // 個性のキー名
    op.text = ti[key][0]; // 個性名
    document.getElementById("item" + "_" + team).appendChild(op.cloneNode(true));
  }
}


function upDateTrate(no,team){
  // 要素の削除
  tl = document.getElementById('trate' + "_" + team);
  while(tl.lastChild) { tl.removeChild(tl.lastChild); }
  // 要素の追加
  for(var i=0; i < tll[no].length; i++) {
    let op = document.createElement("option");
    op.value = tll[no][i]; // 個性のキー名
    op.text = trl[tll[no][i]][0]; // 個性名
    document.getElementById("trate" + "_" + team).appendChild(op.cloneNode(true));
  }
}

function upDateTotal(team){
  var lv = document.getElementById("lv" + "_" + team).value;
  for(var i=0; i<7; i++) {
    var bs = document.getElementById("bs_" + String(i) + "_" + team).innerHTML;
    var sv = document.getElementById("sv_" + String(i) + "_" + team).value;
    var tv = document.getElementById("tv_" + String(i) + "_" + team).value;
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
    document.getElementById("to_" + String(i) + "_" + team).innerHTML = to;
  }
}
function upDateTotalliss(event){
  let team = event.target.eventParam;
  upDateTotal(team)
}
// -----------------------
// temtemが更新されたときの処理
// -----------------------
function inputChange(event) {
  let team= event.target.eventParam;
  let zukanNo = event.currentTarget.value;
  // テクニックリストを更新する
  setTechnique(zukanNo, 0, team);
  //道具のリセット【未実装】
  //レベルとSVとTVのリセット
  resetCard(team);
  //BSの更新
  setBaseStatus(zukanNo,team);
  //totalの計算しなおし？
  upDateTotal(team);
  //alert(CalcHpStats(72,100,100,100));
  // 個性リストの更新
  upDateTrate(zukanNo,team);
  // アイテムの設定をリセット
  var itemset = document.getElementById("item" + "_" + team);
  for(var state of itemset) {
    if(state.textContent === '0') {
      state.selected = true;
    } else {
      state.selected = false;
    }
  }
}

// ----------------------
// 名前変更を感知する
// ----------------------
for(var team=0; team<8; team++){
  let text = document.getElementById('name33' + "_" + team);
  text.addEventListener('change', inputChange);
  text.eventParam = team;
  document.getElementById('lv' + "_" + team).addEventListener('change', upDateTotalliss);
  document.getElementById('lv' + "_" + team).eventParam = team;
  // ステータスの
  for(var i=0; i<7; i++){
    document.getElementById('tv_' + String(i) + "_" + team).addEventListener('change', upDateTotalliss);
    document.getElementById('tv_' + String(i) + "_" + team).eventParam = team;
    document.getElementById('sv_' + String(i) + "_" + team).addEventListener('change', upDateTotalliss);
    document.getElementById('sv_' + String(i) + "_" + team).eventParam = team;
  }
  // 初回起動
  setItem(team);
}


