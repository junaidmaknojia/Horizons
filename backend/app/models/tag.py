from .db import db
# from flask_login import UserMixin


class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    categoryId = db.Column(db.Integer, db.ForeignKey("tag_categories.id"), nullable=False)
    users = db.relationship("User", secondary="user_tags", back_populates="tags")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "users": list(map(lambda user: user.to_dict(), self.users))
        }


class TagCategory(db.Model):
    __tablename__ = "tag_categories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    tags = db.relationship("Tag", back_populates="tags")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "tags": list(map(lambda tag: {"id": tag.id, "name": tag.name}, self.tags))
        }

user_tags = db.Table("user_tags",
                         db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
                         db.Column("tag_id", db.Integer, db.ForeignKey("tags.id"), primary_key=True))
