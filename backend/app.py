from flask import Flask, jsonify, request
from flask_restful import Api, Resource
from flask_cors import CORS

app = Flask(__name__)
CORS(app)        # <- 新增這行
api = Api(app)

class Hello(Resource):
    def get(self):
        return jsonify({"message": "Hello, World!"})

api.add_resource(Hello, '/')

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))  # 讓 Render 指定 port
    app.run(host="0.0.0.0", port=port)
