FROM node:16-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN apk add --no-cache python3 make g++
RUN npm rebuild bcrypt --build-from-source
RUN npm run build

FROM node:16-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./

EXPOSE 3000

CMD ["node", "dist/src/main"]
