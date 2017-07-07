import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager




import sys
if sys.version_info >= (3, 0):
    enable_search = False
else:
    enable_search = True
    import flask_whooshalchemy as whooshalchemy

from flask_admin.contrib import sqla
from flask_admin import Admin
import logging
from logging.handlers import RotatingFileHandler


app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy(app)




from app import views
from models import * 

admin = Admin(app)

class FlaskAdminView(sqla.ModelView):
    column_display_pk = True
    column_display_pk = True


## Admin panel
admin.add_view(FlaskAdminView(User, db.session))
admin.add_view(FlaskAdminView(Goods, db.session))
whooshalchemy.whoosh_index(app, Goods)