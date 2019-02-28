# Dito Chat App

Just a simple chat app built with React, Go, Websockets and Redis.


----
# Instalando e configurando o ambiente

> Instalando e testando a aplicação primeiramente em ambiente Ubuntu Linux 18.04.

## Instalando o Redis

> Baseado em [Redis] (https://redis.io/topics/quickstart)

1. Primeiramente, baixar o Redis do seu site:
```bash
wget http://download.redis.io/redis-stable.tar.gz
```
2. Extraia o arquivo:
```bash
tar xvzf redis-stable.tar.gz
```
3. Entre na pasta do Redis:
```bash
cd redis-stable
```
4. Execute o comando make para compilar os arquivos e instalar:
```bash
make
```
5. Execute o comando make install para copiar os comandos para o diretório de binários:
```bash
make install
```

----