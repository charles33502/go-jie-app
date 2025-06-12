<<<<<<< HEAD
import { useEffect, useState } from 'react'
import ProblemCard from './ProblemCard'
import { BACKEND_URL } from './config'
import Tutorial from './Tutorial'  // 匯入教學頁


function App() {
  const [questions, setQuestions] = useState([])
  const [selectedQid, setSelectedQid] = useState(null)
  const [page, setPage] = useState('problems')  // 'tutorial' or 'problems'


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
        {page !== 'tutorial' && selectedQuestion && (
        <ProblemCard
         qid={selectedQuestion.qid}
         prompt={selectedQuestion.prompt}
         sgf={selectedQuestion.sgf}
        />
        )}
        {page !== 'tutorial' && !selectedQuestion && (
         <p>請選擇一個題目</p>
        )}
      </div>
=======
// frontend/src/App.jsx
import { useState } from 'react'

function App() {
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [loading, setLoading] = useState(false)

  const apiUrl = import.meta.env.DEV
    ? '/api/submit'
    : 'https://go-jie-app.onrender.com/submit'

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer })
      })
      const data = await res.json()
      setFeedback(data.feedback)
    } catch {
      setFeedback('後端無回應')
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>定石判斷練習</h1>
      <img src="/example-joseki.png" alt="定石圖示" style={{ width: 300 }} />
      <p>你認為這組定石對哪方有利？為什麼？</p>
      <input
        type="text"
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        style={{ width: '300px' }}
        placeholder="請輸入你的想法..."
      />
      <button onClick={handleSubmit} disabled={loading}>送出</button>
      <p>系統回饋：{feedback}</p>
>>>>>>> bacd31a8cbe319e211f93ec985a8104ef7fe3d7d
    </div>
  )
}

export default App
