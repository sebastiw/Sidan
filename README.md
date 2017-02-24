# Sidan

Installera nodejs; e.g.
```
 apt install nodejs
```

Installera npm paketen gulp, angular
```
 npm install -g gulp angular-cli
```

Installera npm
```
 npm install
 cd frontend
 npm install
```

Bygg
```
 gulp fe
```

Om man får problemet "node kan inte hittas" symlänka från nodejs.

För att byta port så sätt environment variabeln "PORT" (standard 8080).
```
 export PORT=9001
```

Om det för allförmodan inte fungerar:
```
	uppdatera nodejs till senaste version
	npm install npm typ 56 gånger
	npm install -g gulp angular-cli typ 49 gånger
```
