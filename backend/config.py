class Config:
    SQLALCHEMY_DATABASE_URI = "postgresql://user:password@localhost/projetoMED"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = "supersecretkey"
