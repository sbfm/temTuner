@import './data/td.js'
@import './data/tld.js'
@import './data/tll.js'
@import './data/trl.js'
@import './data/ts.js'
@import './data/ti.js'
@import './data/tn.js'
@import './data/tdj.js'
@import './data/tij.js'
@import './data/tnj.js'
@import './data/ttj.js'
@import './data/type.js'

// td:テクニックリスト
// tld:覚えるテクニックリスト[図鑑][0-]
// alert(td[tld["1"][0][0]][0]); // 名前を引く
// ID 管理名
// 名称・タイプ・ダメージ・STAコスト・ホールド・プライオリティ・ターゲット・追加効果
// Synergy タイプ　ダメージ　コスト　ホールド　プライオリティ　ターゲット　Effects
function setFolum(no,team) {
  // 対象の番号かどうか
  // 要素の削除
  fl = document.getElementById('forum' + "_" + team);
  // 要素を一旦空にする
  while(fl.lastChild) { fl.removeChild(fl.lastChild); }
  if (no == 4) {
    // 要素の追加
    for(var i=0; i<chrome.length; i++){
      document.getElementById("forumbox" + "_" + team).style.visibility ="visible";
      let op = document.createElement("option");
      op.value = i;  
      op.text = typelistn[String(chrome[i])]; 
      fl.appendChild(op.cloneNode(true));
    }
  } else if (no == 143) {
    // 要素の追加
    for(var i=0; i<koishu.length; i++){
      document.getElementById("forumbox" + "_" + team).style.visibility ="visible";
      let op = document.createElement("option");
      op.value = i;  // 特技の管理キー名
      op.text = typelistn[String(koishu[i])];   //対応するタイプを引く
      document.getElementById("forum" + "_" + team).appendChild(op.cloneNode(true));
    }
  } else {
    let op = document.createElement("option");
    op.value = 0;  
    op.text = ""; 
    fl.appendChild(op.cloneNode(true));
    document.getElementById("forumbox" + "_" + team).style.visibility ="hidden";
  }
  return 1;
}

function updateTechnique(no,forum,team) {
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
function setKey(name,team,id) {
  let list = document.getElementById(name + "_" + team);
  for(var sel of list) {
    if(sel.value == id){
      sel.selected = true;
    }
  }
}
function setKeylow(name,team,id) {
  let list = document.getElementById(name + "_" + team);
  for(var sel of list) {
    if(sel.value.replace('_','').toLowerCase() == id.replace('_','').toLowerCase()){
      sel.selected = true;
    }
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
function updateBaseStatus(no,team) {
  // 要素の追加
  for(var i=0; i<7; i++) {
    // forum追加されたとき用の拡張で０をいれてる
    document.getElementById("bs_" + String(i) + "_" + team).innerHTML = ts[no][0][i];
  }
}

function updateItem(team){
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
function inputChangeNameForum(team,zukanNo){
  // テクニックリストを更新する
  if(zukanNo == 3 || zukanNo == 143){
    updateTechnique(zukanNo, document.getElementById('forum' + "_" + team).value, team);
  } else {
    updateTechnique(zukanNo, 0, team);
  }
  // 翻訳の設定を与える
  changeLangage(document.getElementById("lang").value, "_" + team)
  //document.getElementById("lang").addEventListener('change', changeNameTrigger);
}
function inputChangeName(team,zukanNo){
  setFolum(zukanNo,team);
  inputChangeD(team,zukanNo);
}
function inputChangeD(team,zukanNo){
  //レベルとSVとTVのリセット
  resetCard(team);
  //BSの更新
  updateBaseStatus(zukanNo,team);
  //totalの計算しなおし？
  upDateTotal(team);
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
  inputChangeNameForum(team,zukanNo);
}
// -----------------------
// temtemが更新されたときの処理
// -----------------------
function inputChange(event) {
  inputChangeName(event.target.eventParam, event.currentTarget.value);
}
// -----------------------
// Forumが更新されたときの処理
// -----------------------
function inputChangeF(event) {
  inputChangeNameForum(event.target.eventParam, document.getElementById('name33_' + event.target.eventParam).value);
}

// ----------------------
// 情報変更を感知する
// ----------------------
for(var team=0; team<8; team++){
  // 名前変更を感知
  let text = document.getElementById('name33' + "_" + team);
  text.addEventListener('change', inputChange);
  text.eventParam = team;
  // Forum変更を感知
  let fo = document.getElementById('forum' + "_" + team);
  fo.addEventListener('change', inputChangeF);
  fo.eventParam = team;
  // ステータス変更を感知
  document.getElementById('lv' + "_" + team).addEventListener('change', upDateTotalliss);
  document.getElementById('lv' + "_" + team).eventParam = team;
  document.getElementById('lv' + "_" + team).eventParam = team;
  // ステータスの
  for(var i=0; i<7; i++){
    document.getElementById('tv_' + String(i) + "_" + team).addEventListener('change', upDateTotalliss);
    document.getElementById('tv_' + String(i) + "_" + team).eventParam = team;
    document.getElementById('sv_' + String(i) + "_" + team).addEventListener('change', upDateTotalliss);
    document.getElementById('sv_' + String(i) + "_" + team).eventParam = team;
  }
  // 初回起動
  updateItem(team);
}
document.getElementById("lang").addEventListener('change', changeNamelistener);


