from app.models import db, Request

# pitch = db.Column(db.String(80), nullable = False)
# accepted = db.Column(db.Boolean, default = False, nullable = False)
# menteeId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
# mentorId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)

def seed_requests():
    # 15 mentees
    # 31 mentors
    for x in range(15):
        for y in range(15):
            db.session.add(Request(pitch="", accepted=False, menteeId=x+1, mentorId=x+y+15))
    db.session.commit()



def undo_requests():
    db.session.execute('TRUNCATE requests RESTART IDENTITY CASCADE;')
    db.session.commit()
