function CalcHpStats (lv,bs,sv,tv) {
  return Math.floor((((1.5 * bs) + sv + (tv / 5) ) * lv / 80) + (sv * bs * lv / 20000) + lv + 15);
}
function CalcStaStats (lv,bs,sv,tv) {
  return Math.floor((bs/4) + (lv * 0.35 * 6 ) + (sv * lv * bs / 20000) + (tv * lv * bs / 30000) );
}
function CalcStats (lv,bs,sv,tv) {
  //return ((((1.5 * bs) + sv + (tv / 5) ) * lv / 100) + (sv * bs * lv / 25000) + 10);
  return Math.floor((((1.5 * bs) + sv + (tv / 5) ) * lv / 100) + (sv * bs * lv / 25000) + 10);
}
//CalcStats (lv,bs,sv,tv);
