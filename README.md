# 圍棋定石AI互動平台

一個以 React + Flask 實作的圍棋教學工具，幫助使用者透過與AI互動學習定石。

## 功能特色

- 📚 題庫導覽與互動作答
- 🔄 即時回饋與重播功能

 ## 🚀 體驗入口

- 📎 前端展示網站：https://go-joseki-interactive.vercel.app
- 本專案後端已部署於 Render，透過 Flask 提供 API 服務（不開放直接存取）

## ⚙️ 進階用戶：本地執行方式

如欲自行測試前後端，可參考以下指令：

```bash
# 前端
cd frontend
npm install
npm run dev

# 後端
cd backend
pip install -r requirements.txt
python app.py
```
請自行設定 .env 以連接 Gemini API。
