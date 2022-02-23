FROM node:latest

# Create app directory
WORKDIR /usr/src/webapp

# # Copy source code to /src/webapp in container
COPY package*.json /usr/src/webapp

# Install app and dependencies into /src/webapp in container
RUN cd /usr/src/webapp; npm install

# Copy source code to /src in container
COPY . /usr/src/webapp

# Document the port the app listens on
EXPOSE 3000

# Run this command (starts the app) when the container starts
CMD cd /usr/src/webapp && node ./server.js