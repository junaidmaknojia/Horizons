from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from urllib.request import Request, urlopen
from urllib.parse import urlencode
from json import loads
from os import environ

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        # use this ^ to check session user info
        # by default, current_user is attached everywhere,
        # but value is not None, its some anonymous stuff
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login/', methods=['POST'])
def login():
    """
    Logs a user in
    """
    print("Inside login route")
    form = LoginForm()
    # print(request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout/', methods=["DELETE"])
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup/', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            first_name=form.data['firstName'],
            last_name=form.data['lastName'],
            email=form.data['email'],
            password=form.data['password'],
            role=form.data["role"]
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401

@auth_routes.route("/linkedInSignUp/", methods=["POST"])
def linkedIn_sign_up():
    data = request.json
    token = data["token"]
    sendoff = {
        "grant_type": "authorization_code",
        "code": token,
        "client_id": environ.get("CLIENT_ID"),
        "client_secret": environ.get("CLIENT_SECRET"),
        "redirect_uri": "http://localhost:3000/linkedInAuth"
    }
    launch = urlencode(sendoff).encode()
    request_send = Request("https://www.linkedin.com/oauth/v2/accessToken", data=launch)
    response = urlopen(request_send)
    response2 = response.read().decode("utf-8")
    parsed_response = loads(response2)
    # now break down the user info
    access_token = parsed_response["access_token"]
    request_user_info = Request("https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))", headers={"Authorization": f"Bearer {access_token}"})
    # request_user_info = Request("https://api.linkedin.com/v2/me", headers={"Authorization": f"Bearer {access_token}"})
    user_response = urlopen(request_user_info)
    user_response2 = user_response.read().decode("utf-8")
    parsed_response2 = loads(user_response2)
    profilePhoto = parsed_response2["profilePicture"]["displayImage~"]["elements"][0]["identifiers"][0]["identifier"]
    firstName = parsed_response2["firstName"]["localized"]["en_US"]
    lastName = parsed_response2["lastName"]["localized"]["en_US"]
    password =
    # get email
    request_user_info = Request("https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))", headers={"Authorization": f"Bearer {access_token}"})
    user_response3 = urlopen(request_user_info)
    user_response4 = user_response3.read().decode("utf-8")
    parsed_response3 = loads(user_response4)
    email = parsed_response3["elements"][0]["handle~"]["emailAddress"]
    # print("---- user info", parsed_response2)

    # {
    #     'firstName': {
    #         'localized': {'en_US': 'Junaid'},
    #         'preferredLocale': {'country': 'US', 'language': 'en'}
    #     },
    #     'lastName': {
    #         'localized': {'en_US': 'Maknojia'},
    #         'preferredLocale': {'country': 'US', 'language': 'en'}
    #     },
    #     'profilePicture': {
    #         'displayImage': 'urn:li:digitalmediaAsset:C5603AQHmoyU649gm1A',
    #         'displayImage~': {
    #             'paging': {'count': 10, 'start': 0, 'links': []},
    #             'elements': [{
    #                 'artifact': 'urn:li:digitalmediaMediaArtifact:(urn:li:digitalmediaAsset:C5603AQHmoyU649gm1A,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_100_100)',
    #                 'authorizationMethod': 'PUBLIC',
    #                 'data': {
    #                     'com.linkedin.digitalmedia.mediaartifact.StillImage': {
    #                         'mediaType': 'image/jpeg',
    #                         'rawCodecSpec': {'name': 'jpeg', 'type': 'image'},
    #                         'displaySize': {'width': 100.0, 'uom': 'PX', 'height': 100.0},
    #                         'storageSize': {'width': 100, 'height': 100},
    #                         'storageAspectRatio': {'widthAspect': 1.0, 'heightAspect': 1.0, 'formatted': '1.00:1.00'},
    #                         'displayAspectRatio': {'widthAspect': 1.0, 'heightAspect': 1.0, 'formatted': '1.00:1.00'}
    #                     }
    #                 },
    #                 'identifiers': [{'identifier': 'https://media-exp1.licdn.com/dms/image/C5603AQHmoyU649gm1A/profile-displayphoto-shrink_100_100/0/1528025831520?e=1626307200&v=beta&t=PtGxkbFYhWyN41MxbdZ2H_ob6bTgO9uFvVv_IHIcSgo', 'index': 0, 'mediaType': 'image/jpeg', 'file': 'urn:li:digitalmediaFile:(urn:li:digitalmediaAsset:C5603AQHmoyU649gm1A,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_100_100,0)', 'identifierType': 'EXTERNAL_URL', 'identifierExpiresInSeconds': 1626307200}]
    #             },
    #                 {'artifact': 'urn:li:digitalmediaMediaArtifact:(urn:li:digitalmediaAsset:C5603AQHmoyU649gm1A,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_200_200)', 'authorizationMethod': 'PUBLIC', 'data': {'com.linkedin.digitalmedia.mediaartifact.StillImage': {'mediaType': 'image/jpeg', 'rawCodecSpec': {'name': 'jpeg', 'type': 'image'}, 'displaySize': {'width': 200.0, 'uom': 'PX', 'height': 200.0}, 'storageSize': {'width': 200, 'height': 200}, 'storageAspectRatio': {'widthAspect': 1.0, 'heightAspect': 1.0, 'formatted': '1.00:1.00'}, 'displayAspectRatio': {'widthAspect': 1.0, 'heightAspect': 1.0, 'formatted': '1.00:1.00'}}}, 'identifiers': [{'identifier': 'https://media-exp1.licdn.com/dms/image/C5603AQHmoyU649gm1A/profile-displayphoto-shrink_200_200/0/1528025831520?e=1626307200&v=beta&t=1P02h1bcnFojLB6TthCNnyKRs70RzqQxRcVas51_stU', 'index': 0, 'mediaType': 'image/jpeg', 'file': 'urn:li:digitalmediaFile:(urn:li:digitalmediaAsset:C5603AQHmoyU649gm1A,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_200_200,0)', 'identifierType': 'EXTERNAL_URL', 'identifierExpiresInSeconds': 1626307200}]}, {'artifact': 'urn:li:digitalmediaMediaArtifact:(urn:li:digitalmediaAsset:C5603AQHmoyU649gm1A,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_400_400)', 'authorizationMethod': 'PUBLIC', 'data': {'com.linkedin.digitalmedia.mediaartifact.StillImage': {'mediaType': 'image/jpeg', 'rawCodecSpec': {'name': 'jpeg', 'type': 'image'}, 'displaySize': {'width': 400.0, 'uom': 'PX', 'height': 400.0}, 'storageSize': {'width': 400, 'height': 400}, 'storageAspectRatio': {'widthAspect': 1.0, 'heightAspect': 1.0, 'formatted': '1.00:1.00'}, 'displayAspectRatio': {'widthAspect': 1.0, 'heightAspect': 1.0, 'formatted': '1.00:1.00'}}}, 'identifiers': [{'identifier': 'https://media-exp1.licdn.com/dms/image/C5603AQHmoyU649gm1A/profile-displayphoto-shrink_400_400/0/1528025831520?e=1626307200&v=beta&t=4lp23y2GFoN_Au_YKP8-dd7btuHp6QqlLP4o6fYinPg', 'index': 0, 'mediaType': 'image/jpeg', 'file': 'urn:li:digitalmediaFile:(urn:li:digitalmediaAsset:C5603AQHmoyU649gm1A,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_400_400,0)', 'identifierType': 'EXTERNAL_URL', 'identifierExpiresInSeconds': 1626307200}]}, {'artifact': 'urn:li:digitalmediaMediaArtifact:(urn:li:digitalmediaAsset:C5603AQHmoyU649gm1A,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_800_800)', 'authorizationMethod': 'PUBLIC', 'data': {'com.linkedin.digitalmedia.mediaartifact.StillImage': {'mediaType': 'image/jpeg', 'rawCodecSpec': {'name': 'jpeg', 'type': 'image'}, 'displaySize': {'width': 800.0, 'uom': 'PX', 'height': 800.0}, 'storageSize': {'width': 800, 'height': 800}, 'storageAspectRatio': {'widthAspect': 1.0, 'heightAspect': 1.0, 'formatted': '1.00:1.00'}, 'displayAspectRatio': {'widthAspect': 1.0, 'heightAspect': 1.0, 'formatted': '1.00:1.00'}}}, 'identifiers': [{'identifier': 'https://media-exp1.licdn.com/dms/image/C5603AQHmoyU649gm1A/profile-displayphoto-shrink_800_800/0/1528025831520?e=1626307200&v=beta&t=kjLSbDaT4EhFN0EtjgyhrNRLgQ0Zht37fJPAAUYCtws', 'index': 0, 'mediaType': 'image/jpeg', 'file': 'urn:li:digitalmediaFile:(urn:li:digitalmediaAsset:C5603AQHmoyU649gm1A,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_800_800,0)', 'identifierType': 'EXTERNAL_URL', 'identifierExpiresInSeconds': 1626307200}]}]}}, 'id': 'moX5OKsyib'}
    # user = User(first_name, last_name, email, password, role)
    # db.session.add(user)
    # db.session.commit()
    # login_user(user)
    # return user.to_dict()

    return {"name": "name"}

@auth_routes.route("/linkedInSignIn/", methods=["POST"])
def linkedInSignIn():
    data = request.json
    token = data["token"]
    sendoff = {
        "grant_type": "authorization_code",
        "code": token,
        "client_id": environ.get("CLIENT_ID"),
        "client_secret": environ.get("CLIENT_SECRET"),
        "redirect_uri": "http://localhost:3000/linkedInAuth"
    }
    launch = urlencode(sendoff).encode()
    request_send = Request("https://www.linkedin.com/oauth/v2/accessToken", data=launch)
    response = urlopen(request_send)
    response2 = response.read().decode("utf-8")
    parsed_response = loads(response2)
    access_token = parsed_response["access_token"]
    # get email to log in
    request_user_info = Request("https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))", headers={"Authorization": f"Bearer {access_token}"})
    user_response = urlopen(request_user_info)
    user_response2 = user_response.read().decode("utf-8")
    parsed_response2 = loads(user_response2)
    email = parsed_response2["elements"][0]["handle~"]["emailAddress"]
    user = User.query.filter(User.email == email).first()
    login_user(user)
    return user.to_dict()
