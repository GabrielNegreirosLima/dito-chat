# Script for Go Language installation, by Gabriel Negreiros

wget https://dl.google.com/go/go1.12.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.12.linux-amd64.tar.gz

# Type your root password and press Enter
sudo echo "export PATH=$PATH:/usr/local/go/bin" >> /etc/profile
