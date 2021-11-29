window.addEventListener('DOMContentLoaded', function(){
  const xhr = new XMLHttpRequest();
  //const fd = new FormData();
  // ----------------------------------------
  // ファイルが選択されたら実行
  // ----------------------------------------
  document.getElementById("img_file").addEventListener('change', function(e){
    // オブジェクトにセット
    const fd = new FormData();
    xhr.open('post', 'https://tw.sbfm.jp/analyze');
    fd.append('img_file', e.target.files[0]);
    xhr.send(fd);
  });
  // ----------------------------------------
  // ファイルの読み込みを行ったら実行
  // ----------------------------------------
  xhr.addEventListener('readystatechange', () => {
    if( xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.response);
      const result = JSON.parse(xhr.response);
      // 図鑑の更新
      setKey('name33','0',result["no"]);
      // 技リストとか更新
      inputChangeName('0',result["no"]);
      // Lvの更新
      document.getElementById('lv_' + '0').value = result["lv"];
      //svのセット
      for (var i=0; i<7; i++) {
        document.getElementById('sv_' + String(i) + '_' + '0').value = result["svr"][i];
        document.getElementById('tv_' + String(i) + '_' + '0').value = result["tvr"][i];
      }
      setKeylow('item','0',result["item"]);
      setKeylow('trate','0',result["trate"]);
      for (var i=0; i<4; i++) {
        setKeylow('kibun_'+ String(i),'0',result["uepon" + String(i+1)]);
      }
    }
  });
  // ----------------------------------------
  // エラー
  // ----------------------------------------
  xhr.addEventListener( 'error', () => {
    alert( 'Oops! Something went wrong.' );
  });
});
