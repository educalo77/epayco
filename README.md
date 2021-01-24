# ePayco

## Insrtuctions

https://epayco-vercel.vercel.app/signin (mailgun not working at Heroku)

1- install dependencies inside client / server / soap

2 - create .env environment variables inside client / server / soap folders.

3- .env inside client should contain the following line: REACT_APP_API= http://localhost:3001 

4- .env inside server and in soap folders should contain the following lines:

EMAIL_SECRET = cat123

PG_USER = your user_name in postgres
  
PG_PASSWORD = your upassword in postgres
  
PG_HOST = localhost

PG_PORT = 5432

PG_DATABASE = your db_name you have created in postgres
  
MAILGUN_API_KEY = your mailgun's api_key

MAILGUN = your mailgun's domain

5- run npm start on client / server / soap

6- register / sign in / recharge / pay / recieve a mail to confirm payment / re-confirm.
