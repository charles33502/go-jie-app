import { useState } from 'react'
import { BACKEND_URL } from './config'
import GoBoard from './GoBoard'

function ProblemCard({ qid, prompt, sgf }) {
  const [userAnswer, setUserAnswer] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [loading, setLoading] = useState(false)


  const handleAIExplain = async () => {
    setLoading(true)
    setAiResponse('')
    try {
      const res = await fetch(`${BACKEND_URL}/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qid, answer: userAnswer })
      })
      const data = await res.json()
      setAiResponse(data.response || '無解釋內容')
    } 
    catch (err) {
      setAiResponse('⚠️ 無法取得 AI 回覆，請稍後再試')
      console.error('AI 回覆失敗：', err)
    }
    setLoading(false)
  }

  return (
    <div style={{ border: '1px solid #ccc', margin: '20px auto', padding: '20px', maxWidth: '700px', background: '#f9f9f9' }}>
      <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>題目 {qid}：</h3>
      <p style={{ marginBottom: '20px' }}>{prompt}</p>

      <GoBoard sgf={sgf} />

     <textarea
      value={userAnswer}
      onChange={(e) => setUserAnswer(e.target.value)}
      placeholder="請輸入你的看法（例如：黑得外勢）"
      rows={2}
      style={{
       width: '100%',
       padding: '8px',
       margin: '10px 0',
       fontSize: '16px',     // 這行控制字體大小
       lineHeight: '1.5',    // 增加行距讓閱讀更舒適
       borderRadius: '6px',  // 讓輸入框更圓滑
       resize: 'none'  // 禁止手動拖曳調整大小
      }}
      /> 

      <button onClick={handleAIExplain} disabled={loading} style={{ padding: '6px 12px' }}>
        {loading ? 'AI 回覆中...' : '請 AI 解釋'}
      </button>

      {aiResponse && (
        <div style={{ whiteSpace: 'pre-line', background: '#eee', padding: '10px', borderRadius: '5px', marginTop: '12px' }}>
          <strong>🤖 AI 回覆：</strong>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  )
}

export default ProblemCard
