from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import requests
import os
import traceback
from dotenv import load_dotenv
load_dotenv()  # ✅ 載入 .env 檔案


app = Flask(__name__)
CORS(app, origins=["http://localhost:5173","https://go-joseki-interactive.vercel.app"])


# ✅ Gemini 題庫（含分析摘要）
with open("questions_gemini.json", encoding="utf-8") as file:
    questions_gemini = {q["id"]: q for q in json.load(file)}
print("✅ 成功載入 Gemini 題庫")


# ✅ Gemini API 金鑰
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")


def call_gemini(prompt):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
    headers = {"Content-Type": "application/json"}
    data = {
        "contents": [{"parts": [{"text": prompt}]}]
    }
    try:
      res = requests.post(url, headers=headers, json=data)
      res.raise_for_status()
      reply = res.json()["candidates"][0]["content"]["parts"][0]["text"]
      return reply
    except requests.exceptions.HTTPError as e:
      print("API 出錯：", e)
      print("錯誤內容：", res.text)  # 幫助你 debug API 錯誤
      return "AI 回覆失敗"

@app.route("/questions", methods=["GET"])
def get_questions():
    return jsonify([
        {
            "qid": qid,
            "prompt": q["prompt"],
            "sgf": q["sgf"],  # ✅ 直接從 JSON 內取出 SGF 原文
        }
        for qid, q in questions_gemini.items()
    ])

   

@app.route("/answer", methods=["POST"])
def answer():
    data = request.get_json()
    qid = int(data.get("qid", 1))
    user_answer = data.get("answer", "").strip()

    q = questions_gemini.get(qid)
    if not q:
        return jsonify({"error": "題號不存在"}), 404

    a = q["analysis"]
    prompt = f"""題目：{q['prompt']}

使用者的回答是：「{user_answer}」

定石分析資料如下：
- 白棋棋位：{a['white point']}
- 黑棋棋位：{a['black point']}
- 白棋：{a['white']}
- 黑棋：{a['black']}
- 總結：{a['summary']}

請扮演一位親切的圍棋老師，幫忙分析這位使用者的回答。請針對他的回答內容進行說明，
包括是否合理、常見誤區、潛在想法或可改進之處。語氣請自然、鼓勵學習、避免使用「正確答案是…」這種說法，
字數控制在300字以內。
"""

    try:
        ai_reply = call_gemini(prompt)
        return jsonify({"response": ai_reply})
    except Exception as e:
        print("Gemini API 呼叫失敗：", e)
        traceback.print_exc()
        return jsonify({"error": "無法取得 AI 回答"}), 500


if __name__ == "__main__":
    debug_mode = os.getenv("FLASK_DEBUG", "false").lower() == "true"
    app.run(host="0.0.0.0", port=10000, debug=debug_mode)

