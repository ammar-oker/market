#
# STAGE 1: BUILD
#
FROM node:14-alpine as build

# Copy files
RUN mkdir /app
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
COPY . /app

# install dependencies
RUN yarn install

# Run unit tests
RUN yarn run test:prod

# Build for production
RUN yarn run build

#
# STAGE 2: EXPOSE
#
FROM nginx:1.21.0-alpine as expose

COPY --from=build /app/build /usr/share/nginx/html
