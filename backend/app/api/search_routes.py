from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

search_routes = Blueprint('search', __name__)


@search_routes.route("/tags")
def get_tags():
    pass

@search_routes.route("/industries")
def get_industries():
    pass
