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

    def AddAccount(self, accountNumber, userId, bankId, balance, points, expiry, rate, username):
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
    __tablename__ = 'banks'
    bankId = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    logoURL = db.Column(db.String(2048))

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
    __tablename__ = 'products'
    productId = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    bankId = db.Column(db.Integer)
    originalPrice = db.Column(db.String(32))
    saleOngoing = db.Column(db.Integer)
    salePrice = db.Column(db.Integer)
    saleEnd = db.Column(db.String(128))
    imageURL = db.Column(db.String(2048))

    def define(self, product):
        self.productId = product['productId']
        self.name = product['name']
        self.bankId = product['bankId']
        self.originalPrice = product['originalPrice']
        self.saleOngoing = product['saleOngoing']
        self.salePrice = product['salePrice']
        self.saleEnd = product['saleEnd']
        self.imageURL = product['imageURL']

    def getData(self):
        print(self.imageURL)
        print(self.saleEnd)
        return {
            'productId': self.productId,
            'name': self.name,
            'bankId': self.bankId,
            'originalPrice': self.originalPrice,
            'saleOngoing': self.saleOngoing,
            'salePrice': self.salePrice,
            'saleEnd': self.saleEnd,
            'imageURL': self.imageURL
        }

    def __repr__(self):
        return str(self.productId)

    def __unicode__(self):
        return str(self.productId)

class Promotion(db.Model):
    __tablename__ = 'promotions'
    promotionId = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256))
    bankId = db.Column(db.Integer)
    description = db.Column(db.String(4096))

    def define(self, promotion):
        self.promotionId = promotion['promotionId']
        self.name = promotion['name']
        self.bankId = promotion['bankId']
        self.description = promotion['description']

    def getData(self):
        print(self.imageURL)
        print(self.saleEnd)
        return {
            'promotionId': self.promotionId,
            'name': self.name,
            'bankId': self.bankId,
            'dscription': self.description
        }

    def __repr__(self):
        return str(self.promotionId)

    def __unicode__(self):
        return str(self.promotionId)

class ProductTransaction(db.Model):
    __tablename__ = 'product_transactions'
    transactionId = db.Column(db.Integer, primary_key=True)
    accountId = db.Column(db.Integer)
    productId = db.Column(db.Integer)

    def getData(self):
        return {
            'transactionId': self.transactionId,
            'accountId': self.accountId,
            'productId': self.productId
        }

    def __repr__(self):
        return str(self.transactionId)

    def __unicode__(self):
        return str(self.transactionId)

class Stock(db.Model):
    __tablename__ = 'stocks'
    stockId = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256))
    price = db.Column(db.Float)

    def define(self, stock):
        self.stockId = stock['stockId']
        self.name = stock['name']
        self.price = stock['price']

    def getData(self):
        return {
            'stockId': self.stockId,
            'name': self.name,
            'price': self.price,
        }

    def __repr__(self):
        return str(self.name)

    def __unicode__(self):
        return str(self.name)

class StockTransaction(db.Model):
    __tablename__ = 'stock_transactions'
    transactionId = db.Column(db.Integer, primary_key=True)
    accountId = db.Column(db.Integer)
    stockId = db.Column(db.Integer)
    units = db.Column(db.Integer)

    def define(self, stockTransaction):
        self.transactionId = stockTransaction['transactionId']
        self.accountId= stockTransaction['accountId']
        self.stockId = stockTransaction['stockId']
        self.units = stockTransaction['units']

    def getData(self):
        return {
            'transactionId': self.transactionId,
            'accountId': self.accountId,
            'stockId': self.stockId,
            'units': self.units,
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