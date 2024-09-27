from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean(), unique=False, nullable=False)
    name = db.Column(db.String(), unique=False, nullable=True)
    address =  db.Column(db.String(), unique=False, nullable=True)
    identification_type = db.Column(db.Enum('DNI', 'NIE', 'GC', name='identification_type'))
    identification_number = db.Column(db.Integer)

    def __repr__(self):
        return f'<User {self.email} - {self.name}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'email': self.email,
                'is_active': self.is_active,
                'is_admin': self.is_admin}


class Followers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    follower_to = db.relationship('Users', foreign_keys=[follower_id], backref=db.backref('follower_to', lazy='select'))
    following_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    following_to = db.relationship('Users', foreign_keys=[following_id], backref=db.backref('following_to', lazy='select'))
    

class Authors(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # Atributos
    name = db.Column(db.String(), unique=False, nullable=False)
    country = db.Column(db.String(), unique=False, nullable=True)
    # Relaciones
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('author_to', lazy='select'))

    def __repr__(self):
        return f'<Authors: {self.id} - {self.name}>'

    def serialize(self):
        return {'id': self.id,
                'authors': self.name,
                'country': self.country,
                'books': [row.serialize() for row in self.book_to]}


class Books(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=False, nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('authors.id'))
    author_to = db.relationship('Authors', foreign_keys=[author_id], backref=db.backref('book_to'), lazy='select')

    def __repr__(self):
        return f'<Books> {self.id} / {self.name}'

    def serialize(self):
        return {'id': self.id,
                'book': self.name}
                