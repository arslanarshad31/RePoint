from hashlib import md5
from app import db
from app import app

class User(db.Model):
    __tablename__ = 'users'

    userId = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(64))
    lastName = db.Column(db.String(64))
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    phoneNumber = db.Column(db.String(140))
    password = db.Column(db.String(200))
    uuid = db.Column(db.String(2000))
    
    def Addpeople(self,username,email,phone_number,password):
        self.username = username
        self.email = email
        self.phoneNumber = phone_number
        self.password = password

    def define(self, user):
        self.userId = user['userId']
        self.firstName = user['firstName']
        self.lastName = user['lastName']
        self.username = user['username']
        self.email = user['email']
        self.phoneNumber = user['phoneNumber']
        self.password = user['password']

    def __repr__(self):
        return '<User %r>' % (self.nickname)
    
    def getData(self):
        data = {
            'userId': self.userId,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'username' : self.username,
            'email' : self.email,
            'phoneNumber' :  self.phoneNumber,
            'password' : self.password
        }
        return data 

    def __unicode__(self):
        return (self.username)

class Account(db.Model):
    __tablename__ = 'accounts'

    accountNumber = db.Column(db.String(16), primary_key=True)
    userId = db.Column(db.Integer)
    bankId = db.Column(db.String)
    balance = db.Column(db.Float)
    points = db.Column(db.Integer)
    expiry = db.Column(db.Date)
    rate = db.Column(db.Float)
    username = db.Column(db.Float)

    def AddAccount(self, accountNumber, userid, bankId, balance, points, expiry, rate, username):
        self.accountNumber = accountNumber
        self.userId = userId
        self.bankId = bankId
        self.balance = balance
        self.points = points
        self.expiry = expiry
        self.rate = rate
        self.username = username

    def define(self, accountNumber, userId, bankId, balance, points):
        self.accountNumber = accountNumber
        self.userId = userId
        self.bankId = bankId
        self.balance = balance
        self.points = points

    def getData(self):
        return {
            'accountNumber': self.accountNumber,
            'userId': self.userId,
            'bankId': self.bankId,
            'balance': self.balance,
            'points': self.points,
        }

    def __repr__(self):
        return str(self.accountNumber)

    def __unicode__(self):
        return (str(self.accountNumber))

class Bank(db.Model):
    __tablename__ = 'bank'
    bankId = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    logoURL = db.Column(db.String(512))

    def getData(self):
        return {
            'bankId': self.bankId,
            'name': self.name,
            'logoURL': self.logoURL
        }

    def define(self, bank):
        self.bankId = bank['bankId']
        self.name = bank['name']
        self.logoURL = bank['logoURL']

    def __repr__(self):
        return str(self.name)

    def __unicode__(self):
        return str(self.name)

class Product(db.Model):
    __tablename__ = 'product'
    productId = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    bankId = db.Column(db.Integer)
    price = db.Column(db.Integer)
    promotionOngoing = db.Column(db.Integer)
    promotionPrice = db.Column(db.Integer)
    promotionEnd = db.Column(db.Date)

    def getData(self):
        return {
            'productId': self.productId,
            'name': self.name,
            'bankId': self.bankId,
            'price': self.price,
            'promotionOngoing': self.promotionOngoing,
            'promotionPrice': self.promotionPrice,
            'promotionEnd': self.promotionEnd
        }

    def __repr__(self):
        return str(self.productId)

    def __unicode__(self):
        return str(self.productId)

class Transaction(db.Model):
    __tablename__ = 'transaction'
    transactionId = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer)
    productId = db.Column(db.Integer)

    def getData(self):
        return {
            'transactionId': self.transactionId,
            'userId': self.userId,
            'productId': self.productId
        }

    def __repr__(self):
        return str(self.transactionId)

    def __unicode__(self):
        return str(self.transactionId)

'''
class Goods(db.Model):
    __tablename__ = 'goods'
    __searchable__ = ['goodsname','goodsdescription']

    goodsid = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Integer)
    pictureId =  db.Column(db.String(1400))
    longitude = db.Column(db.Float)
    latitude = db.Column(db.Float)
    goodsname = db.Column(db.String(64), index=True, unique=True)
    goodsdescription = db.Column(db.String(1400))
    address = db.Column(db.String(1400))
    userid = db.Column(db.String(1400))
    delete = db.Column(db.Integer)
    data = {}

    def GoodsInformation(self,Price,Pictureid,Longitude,Latitude,Goodsname,Goodsdescription,address,userid):
        self.pictureId = Pictureid
        self.longitude = Longitude
        self.latitude = Latitude
        self.price = Price
        self.goodsname = Goodsname
        self.goodsdescription = Goodsdescription
        self.address = address
        self.delete = 0
        self.userid = userid
    
    def getdata(self):
        data = {
            'goodsid' : self.goodsid, 
            'price' : self.price,
            'pictureName' : self.pictureId,
            'longitude' :self.longitude,
            'latitude' : self.latitude,
            'goodsName' :self.goodsname,
            'goodsDescription' :self.goodsdescription,
            'address' : self.address,
            'userid' : self.userid,
            'delete' : self.delete
        }
        return data
        
    def delete_it(self):
        self.delete = 1 

    def undo(self):
        self.delete = 0

    def __repr__(self):
        return '<Goods %r>' % (self.goodsname)

    def __unicode__(self):
        return (self.goodsname)
'''