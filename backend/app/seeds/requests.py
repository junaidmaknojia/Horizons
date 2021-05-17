from app.models import db, Request

# pitch = db.Column(db.String(80), nullable = False)
# accepted = db.Column(db.Boolean, default = False, nullable = False)
# menteeId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
# mentorId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)

def seed_requests():
    # 15 mentees
    # 31 mentors
    for x in range(15):
        for y in range(31):
            db.session.add(Request(pitch="", accepted=False, menteeId=x, mentorId=y))
    db.session.commit()



def undo_requests():
    db.session.execute('TRUNCATE requests RESTART IDENTITY CASCADE;')
    db.session.commit()
