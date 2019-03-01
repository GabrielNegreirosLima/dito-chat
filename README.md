# Dito Chat App

Just a simple chat app built with React, Go, Websockets and Redis.


----
# Instalando e configurando o ambiente

> Instalando e testando a aplicação primeiramente em ambiente Ubuntu Linux 18.04.

## Instalando o Redis

> Baseado em [Redis](https://redis.io/topics/quickstart)

1. Primeiramente, baixar o Redis do seu site:
```bash
$ wget http://download.redis.io/redis-stable.tar.gz
```
2. Extrair o arquivo:
```bash
$ tar xvzf redis-stable.tar.gz
```
3. Entre na pasta do Redis:
```bash
$ cd redis-stable
```
4. Execute o comando make para compilar os arquivos e instalar:
```bash
$ make
```
5. Executar o comando make install como root para copiar os comandos para o diretório de binários:
```bash
$ sudo make install
```
6. Para testar se a instalação foi concluída com sucesso, execute o comando make test:
```bash
$ make test
```

Agora que a instalação foi concluída, inicia-se o Redis:
```bash
$ redis-server &
```
Pressionar *Enter* (o & e *Enter* executam o servidor em segundo plano).

----
## Instalando o Go
> Baseado em [Go Getting Started](https://golang.org/doc/install)

1. Baixar o arquivo pelo site do Go(link acima).

2. Descompactar em /usr/local com o seguinte comando:
```bash
$ sudo tar -C /usr/local -xzf go1.12.linux-amd64.tar.gz
``` 

3. Adicionar o diretório de binários na variável de ambiente PATH executando o seguinte comando:
```bash
$ export PATH=$PATH:/usr/local/go/bin
```

4. Adicionar o comando acima no final do arquivo /etc/profile para uma configuração permanente. O arquivo precisa ser aberto com permissão de root:
```bash
$ sudo vim /etc/profile
```

5. Para testar basta criar um um diretório como em $HOME/go/src/hello, e um arquivo helloworld.go dentro deste diretório com o seguinte conteúdo:
```go
package main

import "fmt"

func main() {
	fmt.Printf("hello, world\n")
}
```

6. Basta *buildar* o arquivo estando dentro do diretório e executá-lo com os seguintes comandos: 
```bash
$ go build
$ ./helloword
```

7. A saída deve se igual a:
```bash
hello, world
```
