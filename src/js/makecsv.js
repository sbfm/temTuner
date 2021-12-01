//const typeNameList = ["中立","風","地面","水","炎","みどり","電気","精神","デジタル","格闘","クリスタル","どく"];
let typech = { none:0, Neutral:1, Wind:2, Earth:3, Water:4, Fire:5, Nature:6, Electric:7, Mental:8, Digital:9, Melee:10, Crystal:11, Toxic:12 };
let typelistn = { 0:"none", 1:"Neutral", 2:"Wind", 3:"Earth", 4:"Water", 5:"Fire", 6:"Nature", 7:"Electric", 8:"Mental", 9:"Digital", 10:"Melee", 11:"Crystal", 12:"Toxic" };
let typelistn_j = { 0:"なし", 1:"中立", 2:"風", 3:"地面", 4:"水", 5:"炎", 6:"みどり", 7:"電気", 8:"精神", 9:"デジタル", 10:"格闘", 11:"クリスタル", 12:"どく"};
let chrome = [ 0, 1, 2, 3, 4, 5, 7, 8, 8, 10, 11, 12 ];
let koishu = [ 0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12 ];
let categoryList = {"Physical":0,"Special":1,"Status":2};
function makeCSV() {
  csv = {version:2, monster:[], uiText:{}, option:{}};

  for(var i=0; i < 8; i++) {
    // 事前操作
    var nameid = document.getElementById("name33_" + String(i)).value;
    var name = nameid == "0" ? "":tn[String(nameid)];
    var type1 = nameid == "0" ? 0:typech[typelist[String(nameid)][0]];
    var type2 = nameid == "0" ? 0:typech[typelist[String(nameid)][1]];
    var lv = document.getElementById("lv_" + String(i)).value;
    var tnameid = document.getElementById("trate_" + String(i)).value;
    var tname = (tnameid == "-----" ? "":trl[tnameid][0][0]);
    var ttext = (tnameid == "-----" ? "":trl[tnameid][1][0]);
    var itemid = document.getElementById("item_" + String(i)).value;
    var item = (itemid == 0 ? "":ti[itemid][0]);
    var titem = (itemid == 0 ? "":ti[itemid][1]);
    // ------------------
    // モンスターデータの用意
    // ------------------
    var data = {
      name:name,
      lv:lv,
      type1:type1,
      type2:type2,
      trate:{ 
        name:tname,
        text:ttext
      },
      item:{
        name:item,
        text:titem
      },
      allstatus:[],
      technique:[]
    };
    // ------------------
    // Statusのセット
    // ------------------
    for(var j=0; j < 7; j++) {
      var BS = document.getElementById("bs_" + String(j) + "_" + String(i)).innerHTML;
      var SV = document.getElementById("sv_" + String(j) + "_" + String(i)).value;
      var TV =document.getElementById("tv_" + String(j) + "_" + String(i)).value;
      var v = document.getElementById("to_" + String(j) + "_" + String(i)).innerHTML;
      try {
        BS = Number(BS);
        SV = Number(SV);
        TV = Number(TV);
        v = Number(v);
      } catch (error) {
        BS = 0;
        SV = 0;
        TV = 0;
        v = 0;
      }
      var sdata = {v:v, BS:BS, SV:SV, TV:TV};
      data["allstatus"].push(sdata);
    }
    // ------------------
    // 技のセット
    // ------------------
    for(var j=0; j < 4; j++) {
      var teid = document.getElementById("kibun_" + String(j) + "_" + String(i)).value;
      var trigger = td[teid][11]!="" ? typech[td[teid][10]]:"" ;
      var name = td[teid][0];
      var type = td[teid][2] == "" ? 0 : typech[td[teid][2]];
      var category = type == 0 ? 0:categoryList[td[teid][3]];// カテゴリーないときどうするかtodo
      var wait = td[teid][6];
      var priority = td[teid][7];
      var pow = td[teid][4];
      var sta = td[teid][5];
      var text = td[teid][1];
      var sname = trigger != "" ? td[teid][0] + "+" : "";
      var stype = td[teid][12] == "" ? 0 : typech[td[teid][12]];
      var scategory = stype == 0 ? 0:categoryList[td[teid][13]];// カテゴリーないときどうするかtodo
      var swait = trigger != "" ? td[teid][16]:"";
      var spriority = trigger != "" ? td[teid][17]:"";
      var spow = trigger != "" ? td[teid][14]:"";
      var ssta = trigger != "" ? td[teid][15]:"";
      var stext = trigger != "" ? td[teid][11]:"";
      var tdata = {
        trigger:trigger,
        nosynergy:{
          name:name,
          type:type,
          category:category,
          wait:wait,
          priority:priority,
          pow:pow,
          sta:sta,
          text:text
        },
        synergy:{
          name:sname,
          type:stype,
          category:scategory,
          wait:swait,
          priority:spriority,
          pow:spow,
          sta:ssta,
          text:stext
        }
      };
      data["technique"].push(tdata);
    }
  csv["monster"].push(data);
  }
  console.log(csv);
  return csv;
}
document.getElementById("okk").addEventListener('click', function(){
  makeCSV();
  document.getElementById("outcsv").innerText = JSON.stringify(makeCSV());
});

