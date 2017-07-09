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
	   	'/api/addStocks' : 'Add some random hardcoded stocks',
	   	'/api/buyStocks' : 'Make account 1 purchase 2 units of stock 1',
	   	'/api/banks': "all banks #cant be bothered yet",
	   	'/api/banks/<username> #cant be bothered yet': 'account of users',
	   	'/api/all' : 'Return everything',
	   	'/api/clear': 'Clear all tables completely',
	   	'/api/addUsers/{n : n < 200}': 'Add n bullshit users',
		'/api/addBanks': 'Add the main banks',
	   	'/api/addProducts': 'Add mock products',
	   	'/api/addPromotions': 'Add mock products',
	    '/api/addAccounts': 'Generate a random number of accounts (a : 0 < a <= numBanks) for every user',
	    '/api/allForUser': 'Return everything for a given user',
	   	'/api/accounts/<accountNumber>' : 'details of account number',
	   	'/login/<username>/<password>' : 'gives all user details',
	   	'/api/adduser/<username>/<email>/<phone_number>/<password>/' : 'AddUser api',
	   	'/api/accounts/<accountNumber>/<userid>/<bankId>/<balance>/<points>/<expiry>/<rate>/<username>/' : 'add acounts',
	   	'/api/populate' : '->***** RESET ENTIRE DATABASE *****<-'
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

	allacount = Account.query.filter_by(accountNumber= accountNumber).all()
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
def all():
	tables = [User, Account, Bank, Product, Stock, Promotion, ProductTransaction, StockTransaction]
	allTableEntries = [[item.getData() for item in table.query.all()] for table in tables]
	return jsonify({type(tables[i]()).__name__: allTableEntries[i] for i in range(len(tables))})

