from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(10), nullable=False)
    bio = db.Column(db.String(350), nullable=True)
    city = db.Column(db.String(20), nullable=True)
    state = db.Column(db.String(15), nullable=True)
    profile_photo = db.Column(db.String(255), nullable=False, default="https://i.imgur.com/tdi3NGa.jpg")
    title_id = db.Column(db.Integer, db.ForeignKey("roles.id"), nullable=True)
    industry_id = db.Column(db.Integer, db.ForeignKey("industries.id"), nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(), nullable=False)
    tags = db.relationship("Tag", secondary="user_tags", back_populates="users")
    title = db.relationship("Role", back_populates="users")
    industry = db.relationship("Industry", back_populates="users")
    # requests = db.relationship("Request", back_populates="users")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email,
            "role": self.role,
            "bio": self.bio,
            "city": self.city,
            "state": self.state,
            "tags": list(map(lambda tag: tag.name, self.tags)),
            "profilePhoto": self.profile_photo,
            "industry": self.industry.name if self.industry else "",
            "title": self.title.name if self.title else ""
        }
