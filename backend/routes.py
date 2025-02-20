from flask import request, jsonify
from app import app, db, bcrypt
from models import User, Cliente
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    
    if user and bcrypt.check_password_hash(user.password_hash, data['password']):
        access_token = create_access_token(identity=user.username)
        return jsonify(access_token=access_token), 200
    
    return jsonify({'msg': 'Credenciais inválidas'}), 401

@app.route('/clientes', methods=['GET'])
@jwt_required()
def get_clientes():
    clientes = Cliente.query.all()
    return jsonify([{"id": c.id, "nome": c.nome, "cpf": c.cpf, "email": c.email} for c in clientes])

@app.route('/clientes', methods=['POST'])
@jwt_required()
def create_cliente():
    data = request.get_json()
    novo_cliente = Cliente(**data)
    db.session.add(novo_cliente)
    db.session.commit()
    return jsonify({"msg": "Cliente cadastrado com sucesso"}), 201
