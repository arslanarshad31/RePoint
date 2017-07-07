import os
from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.login import LoginManager




import sys
if sys.version_info >= (3, 0):
    enable_search = False
else:
    enable_search = True

from flask.ext.admin.contrib import sqla
from flask.ext.admin import Admin
import logging
from logging.handlers import RotatingFileHandler

app = Flask(__name__)
# app.config.from_object('config')
db = SQLAlchemy(app)




from app import views

admin = Admin(app)