from app.models import db, Industry, Role, RoleCategory


def seed_industries():

    db.session.add(Industry(name="Architecture / Design"))
    db.session.add(Industry(name="Arts / Culture"))
    db.session.add(Industry(name="Beauty"))
    db.session.add(Industry(name="Agriculture"))
    db.session.add(Industry(name="BioTech"))
    db.session.add(Industry(name="Computer Software"))
    db.session.add(Industry(name="Retail"))
    db.session.add(Industry(name="Education"))
    db.session.add(Industry(name="Entertainment / Gaming"))
    db.session.add(Industry(name="Fashion"))
    db.session.add(Industry(name="Energy"))
    db.session.add(Industry(name="Finance"))
    db.session.add(Industry(name="Food & Beverage"))
    db.session.add(Industry(name="Green Tech"))
    db.session.add(Industry(name="Healthcare / Medicine"))
    db.session.add(Industry(name="Hospitality / Tourism"))
    db.session.add(Industry(name="Legal Services"))
    db.session.add(Industry(name="Sports Management"))
    db.session.add(Industry(name="Construction"))
    db.session.add(Industry(name="Manufacturing"))
    db.session.add(Industry(name="Advertising / Marketing"))
    db.session.add(Industry(name="Journalism"))
    db.session.add(Industry(name="Nonprofit / NGO"))
    db.session.add(Industry(name="Real Estate"))
    db.session.add(Industry(name="Transportation"))
    db.session.commit()


def undo_industries():
    db.session.execute('TRUNCATE industries RESTART IDENTITY CASCADE;')
    db.session.commit()

def seed_roles():
    db.session.add(Role(name="Accountant", categoryId=1))
    db.session.add(Role(name="Administrative Assistant", categoryId=2))
    db.session.add(Role(name="Customer Service Representative", categoryId=2))
    db.session.add(Role(name="HR Manager", categoryId=2))
    db.session.add(Role(name="Mechanical Engineer", categoryId=3))
    db.session.add(Role(name="Chemical Engineer", categoryId=3))
    db.session.add(Role(name="Software Engineer", categoryId=3))
    db.session.add(Role(name="Electrical Engineer", categoryId=3))
    db.session.add(Role(name="Civil Engineer", categoryId=3))
    db.session.add(Role(name="Investment Banking Analyst", categoryId=4))
    db.session.add(Role(name="Finance Manager", categoryId=4))
    db.session.add(Role(name="Venture Capital Analyst", categoryId=5))
    db.session.add(Role(name="Angel investor", categoryId=5))
    db.session.add(Role(name="Hedge fund Manager", categoryId=5))
    db.session.add(Role(name="Impact investor", categoryId=5))
    db.session.add(Role(name="Sports Manager", categoryId=6))
    db.session.add(Role(name="Construction Manager", categoryId=6))
    db.session.add(Role(name="Project Manager", categoryId=6))
    db.session.add(Role(name="COO", categoryId=6))
    db.session.add(Role(name="Founder", categoryId=6))
    db.session.add(Role(name="CEO", categoryId=6))
    db.session.add(Role(name="CFO", categoryId=6))
    db.session.add(Role(name="General Manager", categoryId=6))
    db.session.add(Role(name="Social Media Manager", categoryId=7))
    db.session.add(Role(name="Marketing Manager", categoryId=7))
    db.session.add(Role(name="Journalist", categoryId=8))
    db.session.add(Role(name="Business Development Manager", categoryId=9))
    db.session.add(Role(name="Sales Representative", categoryId=9))
    db.session.add(Role(name="Sales Manager", categoryId=9))
    db.session.add(Role(name="Machine Learning Engineer", categoryId=10))
    db.session.add(Role(name="Frontend Developer", categoryId=10))
    db.session.add(Role(name="Backend Developer", categoryId=10))
    db.session.add(Role(name="Full-stack Developer", categoryId=10))
    db.session.add(Role(name="Product Manager", categoryId=10))
    db.session.add(Role(name="Mobile App Developer", categoryId=10))
    db.session.add(Role(name="Data Scientist", categoryId=10))
    db.session.add(Role(name="UX/UI Designer", categoryId=10))
    db.session.add(Role(name="Graphic Designer", categoryId=10))
    db.session.add(Role(name="Web Designer", categoryId=10))
    db.session.commit()

def undo_roles():
    db.session.execute('TRUNCATE roles RESTART IDENTITY CASCADE;')
    db.session.commit()


def seed_role_categories():

    db.session.add(RoleCategory(name="Accounting"))
    db.session.add(RoleCategory(name="Admin / HR"))
    db.session.add(RoleCategory(name="Engineering"))
    db.session.add(RoleCategory(name="Finance / FinTech"))
    db.session.add(RoleCategory(name="Investing"))
    db.session.add(RoleCategory(name="Management"))
    db.session.add(RoleCategory(name="Marketing"))
    db.session.add(RoleCategory(name="Media / Comms"))
    db.session.add(RoleCategory(name="Sales"))
    db.session.add(RoleCategory(name="Technology"))
    db.session.commit()

def undo_role_categories():
    db.session.execute('TRUNCATE role_categories RESTART IDENTITY CASCADE;')
    db.session.commit()
