from flask import Blueprint, jsonify, session, request
from app.models import User, Request, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

request_routes = Blueprint('requests', __name__)

@request_routes.route("/")
def get_requests():
    currUser = current_user.to_dict()
    hermes = []
    if currUser["role"] == "Mentor":
        found_requests = Request.query.filter(Request.mentorId == currUser["id"]).all()
        for request in found_requests:
            rq = request.to_dict()
            rq["mentee"] = User.query.get(request.menteeId).to_dict()
            hermes.append(rq)
        return {"requests": hermes}
    else:
        found_requests = Request.query.filter(Request.menteeId == currUser["id"]).all()
        for request in found_requests:
            rq = request.to_dict()
            rq["mentor"] = User.query.get(request.mentorId).to_dict()
            hermes.append(rq)
        return {"requests": hermes}
    # return {"requests": [rq.to_dict() for rq in found_requests]}

@request_routes.route("/", methods=["POST"])
def make_request():
    data = request.json
    package = {"menteeId": current_user.id, "mentorId": data["mentorId"], "pitch": data["pitch"], "accepted": data["accepted"]}
    newRequest = Request(**package)
    db.session.add(newRequest)
    db.session.commit()
    return newRequest.to_dict()

@request_routes.route("/update/", methods=["PATCH"])
def update_request():
    data = request.json
    found_request = Request.query.get(data["requestId"])
    found_request.accepted = True
    db.session.commit()
    return found_request.to_dict()

@request_routes.route("/delete", methods=["DELETE"])
def delete_request():
    data = request.json
    print(data)
    found_request = Request.query.get(data["requestId"])
    db.session.delete(found_request)
    db.session.commit()
    return {}
