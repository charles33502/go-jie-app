import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('Loading...')

  // 🧠 根據是本地開發還是正式部署，自動切換後端 URL
  const apiUrl = import.meta.env.DEV
    ? '/api/' // 本地開發用 proxy
    : 'https://go-jie-app.onrender.com/' // 部署用 Render 雲端網址

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage('後端無回應'))
  }, [])

  return (
    <>
      <h1>Vite + React</h1>
      <p>後端回傳：{message}</p>
    </>
  )
}

export default App

