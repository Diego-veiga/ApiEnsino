FROM node:16-alpine
WORKDIR /src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3333
CMD ["node", "dist/shared/infra/http/server.js"]
