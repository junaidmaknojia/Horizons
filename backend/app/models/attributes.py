from .db import db

class Industry(db.Model):
    __tablename__ = "industries"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    users = db.relationship("User", back_populates="industry")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "users": list(map(lambda user: user.to_dict(), self.users))
        }


class Role(db.Model):
    __tablename__ = "roles"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    categoryId = db.Column(db.Integer, db.ForeignKey("role_categories.id"), nullable=False)
    users = db.relationship("User", back_populates="title")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "users": list(map(lambda user: user.to_dict(), self.users))
        }


class RoleCategory(db.Model):
    __tablename__ = "role_categories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    roles = db.relationship("Role")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "roles": list(map(lambda role: {"id": role.id, "name": role.name}, self.roles))
        }
