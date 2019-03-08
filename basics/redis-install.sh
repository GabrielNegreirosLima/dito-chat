# Script for Redis installation, by Gabriel Negreiros

wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gz
cd redis-stable
make

# Insert your root password to exec this command
sudo make install

# Tests to see if was successfully completed
make test

