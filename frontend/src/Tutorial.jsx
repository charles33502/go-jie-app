function Tutorial() {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>圍棋規則簡介</h1>
      <p>勝負的判定在於誰建構出的地盤更多。棋盤就像一片廣闊的土地，雙方爭奪這片土地，互相競爭以擴大自己的領地。</p>
      <p>為此，會在土地上落子（也就是下棋子的意思）來劃分自己的地盤。</p>
      <h3>勝負方式</h3>
      <p>當棋子都下好，雙方的地盤範圍一目了然時，遊戲即告結束，然後比較雙方的地盤，地盤多的一方即為勝者。</p>
      <p>更多規則細節可參考日本棋院<a href="https://www.nihonkiin.or.jp/teach/lesson/">楽しい囲碁入門</a>的資訊</p>
      <h2>定石是什麼？</h2>
      <p>在角隅圍空是最容易，所以從角隅開始佈局是一般的常識。但沒有目的地在角隅盲目着手是不行。</p>
      <p>在小小的角隅，其變化是千變萬化，每一手棋都要選擇正確的着點，專家棋士也辦不到。</p>
      <p>所幸，圍棋有很久之歷史，經驗之堆積，從昔時所傳下一種型態，這就是定石，但後來認為有缺點，則予以改變，稱之為新定石，第一次奕出時，稱之為新手。 </p>
      <br/>
       <p>參考資料:</p>
      <ul>
        <li>Nihon Ki-in, “楽しい囲碁入門,” [Online]. Available:<a href="https://www.nihonkiin.or.jp/teach/lesson/school/syoubu.html">https://www.nihonkiin.or.jp/teach/lesson/school/syoubu.html</a></li>
        <li>石田芳夫,《初級定石》, 吳仁譯, 世界文物出版社.</li>
      </ul>
      
      
    </div>
  )
}

export default Tutorial