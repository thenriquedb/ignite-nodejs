# Imagem que será utilizada
FROM node

# Diretório onde sera salvo
WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm","run","dev"]