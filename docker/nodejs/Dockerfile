ARG NODE_IMAGE=node:16-alpine

#First Stage
FROM $NODE_IMAGE AS base
# RUN apk --no-cache add dumb-init
RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
USER node
RUN mkdir tmp

#Second Stage
FROM base AS dependencies
COPY --chown=node:node source/package.json ./
RUN npm i
COPY --chown=node:node source/ ./

#Dev Stage
FROM dependencies AS devstage
CMD ["npm", "run", "dev"]
EXPOSE 3333

# #Build Stage
# FROM dependencies AS buildstage
# RUN node ace build --production