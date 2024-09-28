"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Authors


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body['message'] = "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return response_body, 200


@api.route('/authors', methods=['GET', 'POST'])
def authors():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Authors)).scalars()
        # Opción 1
        # variable = [ 'objerivo' for  'iterador' in 'lista']
        result = [row.serialize() for row in rows]
        # Opción 2
        """ 
        result = []
        for row in rows:
            result.append(row.serialize()) 
        """
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
def author(id):
    response_body = {}
    row = db.session.execute(db.select(Authors).where(Authors.id == id)).scalar()
    if not row:
        response_body['message'] = f'El autor {id} no existe'
        response_body['results'] = {}
        return response_body, 404
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
        return response_body, 200

@api.route('/users', methods=['GET'])
def users():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Users)).scalars()
        result = [row.serialize() for row in rows]
        response_body['message'] = 'Mensaje desde el GET'
        response_body['results'] = result
        return response_body, 200        