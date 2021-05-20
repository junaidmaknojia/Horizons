import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


# sg = sendgrid.SendGridAPIClient(api_key=os.environ.get('SENDGRID_API_KEY'))
# from_email = Email("test@example.com")
# to_email = To("test@example.com")
# subject = "Sending with SendGrid is Fun"
# content = Content("text/plain", "and easy to do anywhere, even with Python")
# mail = Mail(from_email, to_email, subject, content)
# response = sg.client.mail.send.post(request_body=mail.get())
# print(response.status_code)
# print(response.body)
# print(response.headers)

message = Mail(
    from_email='junaidmaknojia786@gmail.com',
    to_emails='junaidmaknojia786@berkeley.edu',
    subject='Sending with Twilio SendGrid is Fun',
    html_content='<strong>and easy to do anywhere, even with Python, but not with Junaid</strong>')
try:
    sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
    response = sg.send(message)
    print(response.status_code)
    print(response.body)
    print(response.headers)
except Exception as e:
    print("this is e: ", e)
    print(e.message)
