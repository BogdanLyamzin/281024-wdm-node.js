FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm i --production
EXPOSE 3000
CMD ["npm", "start"]