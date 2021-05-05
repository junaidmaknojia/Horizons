from .db import db
# from flask_login import UserMixin

class Request(db.Model):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  pitch = db.Column(db.String(80), nullable = False)
  accepted = db.Column(db.Boolean, nullable = False)
  menteeId = db.Column(db.Integer, nullable = False)
  mentorId = db.Column(db.Integer, nullable = False)

  def to_dict(self):
    return {
      "id": self.id,
      "pitch": self.pitch,
      "accepted": self.accepted,
      "menteeId": self.menteeId,
      "mentorId": self.mentorId
    }
