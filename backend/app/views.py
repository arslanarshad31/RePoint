#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import render_template, flash, redirect, session, url_for, request
from flask import jsonify
from datetime import datetime
from app import app, db

from werkzeug import secure_filename
import os 
from flask import Flask, render_template, request, redirect, url_for, send_from_directory


import json
import sys
from bs4 import BeautifulSoup
import requests
import json
import numpy as np
from models import *


@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
def index():
   return jsonify({
	   	'/api/' : '/endpoints/',
	   	'/api/users': "all users",
	   	'/api/users/<username>': 'for this user',
	   	'/api/accounts/<username>' : 'account of users',
	   	'/api/accounts/<accountNumber>' : 'details of account number',
	   	'/login/<username>/<password>' : 'gives all user details',
	   	'/api/adduser/<username>/<email>/<phone_number>/<password>/' : 'AddUser api',
	   	'/api/accounts/<accountNumber>/<userid>/<bankId>/<balance>/<points>/<expiry>/<rate>/<username>/' : 'add acounts'

   })

@app.route('/api/users/')
@app.route('/api/users/uuid/<uuid>')
def get_user_by_uuid(uuid=None):
	
	if uuid is not None:
		user = User.query.filter_by(uuid = uuid).all()
		if len(user) > 0 :
		    data = user[0].getdata()
		    return jsonify(data)
		return jsonify({})

	data = User.query.all()

	data = [x.getdata() for x in data]
	return jsonify(data)

@app.route('/api/users/')
@app.route('/api/users/<username>')
def get_user(username=None):
	
	if username is not None:
		user = User.query.filter_by(username = username).all()
		if len(user) > 0 :
		    data = user[0].getdata()
		    return jsonify(data)
		return jsonify({})

	data = User.query.all()

	data = [x.getdata() for x in data]
	return jsonify(data)


@app.route('/api/accounts/')
@app.route('/api/accounts/<accountNumber>')
def get_account_number_for_account(accountNumber=None):
	if accountNumber is None :
		return jsonify({})

	allacount = Accounts.query.filter_by(accountNumber= accountNumber).all()
	if len(allacount)> 0:
		data = [  x.getdata() for x in allacount]
		return jsonify(data)

	return jsonify({})

@app.route('/api/accounts/')
@app.route('/api/accounts/<username>')
def get_username_for_account(username=None):
	if username is None :
		return jsonify({})

	allacount = Accounts.query.filter_by(username= username).all()
	if len(allacount)> 0:
		data = [  x.getdata() for x in allacount]
		return jsonify(data)

	return jsonify({})

@app.route('/login/<username>/<password>/')
@app.route('/login/<username>/<password>')
def login(username,password):
  user = User.query.filter_by(username = username).all()
  if len(user) > 0 :
    data = user[0].getdata()
    if data['password'] == password : 
      return jsonify(data)
    else:
      return jsonify({})
  else:
    return jsonify({})


@app.route('/api/adduser/<username>/<email>/<phone_number>/<password>/')
def add_user(username,email,phone_number,password):
  user = User()
  user.Addpeople(username,email,phone_number,password)
  try:
    db.session.add(good)
    db.session.commit()
    return jsonify(good.getdata())
  except Exception as e:
    return jsonify({'status' : 'Error'})


@app.route('/api/accounts/<accountNumber>/<userid>/<bankId>/<balance>/<points>/<expiry>/<rate>/<username>/')
def add_accounts(accountNumber, userid, bankId, balance, points, expiry, rate, username):

  account = Account()
  account.AddAccount(accountNumber, userid, bankId, balance, points, expiry, rate, username)
  try:
    db.session.add(account)
    db.session.commit()
    return jsonify(account.getdata())
  except Exception as e:
    return jsonify({'status' : 'Error'})


# @app.route('/delete/accounts/<accountNumber>')
# def delete(accountNumber= None):
#   if product is None :
#     return jsonify({'status' : 'error'})
#   else:
#     db.session.flush()
#     product= product.split(';')
#     lis = []
#     print product
#     for i in product:
#       try:
#         obj = Goods.query.filter_by(goodsid = i).first()
#         obj.delete_it()
#         sql = str('update goods set `delete` = 1 where `goodsid` ='+str(i)+'')
#         result = db.engine.execute(sql)
#         lis.append(obj.goodsname)
#         db.session.commit()
#       except Exception as e:
#         print e
#         pass
#     db.session.flush()
#     return jsonify({'status' : str(list(set(lis)))})

# @app.route('/undo/<product>')
# @app.route('/undo/<product>/')
# def undo(product= None):
#   if product is None :
#     return jsonify({'status' : 'error'})
#   else:
#     db.session.flush()
#     product= product.split(';')
#     lis = []
#     print product
#     for i in product:
#       try:
#         obj = Goods.query.filter_by(goodsid = i).first()
#         obj.delete_it()
#         sql = str('update goods set `delete` = 0 where `goodsid` ='+str(i)+'')
#         result = db.engine.execute(sql)
#         lis.append(obj.goodsname)
#         db.session.commit()
#       except Exception as e :
#         print e
#         pass
#     db.session.flush()
#     return jsonify({'status' : str(list(set(lis)))})


