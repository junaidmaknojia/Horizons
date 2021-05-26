import os
from werkzeug.security import generate_password_hash
from app.models import db, User, Tag, Role, Industry
import random

def seed_users():
    password_add = os.environ.get("PASSWORD_APPEND")
    demo = User(first_name="Demo", last_name="User", email="demouser@horizon.com", password="password", role="Mentee")
    db.session.add(demo)
    demo_mentor = User(first_name="Demo", last_name="Mentor", email="demomentor@horizon.com", password="password", role="Mentor")
    # db.session.add(User(first_name="Duddette", last_name="Lebowski", email="lebowski@gmail.com", hashed_password=generate_password_hash("whiteRussian"), role="Mentor"))
    # db.session.add(User(first_name="Maria", last_name="Hill", email="hill@gmail.com", hashed_password=generate_password_hash("smulders"), role="Mentor"))
    # db.session.add(User(first_name="Monarch", last_name="Daisy", email="daisy@gmail.com", hashed_password=generate_password_hash("metamorphosis"), role="Mentor"))
    # db.session.add(User(first_name="Amy", last_name="George", email="george@gmail.com", hashed_password=generate_password_hash("whatsThe401"), role="Mentor"))
    # db.session.add(User(first_name="Matt", last_name="Foley", email="foley@gmail.com", hashed_password=generate_password_hash("vanDownByTheRiver"), role="Mentor"))
    # db.session.add(User(first_name="Arnold", last_name="Zola", email="zola@gmail.com", hashed_password=generate_password_hash("theAlgorithm"), role="Mentee"))
    # db.session.add(User(first_name="Adam", last_name="Mulchler", email="mulchler@gmail.com", hashed_password=generate_password_hash("freshPepper"), role="Mentee"))
    # db.session.add(User(first_name="Petler", last_name="Parkaler", email="parkaler@gmail.com", hashed_password=generate_password_hash("ohMyGod"), role="Mentee"))
    db.session.add(User(first_name="Amber", last_name="Yourrig", email="Yourrig@horizon.com", hashed_password=generate_password_hash(f"Yourrig{password_add}"), role="Mentee", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/amber-mentee.jpg"))
    db.session.add(User(first_name="Angela", last_name="White", email="White@horizon.com", hashed_password=generate_password_hash(f"White{password_add}"), role="Mentee", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/angela-mentee.jpg"))
    db.session.add(User(first_name="Danielle", last_name="Lodia", email="Lodia@horizon.com", hashed_password=generate_password_hash(f"Lodia{password_add}"), role="Mentee", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/danielle-mentee.jpg"))
    db.session.add(User(first_name="Emily", last_name="Bursher", email="Bursher@horizon.com", hashed_password=generate_password_hash(f"Bursher{password_add}"), role="Mentee", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/emily-mentee.jpg"))
    db.session.add(User(first_name="Gerald", last_name="Baumfinder", email="Baumfinder@horizon.com", hashed_password=generate_password_hash(f"Baumfinder{password_add}"), role="Mentee", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/gerald-mentee.jpg"))
    db.session.add(User(first_name="Gina", last_name="Narem", email="Narem@horizon.com", hashed_password=generate_password_hash(f"Narem{password_add}"), role="Mentee", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/gina-mentee.jpg"))
    db.session.add(User(first_name="James", last_name="Reginald", email="Reginald@horizon.com", hashed_password=generate_password_hash(f"Reginald{password_add}"), role="Mentee", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/james-mentee.jpg"))
    db.session.add(User(first_name="Jorge", last_name="Alvares", email="Alvares@horizon.com", hashed_password=generate_password_hash(f"Alvares{password_add}"), role="Mentee", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/jorge-mentee.jpg"))
    db.session.add(User(first_name="Karim", last_name="Irani", email="Irani@horizon.com", hashed_password=generate_password_hash(f"Irani{password_add}"), role="Mentee", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/karim-mentee.jpg"))
    db.session.add(User(first_name="Mimi", last_name="Oetting", email="Oetting@horizon.com", hashed_password=generate_password_hash(f"Oetting{password_add}"), role="Mentee", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/mimi-mentee.jpg"))
    db.session.add(User(first_name="Rehman", last_name="Paroush", email="Paroush@horizon.com", hashed_password=generate_password_hash(f"Paroush{password_add}"), role="Mentee", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/rehman-mentee.jpg"))
    db.session.add(User(first_name="Shiyann", last_name="Reeseman", email="Reeseman@horizon.com", hashed_password=generate_password_hash(f"Reeseman{password_add}"), role="Mentee", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/shiyann-mentee.jpg"))
    db.session.add(User(first_name="Sophia", last_name="Quiyov", email="Quiyov@horizon.com", hashed_password=generate_password_hash(f"Quiyov{password_add}"), role="Mentee", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/sophia-mentee.jpg"))
    db.session.add(User(first_name="Tonsar", last_name="Dale", email="Dale@horizon.com", hashed_password=generate_password_hash(f"Dale{password_add}"), role="Mentee", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/tonsar-mentee.jpg"))
    db.session.add(demo_mentor)
    db.session.add(User(first_name="Amanda", last_name="Darnelly", email="Darnelly@horizon.com", hashed_password=generate_password_hash(f"Darnelly{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/ananda-mentor.jpg"))
    db.session.add(User(first_name="Anita", last_name="Bonita", email="Bonita@horizon.com", hashed_password=generate_password_hash(f"Bonita{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/anita-mentor.jpg"))
    db.session.add(User(first_name="Dale", last_name="Lieberman", email="Lieberman@horizon.com", hashed_password=generate_password_hash(f"Lieberman{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/dale-mentor.jpg"))
    db.session.add(User(first_name="Dana", last_name="Drashum", email="Drashum@horizon.com", hashed_password=generate_password_hash(f"Drashum{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/dana-mentor.jpg"))
    db.session.add(User(first_name="Dani", last_name="Rothschild", email="Rothschild@horizon.com", hashed_password=generate_password_hash(f"Rothschild{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/dani-mentor.jpg"))
    db.session.add(User(first_name="Derek", last_name="Kochran", email="Kochran@horizon.com", hashed_password=generate_password_hash(f"Kochran{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/derek-mentor.jpg"))
    db.session.add(User(first_name="Eugenia", last_name="Stievoic", email="Stievoic@horizon.com", hashed_password=generate_password_hash(f"Stievoic{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/eugenia-mentor.jpg"))
    db.session.add(User(first_name="Eyomu", last_name="Corian", email="Corian@horizon.com", hashed_password=generate_password_hash(f"Corian{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/eyomu-mentor.jpg"))
    db.session.add(User(first_name="Franny", last_name="Mathers", email="Mathers@horizon.com", hashed_password=generate_password_hash(f"Mathers{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/franny-mentor.jpg"))
    db.session.add(User(first_name="Giselle", last_name="Shells", email="Shells@horizon.com", hashed_password=generate_password_hash(f"Shells{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/giselle-mentor.jpg"))
    db.session.add(User(first_name="Grayson", last_name="Dawes", email="Dawes@horizon.com", hashed_password=generate_password_hash(f"Dawes{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/grayson-mentor.jpg"))
    db.session.add(User(first_name="Greg", last_name="Paraborian", email="Paraborian@horizon.com", hashed_password=generate_password_hash(f"Paraborian{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/greg-mentor.jpg"))
    db.session.add(User(first_name="Hillary", last_name="Stuff", email="Stuff@horizon.com", hashed_password=generate_password_hash(f"Stuff{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/hillary-mentor.jpg"))
    db.session.add(User(first_name="Hussain", last_name="Dinka", email="Dinka@horizon.com", hashed_password=generate_password_hash(f"Dinka{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/hussain-mentor.jpg"))
    db.session.add(User(first_name="Janet", last_name="Armstrong", email="Armstrong@horizon.com", hashed_password=generate_password_hash(f"Armstrong{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/janet-mentor.jpg"))
    db.session.add(User(first_name="Jeremy", last_name="Weiner", email="Weiner@horizon.com", hashed_password=generate_password_hash(f"Weiner{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/jeremy-mentor.jpg"))
    db.session.add(User(first_name="Jerome", last_name="Jackson", email="Jackson@horizon.com", hashed_password=generate_password_hash(f"Jackson{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/jerome-mentor.jpg"))
    db.session.add(User(first_name="Jess", last_name="Tatiana", email="Tatiana@horizon.com", hashed_password=generate_password_hash(f"Tatiana{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/jess-mentor.jpg"))
    db.session.add(User(first_name="Jesse", last_name="Morales", email="Morales@horizon.com", hashed_password=generate_password_hash(f"Morales{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/jesse-mentor.jpg"))
    db.session.add(User(first_name="Jessica", last_name="Hera", email="Hera@horizon.com", hashed_password=generate_password_hash(f"Hera{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/jessica-mentor.jpg"))
    db.session.add(User(first_name="Joshua", last_name="Barter", email="Barter@horizon.com", hashed_password=generate_password_hash(f"Barter{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/joshua-mentor.jpg"))
    db.session.add(User(first_name="Mike", last_name="Rolachek", email="Rolachek@horizon.com", hashed_password=generate_password_hash(f"Rolachek{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/mike-mentor.jpg"))
    db.session.add(User(first_name="Nadu", last_name="Mayori", email="Mayori@horizon.com", hashed_password=generate_password_hash(f"Mayori{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/nadu-mentor.jpg"))
    db.session.add(User(first_name="Nancy", last_name="Belmont", email="Belmont@horizon.com", hashed_password=generate_password_hash(f"Belmont{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/nancy-mentor.jpg"))
    db.session.add(User(first_name="Olivia", last_name="Stratschu", email="Stratschu@horizon.com", hashed_password=generate_password_hash(f"Stratschu{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/olivia-mentor.jpg"))
    db.session.add(User(first_name="Pam", last_name="Wasply", email="Wasply@horizon.com", hashed_password=generate_password_hash(f"Wasply{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/pam-mentor.jpg"))
    db.session.add(User(first_name="Raya", last_name="Goinner", email="Goinner@horizon.com", hashed_password=generate_password_hash(f"Goinner{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/raya-mentor.jpg"))
    db.session.add(User(first_name="Roger", last_name="Leerstein", email="Leerstein@horizon.com", hashed_password=generate_password_hash(f"Leerstein{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/roger-mentor.jpg"))
    db.session.add(User(first_name="Ronda", last_name="Moskowitz", email="Moskowitz@horizon.com", hashed_password=generate_password_hash(f"Moskowitz{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/ronda-mentor.jpg"))
    db.session.add(User(first_name="Syed", last_name="Hamrani", email="Hamrani@horizon.com", hashed_password=generate_password_hash(f"Hamrani{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/syed-mentor.jpg"))
    db.session.add(User(first_name="Valerie", last_name="Wong", email="Wong@horizon.com", hashed_password=generate_password_hash(f"Wong{password_add}"), role="Mentor", profile_photo="https://horizons-aa.s3.us-east-2.amazonaws.com/headshots/valerie-mentor.jpg"))
    db.session.commit()

    for x in range(30):
        mentor = User.query.get(x+16)
        for y in range(5):
            tag = Tag.query.get(x+1+y)
            mentor.tags.append(tag)
    db.session.commit()

    # 39 roles
    for x in range(30):
        mentor = User.query.get(x+16)
        roleId = 1 + random.randrange(39)
        role = Role.query.get(roleId)
        mentor.title = role
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
