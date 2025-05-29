# Development
FROM node:20-alpine AS development

WORKDIR /home/node

USER node
ENV NODE_ENV=development

# Set global npm dependencies to be stored under the node user directory
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

ARG PORT=3011
ENV PORT=${PORT}

# Default connection settings (can be overridden at runtime)
ARG DEFAULT_CONNECTION_STRING=""
ARG DEFAULT_QUEUE_OR_TOPIC_NAME=""
ARG DEFAULT_SUBSCRIPTION_NAME=""
ENV DEFAULT_CONNECTION_STRING=${DEFAULT_CONNECTION_STRING}
ENV DEFAULT_QUEUE_OR_TOPIC_NAME=${DEFAULT_QUEUE_OR_TOPIC_NAME}
ENV DEFAULT_SUBSCRIPTION_NAME=${DEFAULT_SUBSCRIPTION_NAME}

EXPOSE ${PORT}
COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node ./app ./app
CMD [ "npm", "run", "start:watch" ]

# Production
FROM development AS production
ENV NODE_ENV=production
RUN npm ci
CMD [ "node", "app" ]
