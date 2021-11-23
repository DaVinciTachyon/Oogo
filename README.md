# Oogo

# To run

In `server/` create `.env` file
```
DB_USER=databaseUser
DB_PASSWORD=thePasswordToEndAllPasswords
DB_ROOT_PASSWORD=SuperDuperSecretPassword
SECRET_PHRASE=oiewoi29873jdiuaxinjnjn
```

In a terminal:
```
cd server
sudo docker-compose up -d
npm run build
npm start
```

In a separate terminal:
```
cd website
npm run build
npm start
```

Access at `http://localhost:3000/`