# def to_stripped_string(sentence):
#   data = " ".join(sentence.split())
#   return data

# @app.route('/register/<username>/<email>/<phone_number>/<password>/')
# @app.route('/register/<username>/<email>/<phone_number>/<password>')
# def register(username,email,phone_number,password):
# 	user = User()
# 	user.Addpeople(to_stripped_string(username),to_stripped_string(email),to_stripped_string(phone_number),to_stripped_string(password))
# 	try :	
# 		db.session.add(user)
# 		db.session.commit()
# 		return jsonify(user.getdata())
# 	except :
# 		return jsonify({'Status': 'Error'})

# @app.route('/get/<userid>')
# @app.route('/get/<userid>/')
# def get_added_good(userid):
#   lis = []
#   if userid is None: 
#     return jsonify({'status' : 'error'})
#   goods = Goods.query.filter_by(userid = userid).all()
#   for i in goods : 
#     if i.delete == 0 :
#       lis.append(i.getdata())
#   return jsonify({"objects" : lis})

# @app.route('/AddProduct/<Price>/<Pictureid>/<Longitude>/<Latitude>/<Goodsname>/<Goodsdescription>/<address>/<userid>')
# @app.route('/AddProduct/<Price>/<Pictureid>/<Longitude>/<Latitude>/<Goodsname>/<Goodsdescription>/<address>/<userid>/')
# def add_good(Price,Pictureid,Longitude,Latitude,Goodsname,Goodsdescription,address,userid):
#   url = "https://maps.googleapis.com/maps/api/geocode/json?address="+str(address)+"&key=AIzaSyCkWUIO4p6JAfGC4NkQJDRtX87BPVx4kBM"
#   try:
#       r = requests.get(url)
#       data = dict(json.loads(r.text))
#       Latitude = data['results'][0]['geometry']['location']['lat']
#       Longitude = data['results'][0]['geometry']['location']['lng']
#       print data, Latitude,Longitude,url
#   except Exception as e:
#       print e
#       pass

#   good = Goods()
#   good.GoodsInformation(Price,Pictureid,Longitude,Latitude,Goodsname,Goodsdescription,address,userid)
#   try:
#     db.session.add(good)
#     db.session.commit()
#     return jsonify(good.getdata())
#   except Exception as e:
#     return jsonify({'status' : 'Error'})



# @app.route('/search/<keyword>', methods=['GET'])
# @app.route('/search/<keyword>/', methods=['GET'])
# def search(keyword=None):
#     data = []
#     if data is not None:
#         result = Goods.query.whoosh_search(keyword).all()
#         for obj in result:
#             data.append(obj.getdata())
#     return jsonify({'objects' : data})

# @app.route('/getpath/<cord>', methods=['GET'])
# @app.route('/getpath/<cord>/', methods=['GET'])
# def route(cord = None):
#   try:
#     cord = str(cord)
#     cord = cord.split(";")
#     start = cord[0]
#     end = cord[len(cord)-1]
#     cord.pop(0)
#     cord.pop(len(cord)-1)
#     start = str(start)
#     end   = str(end)
#     string = ""

#     for i in cord:
#       string = string+","+i

#     string = string[1:]

#     key = "AIzaSyCkWUIO4p6JAfGC4NkQJDRtX87BPVx4kBM"
#     url = "https://maps.googleapis.com/maps/api/directions/json?origin="
#     url = url + start+'&destination='+end+'&waypoints=optimize:true|'+string+'&key='
#     url = url +key
#     r = requests.get(url)
#     data = dict(json.loads(str(r.content)))
#     data['url'] = url
#     if data['status'] == 'ZERO_RESULTS' or data['status'] == 'NOT_FOUND':
#       return jsonify(data)
#     string  = ""
#     da = {}

#     steps = {}
#     keys = []
#     for objects in data['routes']:
#       for key,value in objects.items():
#         if key =="legs":
#           da[key] = value
#           for dic in value:
#             dic = dict(dic)
#             for key,value in dic.items():
#               steps[key] = value
#     count = 1
#     data = {}
#     final = {}
#     list_keys = ['distance','duration','start_location','end_location','html_instructions']

#     for objects in steps['steps']:
#       data[count] = objects
#       final[count] = {}
#       for key,value in data[count].items():
#         if key in list_keys:
#           final[count][key] = value  

#       count = count + 1 
#     final['length'] = count - 1
#   except:
#     final = {}
#     final['status'] = 'ZERO_RESULTS'
#     final['length'] = 0
#   return jsonify(final)