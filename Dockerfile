#
# STAGE 1: BUILD
#
FROM node:14 as build

# Copy files
RUN mkdir /app
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
COPY . /app

# install dependencies
RUN yarn install

# Run unit tests
#RUN yarn run test:prod

# Build for production
RUN yarn run build

#
# STAGE 2: EXPOSE
#
FROM node:14 as expose

WORKDIR /app
COPY api/package.json ./
COPY api/bin/www ./bin/www
COPY api/yarn.lock ./
COPY api/data.json ./
COPY api/index.js ./
COPY --from=build /app/build ./build

RUN yarn install

EXPOSE 8080
CMD [ "node", "bin/www" ]
