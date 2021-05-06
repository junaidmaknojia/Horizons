from app.models import db, Tag, TagCategory


# id = db.Column(db.Integer, primary_key=True)
# name = db.Column(db.String(50), nullable=False)
# categoryId = db.Column(db.Integer, db.ForeignKey("tag_categories.id"), nullable=False)
# users = db.relationship("User", secondary="user_tags", back_populates="tags")


def seed_tags():
    {name: "Incorporation", categoryId: 1},
    {name: "Branding", categoryId: 1},
    {name: "Creating a MVP", categoryId: 1},
    {name: "Business model", categoryId: 1},
    {name: "Financial model", categoryId: 1},
    {name: "Pitching", categoryId: 1},
    {name: "Customer Acquisition", categoryId: 1},
    {name: "Operations", categoryId: 1},
    {name: "Growth", categoryId: 1},
    {name: "Product feedback", categoryId: 1},
    {name: "Product-market fit", categoryId: 1},
    {name: "Business development", categoryId: 1},
    {name: "Scaling a company", categoryId: 1},
    {name: "Marketing", categoryId: 1},
    {name: "Business Strategy", categoryId: 1},
    {name: "Team building", categoryId: 1},
    {name: "Legal", categoryId: 1},
    {name: "Fundraising", categoryId: 1},
    {name: "Upskilling", categoryId: 2},
    {name: "Coding", categoryId: 2},
    {name: "Law School application", categoryId: 2},
    {name: "Business School application", categoryId: 2},
    {name: "Grad school application", categoryId: 2},
    {name: "Investing", categoryId: 2},
    {name: "Digital skills training", categoryId: 2},
    {name: "Getting an internship", categoryId: 3},
    {name: "Getting first job", categoryId: 3},
    {name: "Career advancement", categoryId: 3},
    {name: "Setting professional goals", categoryId: 3},
    {name: "Resume/job applications", categoryId: 3},
    {name: "Getting a promotion", categoryId: 3},
    {name: "Salary Negotiation", categoryId: 3},
    {name: "Recruiting help", categoryId: 3},
    {name: "Switching careers", categoryId: 3},
    {name: "Confidence building", categoryId: 4},
    {name: "Public speaking", categoryId: 4},
    {name: "Job interview skills", categoryId: 4},
    {name: "Negotiation strategies", categoryId: 4},
    {name: "Goal setting", categoryId: 4},
    {name: "Professional networking", categoryId: 4},
    {name: "Leadership skills", categoryId: 4},
    {name: "Getting on boards", categoryId: 4},
    {name: "Communication skills", categoryId: 4},
    {name: "Managing teams", categoryId: 4},
    {name: "Building a personal brand", categoryId: 4},
    {name: "Work/Life Balance", categoryId: 5},

# Uses a raw SQL query to TRUNCATE the tags table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_tags():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
