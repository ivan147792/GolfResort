from app import app, db
from models.user import UserModel
from passlib.hash import pbkdf2_sha256

with app.app_context():
    existing_user = UserModel.query.filter_by(email="admin@example.com").first()

    if existing_user:
        print("Admin already exists.")
    else:
        admin = UserModel(
            name="Admin",
            last_name="User",
            email="admin@example.com",
            password=pbkdf2_sha256.hash("admin123"),
            role="admin"
        )
        db.session.add(admin)
        db.session.commit()
        print("Admin user created.")


#python seed_admin.py