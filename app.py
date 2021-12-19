from enum import auto
import json
from os import access
from re import sub
from flask import Flask, send_from_directory, url_for, render_template, redirect, session
import flask
from flask_restful import Api, Resource, reqparse
from authlib.integrations.flask_client import OAuth
import google.oauth2.credentials
import google_auth_oauthlib.flow
import os
from googleapiclient.discovery import build
from flask_cors import CORS
from pyasn1.type.univ import Null  # comment this on deployment
from api.HelloApiHandler import HelloApiHandler 

os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'


# Use the client_secret.json file to identify the application requesting
# authorization. The client ID (from that file) and access scopes are required.
flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
    'client_secret.json',
    scopes=['https://www.googleapis.com/auth/gmail.modify', 'https://www.googleapis.com/auth/userinfo.profile', 'openid', 'https://www.googleapis.com/auth/userinfo.email'])

# Indicate where the API server will redirect the user after the user completes
# the authorization flow. The redirect URI is required. The value must exactly
# match one of the authorized redirect URIs for the OAuth 2.0 client, which you
# configured in the API Console. If this value doesn't match an authorized URI,
# you will get a 'redirect_uri_mismatch' error.
flow.redirect_uri = 'http://127.0.0.1:5000/welcome'

# Generate URL for request to Google's OAuth 2.0 server.
# Use kwargs to set optional request parameters.
authorization_url, state = flow.authorization_url(
    # Enable offline access so that you can refresh an access token without
    # re-prompting the user for permission. Recommended for web server apps.
    access_type='offline',
    # Enable incremental authorization. Recommended as a best practice.
    include_granted_scopes='true')

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app)  # comment this on deployment
api = Api(app)
app.secret_key = 'random secret'

@app.route('/flask/helloworld')
def hello_world():
    # email = dict(session).get('email', None)
    # token = dict(dict(session).get('credentials', None)).get('token', None)    
    # refToken = dict(dict(session).get('credentials', None)).get('refresh_token', None)
    return "{'resultStatus': 'yay', 'message': 'bert Smells'}"


@app.route('/login')
def login():
    authURL = authorization_url
    return f'{authURL}'
    return flask.redirect(authorization_url)

credentials = None
@app.route('/welcome')
def welcome():
    global credentials
    flow.redirect_uri = flask.url_for('welcome', _external=True)
    authorization_response = flask.request.url
    flow.fetch_token(authorization_response=authorization_response)
    credentials = flow.credentials
    print(credentials)
    session['credentials'] = {
        'token': credentials.token,
        'refresh_token': credentials.refresh_token,
        'token_uri': credentials.token_uri,
        'client_id': credentials.client_id,
        'client_secret': credentials.client_secret,
        'scopes': credentials.scopes}
    # gmail = build('gmail', 'v1', credentials=credentials)
    # mail = gmail.users().messages().list(userId= "f.martinez.6.fm6@gmail.com").execute()
    # return redirect('/emails')
    return redirect('http://localhost:3000/mail')
    return f'{mail}'

@app.route('/emails')
def getEmails():
    gmail = build('gmail', 'v1', credentials=credentials)
    mail = gmail.users().messages().list(userId="f.martinez.6.fm6@gmail.com", maxResults=10).execute()
    emails = {}
    emails['total'] = 0
    emails['emails'] = []
    for singleEmail in mail['messages']:
        msg = gmail.users().messages().get(userId="f.martinez.6.fm6@gmail.com", id=singleEmail['id']).execute()
        snippet = msg['snippet']
        fromPerson = None
        subject = None
        for headers in msg['payload']['headers']:
            if (headers['name'] == 'From'):
                fromPerson = headers['value']
            if (headers['name'] == 'Subject'):
                subject = headers['value']
        snippet = snippet.replace('\u200c', '')
        snippet = snippet.replace('\u200d', '')
        snippet = snippet.strip()
        emails['total'] += 1
        emails['emails'].append({'fromPerson': fromPerson, 'subject': subject, 'snippet': snippet})
    return f'{json.dumps(emails)}'
    
# @app.route('/authorize')
# def authorize():
#     google = oauth.create_client('google')
#     token = oauth.google.authorize_access_token()
#     print(token)
#     resp = oauth.google.get('userinfo')
#     resp.raise_for_status()
#     user_info = resp.json()
#     # do something with the token and profile
#     session['email'] = user_info['email']
#     return redirect('/')

@app.route('/logout')
def logout():
    for key in list(session.key()):
        session.pop(key)
    return redirect('/')

api.add_resource(HelloApiHandler, '/flask/hello')
