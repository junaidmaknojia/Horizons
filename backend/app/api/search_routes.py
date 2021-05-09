from flask import Blueprint, jsonify, session, request
from app.models import User, TagCategory, Tag, Role, RoleCategory, Industry, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

search_routes = Blueprint('searches', __name__)


@search_routes.route("/tags/")
def get_tags():
    # tags = Tag.query.options(joinedLoad(Tag.users)).all()
    tags = Tag.query.all()
    return {"tags": [tag.to_dict() for tag in tags]}


@search_routes.route("/industries")
def get_industries():
    industries = Industry.query.all()
    return {"industries": [tc.to_dict() for tc in industries]}

@search_routes.route("/tagCategories")
def get_tag_categories():
    tagCats = TagCategory.query.all()
    return {"tagCats": [tc.to_dict() for tc in tagCats]}

@search_routes.route("/roleCategories")
def get_role_categories():
    roleCats = RoleCategory.query.all()
    return {"roleCats": [tc.to_dict() for tc in roleCats]}
