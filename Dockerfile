FROM node:18 AS dependencies
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install


FROM dependencies AS build
WORKDIR /usr/src/app
COPY . .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
RUN npm run build


FROM node:lts-alpine3.18 AS deploy
WORKDIR /usr/src/app


COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/migrations ./migrations

# Expondo a porta necessária
EXPOSE 3000

# Comando de execução da aplicação
CMD ["npm", "run", "start:prod"]