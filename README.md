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

Om det inte fungerar:
```
	uppdatera nodejs till senaste version
	curl -sl https://deb.nodesource.com/setup_7x | sudo -E bash --
	sudo apt-get install nodejs
	npm install npm typ 56 gånger
	npm install -g gulp angular-cli typ 49 gånger
	npm cache clean -r (detta kan funka också oklart)
	Lägg även till denna rad i eran host fil:
	151.101.36.162 registry.npmjs.org
	lycka till
```

# Bibliotek och annat mojs

I CSS väg så använder vi biblioteket [milligram](https://milligram.io/)

# Kod

Frontend med design och shiet i `./frontend/`
Backend med modeller och databaskoppling i `./backend/`

Routes (vilka Rest-APIer man kan använda för att få ut information):
- Backend i.e. `/json/<app>` e.g. `/json/poll` finns i `backend/routes/<app>.js`
(definierat i `backend/server.js`)
- Frontend e.g. `/write` finns definierade i `frontend/src/app/app.module.ts`
