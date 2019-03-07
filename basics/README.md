# Instalando e configurando programas secundários e dependências



<br></br>

## Python
Para garantia de instalação correta de todos os componentes corretamente, execute no __servidor de produção__:

```bash
$ sudo apt-get install python
```



<br>

## Utilitários de SSH
Para que o __servidor de produção__ seja acessado pelo __servidor de controle__ (com Ansible), segue a instalação do SSH e SSHpass:
```bash
$ sudo apt-get install ssh
$ sudo apt-get install sshpass
```

<br>
# Instalando o Redis - redis-install.sh

> Baseado em [Redis](https://redis.io/topics/quickstart)

Este script pode ser executado com: 
```bash
$ sudo ./basics/redis-install.sh
```
Cada comando do script para instalação está descrito e explicado abaixo.

1. Primeiramente, baixar o Redis do site:
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
5. Executar o comando make install comsudo apt-get install typorao root para copiar os comandos para o diretório de binários:
```bash
$ sudo make install
```
6. Para testar se a instalação foi concluída com sucesso, execute o comando make test:
```bash
$ make test
```
<br>
# Instalando o Go - go-install.sh
> Baseado em [Go Getting Started](https://golang.org/doc/install)

__ATENÇÃO!__ O script ```./basics/go-install.sh``` irá baixar a versão 1.12, para Linux amd64 (64 bits), além de apenas instalar o Go, sem o teste contido neste manual.

Este script (passo 1 ao 3)  pode ser executado com: 
```bash
$ sudo ./basics/go-install.sh
```
Cada comando do script para instalação está descrito e explicado abaixo.


1. Baixar o arquivo pelo site do Go(link acima).

2. Descompactar em ```/usr/local``` com o seguinte comando:
```bash
$ sudo tar -C /usr/local -xzf go1.12.linux-amd64.tar.gz
```

3. Adicionar o diretório de binários na variável de ambiente PATH executando o seguinte comando:
```bash
$ export PATH=$PATH:/usr/local/go/bin
```

4. Adicionar o comando acima no final do arquivo /etc/profile para uma configuração permanente. O arquivo precisa ser aberto com permissão de root:
```bash
$ sudo echo "export PATH=$PATH:/usr/local/go/bin" >> /etc/profile
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



<br>

# Configurando as variáveis de ambiente

<br>

## Backend
Para configurar as variáveis de ambiente do backend, basta executar os comandos:

```bash
$ export ALLOWED_ORIGIN=http://URL_DO_CHAT
$ export REDIS_ADDR=localhost:6379
```
Para tornar as variáveis permanentes, basta adicionar os comandos acima no final do arquivo em ```/etc/profile```.

<br>

## Frontend
As variáveis de ambiente do frontend são configuradas automaticamente, dentro do arquivo ```./frontend/.env```, na raiz da pasta frontend:
```bash
REACT_APP_BACKEND_WS=ws://localhost:8080
REACT_APP_BACKEND_URL=http://localhost:8080
PORT=80
```
