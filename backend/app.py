from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)

class Submit(Resource):
    def post(self):
        data = request.get_json()
        answer = data.get("answer", "").lower()
        if '外勢' in answer or '模樣' in answer:
            return jsonify({'feedback': '答對了！黑得外勢'})
        else:
            return jsonify({'feedback': '再想想看喔，提示：模樣、外勢、實地…'})

api.add_resource(Submit, '/submit')

if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
