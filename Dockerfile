FROM node:18.12.0-alpine3.16

# Install Redis
# RUN apk --no-cache add redis

# evaluate path, example WORKDIR /app
WORKDIR /usr/src/apps/backoffice

ADD package.json .
ADD package-lock.json .
ADD lib lib
ADD .env .env

RUN npm ci --omit=dev
RUN mkdir logs
RUN mkdir data


# Expose the desired port (e.g., 3000)
# EXPOSE 3000

# Start Redis and the Node.js application
# CMD ["sh", "-c", "redis-server --appendonly yes --dir /data & node lib/index.js >> logs/chatserver.log 2>&1"]
CMD node lib/index.mjs 3000

# docker build -t chat-server .
# docker run -d -p 3000:3000 -v $(pwd)/data:/data -v $(pwd)/logs:/logs -it chat-server
# docker run -p 3000:3000 -v $(pwd)/logs:/logs -it chat-server

# docker run -d -p 3000:3000 -v $(pwd)/data:/data -it chat-server
# or
#  nohup docker docker run -d -p 3000:3000 -v $(pwd)/data:/data -it chat-server  2>&1 >> logs/chatserver.log &