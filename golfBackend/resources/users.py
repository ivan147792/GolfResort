from flask import Flask, request, jsonify
from flask.views import MethodView
from db import db
from sqlalchemy.exc import SQLAlchemyError
from flask_smorest import abort, Blueprint
from schemas import UserSchema, UserLoginSchema
from passlib.hash import pbkdf2_sha256
from flask_jwt_extended import (
    create_access_token, 
    get_jwt, 
    jwt_required,
    create_refresh_token,
    get_jwt_identity
)
from models.user import UserModel

blp = Blueprint("Users", __name__, description = "Operations on users")
@blp.route('/login')
class UserLogin(MethodView):
  @blp.arguments(UserLoginSchema)
  def post(self, user_data):
    user = UserModel.query.filter_by(email=user_data["email"]).first()
    if user and pbkdf2_sha256.verify(user_data["password"], user.password):
            access_token = create_access_token(identity=str(user.id))
           
            return {
                "message": "Login successful",
                "access_token": access_token,
                "user": {
                    "id": user.id,
                    "name": user.name,
                    "last_name": user.last_name,
                    "email": user.email,
                    "role": user.role
                }
            }, 200
    abort(401, message="Invalid credentials") 


