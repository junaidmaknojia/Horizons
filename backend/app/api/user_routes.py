from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, Tag, Role, Industry, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route("/update/", methods=["PUT"])
def update_user():
    data = request.json
    user = User.query.filter(User.id == current_user.id).one()
    user.first_name = data["firstName"]
    user.last_name = data["lastName"]
    user.bio = data["bio"]
    user.city = data["city"]
    user.state = data["state"]
    if data["title"]:
        user.title = Role.query.get(data["title"])
    if data["industry"]:
        user.industry = Industry.query.get(data["industry"])
    user.tags = []
    for tagId in data["formatTags"]:
        tag = Tag.query.get(tagId)
        user.tags.append(tag)
    db.session.commit()
    return user.to_dict()


@user_routes.route("/mentors/")
def get_all_mentors():
    print("inside mentors get")
    all_mentors = User.query.filter(User.role == "Mentor").all()
    return {"mentors": [m.to_dict() for m in all_mentors]}

@user_routes.route("/mentees/")
def get_all_mentees():
    all_mentees = User.query.filter(User.role == "Mentee").all()
    return {"mentees": [m.to_dict() for m in all_mentees]}

@user_routes.route("/", methods=["DELETE"])
def delete_user():
    pass
