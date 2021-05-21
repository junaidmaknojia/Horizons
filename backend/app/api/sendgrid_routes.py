import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from flask import Blueprint, jsonify, request
from app.models import User, Request, db
from flask_login import current_user, login_required

sendgrid_routes = Blueprint('sendgrid', __name__)

@sendgrid_routes.route("/", methods=["POST"])
def send_email():
    data = request.json
    mentor = User.query.get(data["mentorId"])
    mentee = User.query.get(current_user.id)
    if mentor:
        message = Mail(
            from_email='junaidmaknojia786@gmail.com',
            to_emails=mentor.email,
            subject='New Request from Horizons',
            html_content = f'<strong>You have received a request from {mentee.first_name} {mentee.last_name} on Horizons.</strong>')
        try:
            sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
            response = sg.send(message)
            print(response.status_code)
            print(response.body)
            print(response.headers)
            return {"response": jsonify(response)}
        except Exception as e:
            print(e.message)
            return {"sendgrid_error": jsonify(e)}
