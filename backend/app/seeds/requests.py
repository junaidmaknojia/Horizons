from app.models import db, Request

# pitch = db.Column(db.String(80), nullable = False)
# accepted = db.Column(db.Boolean, default = False, nullable = False)
# menteeId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
# mentorId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)

def seed_requests():
    # 14 mentees
    #
    db.session.add(Request(pitch="", accepted=False, menteeId=1, mentorId=1))
    db.session.commit()



def undo_requests():
    db.session.execute('TRUNCATE requests RESTART IDENTITY CASCADE;')
    db.session.commit()
