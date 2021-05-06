from app.models import db, Tag, TagCategory


# id = db.Column(db.Integer, primary_key=True)
# name = db.Column(db.String(50), nullable=False)
# categoryId = db.Column(db.Integer, db.ForeignKey("tag_categories.id"), nullable=False)
# users = db.relationship("User", secondary="user_tags", back_populates="tags")


def seed_tags():
    db.session.add(Tag(name: "Incorporation", categoryId: 1))
    db.session.add(Tag(name: "Branding", categoryId: 1))
    db.session.add(Tag(name: "Creating a MVP", categoryId: 1))
    db.session.add(Tag(name: "Business model", categoryId: 1))
    db.session.add(Tag(name: "Financial model", categoryId: 1))
    db.session.add(Tag(name: "Pitching", categoryId: 1))
    db.session.add(Tag(name: "Customer Acquisition", categoryId: 1))
    db.session.add(Tag(name: "Operations", categoryId: 1))
    db.session.add(Tag(name: "Growth", categoryId: 1))
    db.session.add(Tag(name: "Product feedback", categoryId: 1))
    db.session.add(Tag(name: "Product-market fit", categoryId: 1))
    db.session.add(Tag(name: "Business development", categoryId: 1))
    db.session.add(Tag(name: "Scaling a company", categoryId: 1))
    db.session.add(Tag(name: "Marketing", categoryId: 1))
    db.session.add(Tag(name: "Business Strategy", categoryId: 1))
    db.session.add(Tag(name: "Team building", categoryId: 1))
    db.session.add(Tag(name: "Legal", categoryId: 1))
    db.session.add(Tag(name: "Fundraising", categoryId: 1))
    db.session.add(Tag(name: "Upskilling", categoryId: 2))
    db.session.add(Tag(name: "Coding", categoryId: 2))
    db.session.add(Tag(name: "Law School application", categoryId: 2))
    db.session.add(Tag(name: "Business School application", categoryId: 2))
    db.session.add(Tag(name: "Grad school application", categoryId: 2))
    db.session.add(Tag(name: "Investing", categoryId: 2))
    db.session.add(Tag(name: "Digital skills training", categoryId: 2))
    db.session.add(Tag(name: "Getting an internship", categoryId: 3))
    db.session.add(Tag(name: "Getting first job", categoryId: 3))
    db.session.add(Tag(name: "Career advancement", categoryId: 3))
    db.session.add(Tag(name: "Setting professional goals", categoryId: 3))
    db.session.add(Tag(name: "Resume/job applications", categoryId: 3))
    db.session.add(Tag(name: "Getting a promotion", categoryId: 3))
    db.session.add(Tag(name: "Salary Negotiation", categoryId: 3))
    db.session.add(Tag(name: "Recruiting help", categoryId: 3))
    db.session.add(Tag(name: "Switching careers", categoryId: 3))
    db.session.add(Tag(name: "Confidence building", categoryId: 4))
    db.session.add(Tag(name: "Public speaking", categoryId: 4))
    db.session.add(Tag(name: "Job interview skills", categoryId: 4))
    db.session.add(Tag(name: "Negotiation strategies", categoryId: 4))
    db.session.add(Tag(name: "Goal setting", categoryId: 4))
    db.session.add(Tag(name: "Professional networking", categoryId: 4))
    db.session.add(Tag(name: "Leadership skills", categoryId: 4))
    db.session.add(Tag(name: "Getting on boards", categoryId: 4))
    db.session.add(Tag(name: "Communication skills", categoryId: 4))
    db.session.add(Tag(name: "Managing teams", categoryId: 4))
    db.session.add(Tag(name: "Building a personal brand", categoryId: 4))
    db.session.add(Tag(name: "Work/Life Balance", categoryId: 5))

# Uses a raw SQL query to TRUNCATE the tags table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_tags():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
