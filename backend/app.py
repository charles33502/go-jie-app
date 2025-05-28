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

if __name__ == '__main__':
    app.run(debug=True)
