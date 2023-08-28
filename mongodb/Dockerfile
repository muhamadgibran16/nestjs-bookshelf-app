# Dockerfile-mongodb
FROM mongo:latest

# Expose the MongoDB port
EXPOSE 27017

# Set MongoDB configuration options
# ENV MONGO_INITDB_ROOT_USERNAME=
# ENV MONGO_INITDB_ROOT_PASSWORD=

# Set the default data directory
# ENV MONGO_DATA_DIR=/data/db

# Create a directory to hold data and set appropriate permissions
# RUN mkdir -p $MONGO_DATA_DIR \
#     && chown -R mongodb:mongodb $MONGO_DATA_DIR

# Start MongoDB when the container starts
CMD ["mongod"]
