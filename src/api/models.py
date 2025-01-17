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
                'is_admin': self.is_admin,
                'post_to': [row.serialize() for row in self.post_to],
                'favorite_character_to': [row.serialize() for row in self.favorite_characters_to],
                'favorite_planets_to': [row.serialize() for row in self.favorite_planets_to]}


class Followers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    follower_to = db.relationship('Users', foreign_keys=[follower_id], backref=db.backref('follower_to', lazy='select'))
    following_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    following_to = db.relationship('Users', foreign_keys=[following_id], backref=db.backref('following_to', lazy='select'))


class Characters(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    height = db.Column(db.String(10), nullable=False)
    mass = db.Column(db.String(10), nullable=False)
    eye_color = db.Column(db.String())
    hair_color = db.Column(db.String())
    skin_color = db.Column(db.String)
    birth_year = db.Column(db.String, nullable=False)
    gender = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f'<Characters {self.name}>'

    def serialize(self):
        return {"id": self.id,
                "name": self.name,
                "eye_color": self.eye_color,
                "hair_color": self.hair_color,
                'skin_color': self.skin_color,
                'height': self.height,
                'mass': self.mass,
                'birth_year': self.birth_year,
                'gender': self.gender}  


class Planets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<Planets {self.name}>'

    def serialize(self):
        return {"id": self.id,
                "name": self.name}


class FavouriteCharacters(db.Model):
    __tablename__ = "favorite_characters"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('favorite_characters_to'), lazy='select')
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'), nullable=False)
    character_to = db.relationship('Characters', foreign_keys=[character_id], backref=db.backref('favorite_to'), lazy='select')

    def __repr__(self):
        return f'<FavouritesCharacters {self.id}>'

    def serialize(self):
        return {"id": self.id,
                "user_id": self.user_id,
                "character_id": self.character_id}



class FavouritePlanets(db.Model):
    __tablename__ = "favorite_planets"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('favorite_planets_to'), lazy='select')
    planet_id = db.Column(db.Integer, db.ForeignKey('planets.id'), nullable=False)
    planet_to = db.relationship('Planets', foreign_keys=[planet_id], backref=db.backref('favorite_to'), lazy='select')

    def __repr__(self):
        return f'<FavouritesPlanets {self.id}>'
    
    def serialize(self):
        return {"id": self.id,
                "user_id": self.user_id,
                "planet_id": self.planet_id}


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    user = db.relationship('Users', backref=db.backref('comments', lazy=True))
    post = db.relationship('Posts', backref=db.backref('comments', lazy=True))

    def __repr__(self):
        return f'<Comment {self.body[:20]}>'                 


class Medias(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Enum('image', 'video', name='media_type'), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    post = db.relationship('Posts', backref=db.backref('media', lazy=True))

    def __repr__(self):
        return f'<Media {self.type} - {self.url}>'


class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    body = db.Column(db.String(120), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('post_to'), lazy='select')
    image_url = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<Post> {self.id} / {self.name}'

    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'title': self.title,
                'description': self.description,
                'body': self.body,
                'date': self.date,
                'user_id': self.user_id,
                'image_url': self.image_url,
                'medias_to': [row.serialize() for row in self.medias_to]}
