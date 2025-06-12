
import { useEffect, useState } from 'react'
import ProblemCard from './ProblemCard'
import { BACKEND_URL } from './config'
import Tutorial from './Tutorial'  // 匯入教學頁


function App() {
  const [questions, setQuestions] = useState([])
  const [selectedQid, setSelectedQid] = useState(null)
  const [page, setPage] = useState('problems')  // 'tutorial' or 'problems'
  const [serverloading, setserverLoading] = useState(true) //  新增 serverloading 狀態


  useEffect(() => {
    fetch(`${BACKEND_URL}/questions`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data)
        setSelectedQid(data[0]?.qid || null) // 預設選第一題
      })
      .catch(err => {
        console.error('載入題庫失敗：', err)
        setQuestions([])
      })
      .finally(() => {
      setserverLoading(false) // ✅ 無論成功失敗都結束 loading
    })
  }, [])

  const selectedQuestion = questions.find(q => q.qid === selectedQid)

  return (
    <div style={{ display: 'flex' }}>
      {/* 左側題庫導覽 */}
      <div style={{
        width: '180px',
        borderRight: '1px solid #ccc',
        padding: '10px',
        backgroundColor: '#f7f7f7',
        minHeight: '100vh'
      }}>
       <button     
       onClick={() => {
         setPage('tutorial')
         setSelectedQid(null)  // 👈 清除選中的題目
          }}  
       style={{
        width: '100%', 
        padding: '6px 10px',
        marginBottom: '10px', 
        backgroundColor: page === 'tutorial' ? '#ddd' : '#fff',
        border: '1px solid #ccc',
        cursor: 'pointer',
        textAlign: 'left'
        }}
        >
        規則與定石介紹
        </button>
        <h3>題庫</h3>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {questions.map((q) => (
            <li key={q.qid}>
              {/* 選題按鈕*/}
              <button
                onClick={() => {
                 setSelectedQid(q.qid)
                 setPage('problems')   // 👈 點題目時切回題目頁
                 }}
                style={{
                  width: '100%',
                  padding: '6px 10px',
                  marginBottom: '4px',
                  textAlign: 'left',
                  backgroundColor: selectedQid === q.qid ? '#ddd' : '#fff',
                  border: '1px solid #ccc',
                  cursor: 'pointer'
                }}
              >
                定石 {q.qid} 
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 右側題目顯示 */}
      <div style={{ flex: 1, padding: '20px' }}>
        <h1>定石互動學習平台</h1>
        {page === 'tutorial' && <Tutorial />}
        {serverloading && (<p>🚀 伺服器喚醒中，請稍候幾秒...</p> )}
        {serverloading && page !== 'tutorial' && selectedQuestion && (
        <ProblemCard
         qid={selectedQuestion.qid}
         prompt={selectedQuestion.prompt}
         sgf={selectedQuestion.sgf}
        />
        )}
        {serverloading && page !== 'tutorial' && !selectedQuestion && (
         <p>請選擇一個題目</p>
        )}
      </div>

    </div>
  )
}

export default App
