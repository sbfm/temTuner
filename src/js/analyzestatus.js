window.addEventListener('DOMContentLoaded', function(){
  const xhr = new XMLHttpRequest();
  //const fd = new FormData();
  // ----------------------------------------
  // ファイルが選択されたら実行
  // ----------------------------------------
  document.getElementById("img_file").addEventListener('change', function(e){
    // オブジェクトにセット
    const fd = new FormData();
    xhr.onreadystatechange = function(){ var hikisu = arguments[0]; return function() { yomikomiafter(hikisu) }; }($selectmonster);
    xhr.open('post', 'https://tw.sbfm.jp/analyze');
    fd.append('img_file', e.target.files[0]);
    xhr.send(fd);
  });
  // ----------------------------------------
  // ファイルの読み込みを行ったら実行
  // ----------------------------------------
  function yomikomiafter(team) {
    if( xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.response);
      const result = JSON.parse(xhr.response);
      // 図鑑の更新
      setKey('name33',team,result["no"]);
      // 技リストとか更新
      inputChangeName(team,result["no"]);
      // Lvの更新
      document.getElementById('lv_' + team).value = result["lv"];
      //svのセット
      for (var i=0; i<7; i++) {
        document.getElementById('sv_' + String(i) + '_' + team).value = result["svr"][i];
        document.getElementById('tv_' + String(i) + '_' + team).value = result["tvr"][i];
      }
      setKeylow('item',team,result["item"]);
      setKeylow('trate',team,result["trate"]);
      for (var i=0; i<4; i++) {
        setKeylow('kibun_'+ String(i),team,result["uepon" + String(i+1)]);
      }
      // ステータスの更新
      upDateTotal(team)
    }
  }
  // ----------------------------------------
  // エラー
  // ----------------------------------------
  xhr.addEventListener( 'error', () => {
    alert( 'Oops! Something went wrong.' );
  });
});
