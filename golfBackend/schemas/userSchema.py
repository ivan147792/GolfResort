from marshmallow import Schema, fields
from marshmallow.validate import Email


class UserSchema(Schema):
  id = fields.Int(dump_only= True)
  name = fields.Str(required=True)
  last_name = fields.Str(required=True)
  email = fields.Email(required=True, validate=Email())
  password = fields.Str(required=True)
  role = fields.Str(load_only=True)

class UserLoginSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True)