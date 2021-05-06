from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

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

@user_routes.route("/update", methods=["PUT"])
def update_user():
    pass

@user_routes.route("/mentors")
def get_all_mentors():
    all_mentors = User.query.filter(User.role == "Mentor").all()
    return {"mentors": [m.to_dict() for m in all_mentors]}

@user_routes.route("/mentees")
def get_all_mentees():
    all_mentees = User.query.filter(User.role == "Mentee").all()
    return {"mentees": [m.to_dict() for m in all_mentees]}

@user_routes.route("/", methods=["DELETE"])
def delete_user():
    pass
