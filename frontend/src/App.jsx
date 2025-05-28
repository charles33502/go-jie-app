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
    </div>
  )
}

export default App