@app.route('/api/clear/')
def clear():
	tables = [User, Account, Bank, Product, Stock, Promotion, ProductTransaction, StockTransaction]
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
				},
				{
					'bankId': 5,
					'name': 'Societe General',
					'logoURL': 'http://static5.businessinsider.com/image/533404a76da8119b6ffec9cb-1200-800/chinaxijinping.jpg'
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

@app.route('/api/addProducts/')
def addProducts():
	products = [
				{
					"productId": 1,
					"name": "MacBook Pro",
					"bankId": 5,
					"originalPrice": "400,300 points",
					"saleOngoing": True,
					"salePrice": "197,800 points",
					"saleEnd": None,
					"imageURL": "https://cdn.macrumors.com/article-new/2013/09/macbookpronotouchbar.jpg"
				},
				{
					"productId": 2,
					"name": "Beats Solo3 Wireless",
					"bankId": 5,
					"originalPrice": "154,300 points",
					"saleOngoing": True,
					"salePrice": "86,800 points",
					"saleEnd": None,
					"imageURL": "https://i01.hsncdn.com/is/image/HomeShoppingNetwork/prodfull/beats-solo3-on-ear-bluetooth-wireless-headphones-d-20161018155338967~517570_alt3.jpg"
				},
				{
					"productId": 3,
					"name": "Mi Air Purifier",
					"bankId": 2,
					"originalPrice": "121,980 points",
					"saleOngoing": True,
					"salePrice": "44,000 points",
					"saleEnd": None,
					"imageURL": "https://gloimg.gearbest.com/gb/pdm-product-pic/Electronic/2017/02/10/goods-img/1487211722861779920.jpg"
				},
				{
					"productId": 4,
					"name": "Flux-bike",
					"bankId": 2,
					"originalPrice": "200,300 points",
					"saleOngoing": True,
					"salePrice": "112,140 points",
					"saleEnd": None,
					"imageURL": "http://www.opusbike.com/DATA/PRODUITIMAGE/611.jpg"
				},
				{
					"productId": 5,
					"name": "iPhone 6 + 7",
					"bankId": 1,
					"originalPrice": "121,080 points",
					"saleOngoing": True,
					"salePrice": "44,000 points",
					"saleEnd": None,
					"imageURL": "http://actualapple.com/wp-content/uploads/2016/09/afb85c35dcb5f4eaa674b99a9f19e56e.jpg"
				},
				{
					"productId": 6,
					"name": "Gillete Fusion Styler",
					"bankId": 1,
					"originalPrice": "78,000 points",
					"saleOngoing": True,
					"salePrice": "10,000 points",
					"saleEnd": "BULLSHIT_DATE",
					"imageURL": "https://static.chemistwarehouse.com.au/ams/media/pi/67314/ADD10_800.jpg"
				}
			]
	for product in products:
		newEntry = Product()
		newEntry.define(product)
		db.session.add(newEntry)
	txt = ""
	try:
		db.session.commit()
		txt = "Successfully added " + str(len(products)) + " products!"
	except:
		txt = "Failed"
	return jsonify({"result": txt})

@app.route('/api/addPromotions/')
def addPromotions():
	promotions = [
		{
			"promotionId": 1,
			"name": "Up to 8% Spending Rebate and extra vouchers",
			"bankId": 5,
			"description": u"From Jan 1, 2017 till Feb 28, 2017, shop at FORTRESS* with your Citi Credit Card to enjoy up to 8% Spending Rebate, up to 50% off selected items and extra FORTRESS Gift Vouchers△ upon Instant Redemption with Points. Plus, you can enjoy up to 24 months interest-free installment purchase. Register for the rebates now!",
			"imageURL":"54.255.134.151:5000/static/assets/ic_people.png"
		}
		,
		{
			"promotionId": 2,
			"name": "Free Tickets of G-DRAGON 2017 WORLD TOUR IN HONG KONG",
			"bankId": 2,
			"description": u"Exclusive for the 10 Citi Visa Credit Cardholders with the highest accumulative amount of Samsung Pay or Visa payWave transactions during July 1 to 20, 2017, each one will be entitled to two VIP tickets to attend the G-DRAGON 2017 WORLD TOUR <ACT III: M.O.T.T.E> IN HONG KONG concert for free. The VIP tickets are valued at HK$2,588 each and are valid for the concert on August 26, 2017 (Saturday).",
			"imageURL":"54.255.134.151:5000/static/assets/ic_see.png"
		},
		{
			"promotionId": 3,
			"name": "Enjoy 6X RewardCash all year round",
			"bankId": 1,
			"description": u"From now until 31 December 2017, you can earn 6X RewardCash at a wider range of merchants all year round and allocate your extra 5X RewardCash among your six preferred spending categories of Dining, Entertainment, Home, Lifestyle, China Spending and Overseas Spending.",
			"imageURL":"54.255.134.151:5000/static/assets/ic_sun.png"
		}
	 ]
	for promotion in promotions:
		newEntry = Promotion()
		newEntry.define(promotion)
		db.session.add(newEntry)
	txt = ""
	#try:
	db.session.commit()
	txt = "Successfully added " + str(len(promotions)) + " promotions!"
	#except:
	#txt = "Failed"
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

@app.route('/api/addStocks/')
def addStocks():
	stocks = [
		{
			'stockId': 1,
			'name': 'iShares U.S. Preferred Stock ETF',
			'price': 302.33
		},
		{
			'stockId': 2,
			'name': 'iShares Russell 1000 Value ETF',
			'price': 895.82
		},
		{
			'stockId': 3,
			'name': 'iShares Core S&P Small-Cap ETF',
			'price': 543.35
		},
		{
			'stockId': 4,
			'name': 'iShares Select Dividend ETF',
			'price': 709.75
		}
	]
	for stock in stocks:
		newEntry = Stock()
		newEntry.define(stock)
		db.session.add(newEntry)
	txt = ""
	try:
		db.session.commit()
		txt = "Successfully added " + str(len(stocks)) + " stocks!"
	except:
		txt = "Failed"
	return jsonify({"result": txt})

@app.route('/api/buyStocks/')
def buyStocks():
	transactions = [
		{
			'transactionId': 1,
			'stockId': 1,
			'accountId': 1,
			'units': 2
		}
	]
	for transaction in transactions:
		newEntry = StockTransaction()
		newEntry.define(transaction)
		db.session.add(newEntry)
	txt = ""
	try:
		db.session.commit()
		txt = "Successfully bought " + str(len(transaction)) + " stocks!"
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

@app.route('/api/populate/')
def populate():
	clear()
	addUsers()
	addBanks()
	addAccounts()
	addProducts()
	addPromotions()
	addStocks()
	buyStocks()
	return all()