from .db import db
# from flask_login import UserMixin

class Request(db.Model):
  __tablename__ = 'requests'

  id = db.Column(db.Integer, primary_key = True)
  pitch = db.Column(db.String(80), nullable = False)
  accepted = db.Column(db.Boolean, default = False, nullable = False)
  menteeId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
  mentorId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
  mentor = db.relationship("User", back_populates="requests")
  mentee = db.relationship("User", back_populates="requests")

  def to_dict(self):
    return {
      "id": self.id,
      "pitch": self.pitch,
      "accepted": self.accepted,
      "mentor": self.mentor,
      "mentee": self.mentee
    }
