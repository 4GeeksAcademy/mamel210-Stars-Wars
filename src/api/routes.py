"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from api.models import db, Users


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body['message'] = "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return response_body, 200


@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user
    if email != "test" or password != "test":
        response_body['message'] = "bad email or passwaord"
        return response_body, 401
    access_token = create_access_token(identity=email)
    response_body['message'] = "Usuario logeado con exito"
    response_body['access_token'] = access_token
    return response_body, 200


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    response_body = {}
    current_user = get_jwt_identity()
    print(current_user)
    response_body['message'] = 'Usuario con acceso'
    response_body['logged_in_as'] = current_user
    return response_body, 200


@api.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    response_body = {}
    current_user = get_jwt_identity()
    print(current_user)
    user = db.session.execute(db.select(Users).where(Users.id == current_user['id'])).scalar()
    print(user.serialize())
    response_body['message'] = 'Usuario con acceso'
    response_body['logged_in_as'] = current_user
    response_body['results'] = user.serialize()
    return response_body, 200


""" @api.route('/authors', methods=['GET', 'POST'])
def authors():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Authors)).scalars()
        # Opción 1
        # variable = [ 'objerivo' for  'iterador' in 'lista']
        result = [row.serialize() for row in rows]
        # Opción 2
        response_body['message'] = 'Mensaje desde el GET'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Authors(name=data.get('name'),
                      country=data.get('country'))
        db.session.add(row)
        db.session.commit()
        response_body['message'] = 'Mensaje desde el POST'
        response_body['results'] = row.serialize()
        return response_body, 200


@api.route('/authors/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def author(id):
    response_body = {}
    current_user = get_jwt_identity()
    row = db.session.execute(db.select(Authors).where(Authors.id == id)).scalar()
    if not row:
        response_body['message'] = f'El autor {id} no existe'
        response_body['results'] = {}
        return response_body, 404
    if row.user_id != current_user['id']:
        print(row.serialize())
        response_body['message'] = f'Usted no puede modicar, ver o borrar los datos del author {id}'
        response_body['results'] = {}
        return response_body, 200
    if request.method == 'GET':
        response_body['message'] = f'Mensaje desde el GET de {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.name = data.get('name')
        row.country = data.get('country')
        db.session.commit()
        response_body['message'] = f'Mensaje desde el PUT de {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Mensaje desde el DELETE de {id}'
        response_body['results'] = {}
        return response_body, 200 """


@api.route('/users', methods=['GET'])
def users():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Users)).scalars()
        result = [row.serialize() for row in rows]
        response_body['message'] = 'Mensaje desde el GET'
        response_body['results'] = result
        return response_body, 200        