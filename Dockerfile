FROM mhart/alpine-node:6.9.5

# Add dumb-init for safely handling signals
ADD https://github.com/Yelp/dumb-init/releases/download/v1.1.1/dumb-init_1.1.1_amd64 /usr/local/bin/dumb-init
# Make dumb-init executable.
RUN chmod +x /usr/local/bin/dumb-init

# Creates a non-root-user.
RUN addgroup -S yengas && adduser -S -g yengas yengas
# Sets the HOME environment variable.
ENV HOME=/home/yengas

# Update and Upgrade dependencies.
RUN apk update && apk upgrade

WORKDIR $HOME/ms

# Install dependencies.
ADD package.json .
RUN npm install --production

# Make everything in the home directory belong to yengas user.
RUN chown yengas:yengas -R $HOME/*

# Execute everything below this as the yengas user for security reasons.
USER yengas

# Add project code.
ADD ./bin ./bin
ADD ./src ./src

# Start with dumb-init for safely handling signals.
CMD ["dumb-init", "node", "bin/index.js"]
