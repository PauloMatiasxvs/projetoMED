class Config:
    SQLALCHEMY_DATABASE_URI = "postgresql://meduser:medsenha@localhost/projetoMED"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = "supersecretkey"
