FROM node:18.15-alpine3.17 as base


WORKDIR /app
COPY ./ ./
RUN npm install --silent

FROM base as dev
ENV NODE_ENV=development
RUN npm cache clean --force
# RUN npm config set cache /app/logs --global
# RUN npm audit fix
USER root
CMD ["npm", "run", "start-dev"]