from .db import db

class Industry(db.Model):
    __tablename__ = "industries"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)


class Role(db.Model):
    __tablename__ = "roles"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    categoryId = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "categoryId": self.categoryId
        }

class RoleCategory(db.Model):
    __tablename__ = "rolecategories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
