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
	   	'/api/accounts': "all accounts",
	   	'/api/accounts/<username>' : 'account of users',
	   	'/api/banks': "all banks #cant be bothered yet",
	   	'/api/banks/<username> #cant be bothered yet': 'account of users',
	   	'/api/all' : 'Return everything',
	   	'/api/clear': 'Clear all tables completely',
	   	'/api/addUsers/{n : n < 200}': 'Add n bullshit users',
		  '/api/addBanks': 'Add the main banks',
	    '/api/addAccounts': 'Generate a random number of accounts (a : 0 < a <= numBanks) for every user',
	    '/api/allForUser': 'Return everything for a given user'
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
		    data = user[0].getData()
		    return jsonify(data)
		return jsonify({})

	data = User.query.all()

	data = [x.getData() for x in data]
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

	allAccount = Account.query.filter_by(username= username).all()
	if len(allAccount)> 0:
		data = [  x.getData() for x in allAccount]
		return jsonify(data)

	return jsonify({})


@app.route('/api/all/')
@app.route('/api/all/<username>')
def get_all(username=None):
	if(username is not None):
		print("temp")
	userData = [user.getData() for user in User.query.all()]
	accountData = [account.getData() for account in Account.query.all()]
	bankData = [bank.getData() for bank in Bank.query.all()]
	productData = [product.getData() for product in Product.query.all()]
	transactionData = [transaction.getData() for transaction in Transaction.query.all()]
	return jsonify({'users': userData, 'accounts': accountData, 'banks': bankData, 'products': productData, 'transactions': transactionData})

@app.route('/api/clear/')
def clear():
	tables = [User, Account, Bank, Product, Transaction]
	allTableEntries = [table.query.all() for table in tables]
	deletions = {type(tables[i]()).__name__ + "NumDeletions": len(allTableEntries[i]) for i in range(len(tables))}
	for tableEntries in allTableEntries:
		for entry in tableEntries:
			db.session.delete(entry)
	db.session.commit()
	return jsonify(deletions)

@app.route('/api/addUsers/')
@app.route('/api/addUsers/<number>')
def addUsers(number=None):
	txt = ""
	with open('users.json') as usersFile:
		users = json.load(usersFile)
		if number is not None:
			number = int(number)
			if number < len(users):
				users = users[:number:]
		for user in users:
			newEntry = User()
			newEntry.define(user)
			db.session.add(newEntry)
		try:
			db.session.commit()
			txt = "Successfully added " + str(len(users)) + " users!"
		except:
			txt = "Failed."
	return jsonify({"result": txt})

@app.route('/api/addBanks/')
def addBanks():
	banks = [
				{
					'bankId':1,
					'name': 'HSBC',
					'logoURL': 'https://s-media-cache-ak0.pinimg.com/originals/ff/28/8c/ff288c6e973cd6c9803b117371d27068.jpg'
				},
				{
					'bankId':2,
					'name': 'Citibank',
					'logoURL': 'http://logok.org/wp-content/uploads/2014/04/Citibank-logo.png'
				},
				{
					'bankId': 3,
					'name': 'Hang Seng Bank',
					'logoURL': 'https://content.jobsdb.com/Content/CmsContent/Logo/HK/JobsDBFiles/CompanyLogo/3071-0.gif'
				},
				{
					'bankId': 4,
					'name': 'Bank of East Asia',
					'logoURL': 'http://www.sayyestobreastfeeding.hk/wp-content/uploads/08-resize.png'
				}
			]
	for bank in banks:
		newEntry = Bank()
		newEntry.define(bank)
		db.session.add(newEntry)
	txt = ""
	try:
		db.session.commit()
		txt = "Successfully added " + str(len(banks)) + " banks!"
	except:
		txt = "Failed"
	return jsonify({"result": txt})

@app.route('/api/addAccounts/')
def addAccounts():
	numBanks = len(Bank.query.all())
	users = [user.getData() for user in User.query.all()]
	banksForUsers = [np.random.choice(numBanks, np.random.randint(1, numBanks + 1, 1)[0], replace=False) + 1 for user in users]
	numAccounts = sum([len(banks) for banks in banksForUsers])
	accountNumbersDict = {}
	while(len(accountNumbersDict) < numAccounts):
		accountNumber = ''.join([chr(num + ord('0')) for num in np.random.randint(0, 10, 16)])
		accountNumbersDict[accountNumber] = 'a'
	accountNumbersList = accountNumbersDict.keys()
	accountNum = 0
	for userNum in range(len(users)):
		for bankId in banksForUsers[userNum]:
			newEntry = Account()
			newEntry.define(
				accountNumbersList[accountNum],
				users[userNum]['userId'],
				bankId,
				float(np.random.randint(0, 10**8))/100,
				np.random.randint(0, 10**5)
			)
			db.session.add(newEntry)
			accountNum += 1
	txt = ""
	try:
		db.session.commit()
		txt = "Successfully added " + str(accountNum) + " accounts!"
	except:
		txt = "Failed"
	return jsonify({"result": txt})

