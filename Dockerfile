FROM node:18

# Create app directory
WORKDIR /

COPY package.json ./

COPY . .

RUN npm ci --omit=dev


EXPOSE 4001

CMD [ "node", "index.js" ]