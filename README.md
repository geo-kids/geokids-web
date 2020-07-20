# Geo Kids Web

Container that allows launching a website for the technical demo of the GeoKids game.

### Start in dev mode

```
npm run devstart
```

### Build the container
```
docker build --force-rm -t geokids/geokids-web:1.0 .
```

### Run the container
```
docker run -p 8083:8080
    \ -e DB_USER=<db_user>
    \ -e DB_PASS="<db_pass>"
    \ -e DB_HOST=<db_hostname>
    \ -e DB_PORT=<db_port> 
    \ -e DB_NAME=<db_name> 
    \ --name geokids-web -d geokids/geokids-web:1.0
```