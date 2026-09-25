FROM node:24-bookworm-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --chown=node:node editor/ ./editor/
COPY --chown=node:node *.html *.css *.js *.mjs travel-stories.json ./
COPY --chown=node:node favicon.ico favicon-*.png apple-touch-icon.png site.webmanifest ./
COPY --chown=node:node assets/ ./assets/
USER node
EXPOSE 8787
CMD ["node", "editor/server.mjs"]
