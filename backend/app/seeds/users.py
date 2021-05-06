from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want

# id = db.Column(db.Integer, primary_key=True)
# first_name = db.Column(db.String(20), nullable=False)
# last_name = db.Column(db.String(20), nullable=False)
# email = db.Column(db.String(255), nullable=False, unique=True)
# hashed_password = db.Column(db.String(255), nullable=False)
# role = db.Column(db.String(10), nullable=False)
# bio = db.Column(db.String(350), nullable=True)
# city = db.Column(db.String(20), nullable=True)
# state = db.Column(db.String(15), nullable=True)
# profile_photo = db.Column(db.String(255), nullable=False, default="https://i.imgur.com/tdi3NGa.jpg")
# title_id = db.Column(db.Integer, db.ForeignKey("roles.id"), nullable=True)
# industry_id = db.Column(db.Integer, db.ForeignKey("industries.id"), nullable=True)
# created_at = db.Column(db.DateTime, default=lambda: datetime.now(), nullable=False)
# updated_at = db.Column(db.DateTime, default=lambda: datetime.now(), nullable=False)
# tags = db.relationship("Tag", secondary="user_tags", back_populates="users")
# title = db.relationship("Role", back_populates="users")
# industry = db.relationship("Industry", back_populates="users")

def seed_users():

    demo = User(first_name="Demo", last_name="User", email="demouser@horizon.com", password="password")
    db.session.add(demo)
    db.session.add(User(first_name="Duddette", last_name="Lebowski", email="lebowski@gmail.com", password="whiteRussian", role="Mentor"))
    db.session.add(User(first_name="Maria", last_name="Hill", email="hill@gmail.com", password="smulders", role="Mentor"))
    db.session.add(User(first_name="Monarch", last_name="Daisy", email="daisy@gmail.com", password="metamorphosis", role="Mentor"))
    db.session.add(User(first_name="Amy", last_name="George", email="george@gmail.com", password="whatsThe401", role="Mentor"))
    db.session.add(User(first_name="Matt", last_name="Foley", email="foley@gmail.com", password="vanDownByTheRiver", role="Mentor"))
    db.session.add(User(first_name="Arnold", last_name="Zola", email="zola@gmail.com", password="theAlgorithm", role="Mentee"))
    db.session.add(User(first_name="Adam", last_name="Mulchler", email="mulchler@gmail.com", password="freshPepper", role="Mentee"))
    db.session.add(User(first_name="Petler", last_name="Parkaler", email="parkaler@gmail.com", password="ohMyGod", role="Mentee"))
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
