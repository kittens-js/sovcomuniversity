FROM node:20.8-alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i

FROM dependencies AS build
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build
RUN npm prune --omit=dev

FROM build AS production
WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules

CMD [ "npx", "serve", "-s", "build" ]