@app.route('/api/allForUser/<username>')
def allForUser(username = None):
	if(username is None):
		return jsonify({})
	user = User.query.filter_by(userId = username).first().getData()
	accounts = [account.getData() for account in Account.query.filter_by(userId = username)]
	relevantBanks = [bank.getData() for bank in Bank.query.filter(Bank.bankId.in_([account['bankId'] for account in accounts])).all()]
	return jsonify({"user": user, "accounts": accounts, "relevantBanks": relevantBanks})

#     if file and allowed_file((file.filename).lower()):
#         filename = secure_filename(file.filename).lower()
#         t= file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#         return jsonify({
#         'file' : url_for('uploaded_file',filename=filename),
#         'name' : filename,
#         'ocr'  : url_for('convert_file',filename=filename),
#         'barcode' : url_for('bar_Code',filename=filename)
#         })
#     else:
#     	return(str("Error!!"))
# @app.route('/uploads/<filename>/')
# @app.route('/uploads/<filename>')
# def uploaded_file(filename):
#     return send_from_directory('/home/engineer/htdocs/stop/webapi/uploads',filename)
# @app.route('/barcode/<filename>')
# @app.route('/barcode/<filename>')
# def bar_Code(filename):
#   path = str('/home/engineer/htdocs/stop/webapi/uploads/'+filename).lower()
#   image = cv2.imread(path)
#   gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
#   gradX = cv2.Sobel(gray, ddepth = cv2.cv.CV_32F, dx = 1, dy = 0, ksize = -1)
#   gradY = cv2.Sobel(gray, ddepth = cv2.cv.CV_32F, dx = 0, dy = 1, ksize = -1)
#   # subtract the y-gradient from the x-gradient
#   gradient = cv2.subtract(gradX, gradY)
#   gradient = cv2.convertScaleAbs(gradient)
#   # blur and threshold the image
#   blurred = cv2.blur(gradient, (9, 9))
#   (_, thresh) = cv2.threshold(blurred, 225, 255, cv2.THRESH_BINARY)
#   # construct a closing kernel and apply it to the thresholded image
#   kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (21, 7))
#   closed = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)
#   # perform a series of erosions and dilations
#   closed = cv2.erode(closed, None, iterations = 4)
#   closed = cv2.dilate(closed, None, iterations = 4)
#   # find the contours in the thresholded image, then sort the contours
#   # by their area, keeping only the largest one
#   (cnts, _) = cv2.findContours(closed.copy(), cv2.RETR_EXTERNAL,
#     cv2.CHAIN_APPROX_SIMPLE)
#   c = sorted(cnts, key = cv2.contourArea, reverse = True)[0]
#   # compute the rotated bounding box of the largest contour
#   rect = cv2.minAreaRect(c)
#   box = np.int0(cv2.cv.BoxPoints(rect))
#   # draw a bounding box arounded the detected barcode and display the
#   # image
#   cv2.drawContours(image, [box], -1, (0, 255, 0), 3)
#   path = path + '_bar.png'
#   cv2.imwrite(path,image)
#   pil = Image.open(path)
#   pil = pil.convert('L')
#   width, height = pil.size
#   raw = pil.tostring()

#   # wrap image data
#   image = zbar.Image(width, height, 'Y800', raw)
#   scanner = zbar.ImageScanner()

#   # configure the reader
#   scanner.parse_config('enable')
#   # scan the image for barcodes
#   scanner.scan(image)
#   string = "result : "
#   # extract results
#   for symbol in image:
#       # do something useful with results
#       string = string + 'decoded' +  str(symbol.type) + ' symbol ' +  str(symbol.data) + "\n"
#   return str(string)


# @app.route('/convert/<filename>/')
# @app.route('/convert/<filename>')
# def convert_file(filename):
#     #path = str(app.config['UPLOAD_FOLDER']+filename)
#     path = str('/home/engineer/htdocs/stop/webapi/uploads/'+filename).lower()
#     try:
#     	image=cv.LoadImage(path, cv.CV_LOAD_IMAGE_GRAYSCALE)
#     except Exception as e :
#     	return str("Error ")+str(e)
#     api = tesseract.TessBaseAPI()
#     api.Init(".","eng",tesseract.OEM_DEFAULT)
#     api.SetPageSegMode(tesseract.PSM_AUTO)
#     tesseract.SetCvImage(image,api)
#     text=api.GetUTF8Text()
#     conf=api.MeanTextConf()
#     return jsonify({'output' : str(text)})


# @app.route('/login/<username>/<password>/')
# @app.route('/login/<username>/<password>')
# def login(username,password):
#   user = User.query.filter_by(username = username).all()
#   if len(user) > 0 :
#     data = user[0].getdata()
#     if data['password'] == password : 
#       return jsonify(data)
#     else:
#       return jsonify({})
#   else:
#     return jsonify({})

# @app.route('/product/<product>',methods = ['GET','POST'])
# def get_product_by_id(product=0):
#   good = Goods.query.filter_by(goodsid= product, delete = 0 ).all()
#   if len(good)  > 0 :
#     return jsonify(good[0].getdata())
#   else : 
#     return jsonify({})

# @app.route('/user/<userid>',methods = ['GET','POST'])
# def get_user_by_id(userid=0):
#   user = User.query.filter_by(id = userid).all()
#   if len(user) > 0 :
#     return jsonify(user[0].getdata())
#   else:
#     return jsonify({})


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