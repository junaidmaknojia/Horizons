from flask import Blueprint, jsonify, session, request
from app.models import User, Request, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

request_routes = Blueprint('requests', __name__)

@request_routes.route("/")
def get_requests():
    pass

@request_routes.route("/", methods=["POST"])
def make_request():
    data = request.json()
    currUser = current_user.to_dict()
    package = {"menteeId": currUser.id, "mentorId": data["mentorId"], "pitch": data["pitch"], "accepted": False}
    newRequest = Request(**package)
    db.session.add(newRequest)
    db.session.commit()

@request_routes.route("/update", methods=["PATCH"])
def update_request():
    pass

@request_routes.route("/delete", methods=["DELETE"])
def delete_request():
    pass
