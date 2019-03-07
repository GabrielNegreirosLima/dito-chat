# Dito Chat App

Just a simple chat app built with React, Go, Websockets and Redis.

## Mudanças para implementação do projeto

### Frontend

Para uma abstração maior das variáveis de ambiente no frontend, e evitar configurações posteriores, tanto na plataforma de integração quanto no ambiente de produção, foi criado o arquivo ```./frontend/.env```. Desta forma a aplicação têm melhor escalabilidade com relação às variáveis de ambiente, sendo incluídas no arquivo pelo programador. Este arquivo é procurado pelos ambientes de produção, teste e desenvolvimento, porém __as variáveis configuradas no terminal ou no sistema operacional têm precedência__.
Nele, observa-se as variáveis de ambiente detalhadas no README do diretório ```./frontend```, além de uma variável que instrui o projeto à usar a porta padrão 80:

```
REACT_APP_BACKEND_WS=ws://localhost:8080
REACT_APP_BACKEND_URL=http://localhost:8080
PORT=80
```

----
# Instalando e configurando o ambiente

> Instalando e testando a aplicação primeiramente em ambiente Ubuntu Linux 18.04. Os scripts em Shell estão dentro do diretório ./basics.

## Instalando o Redis - redis-install.sh

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
5. Executar o comando make install como root para copiar os comandos para o diretório de binários:
```bash
$ sudo make install
```
6. Para testar se a instalação foi concluída com sucesso, execute o comando make test:
```bash
$ make test
```

----
## Instalando o Go - go-install.sh
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

----

## Configurando as variáveis de ambiente

### Backend
Para configurar as variáveis de ambiente do backend, basta executar os comandos:
```bash
$ export ALLOWED_ORIGIN=http://URL_DO_CHAT
$ export REDIS_ADDR=localhost:6379
```
Para tornar as variáveis permanentes, basta adicionar os comandos acima no final do arquivo em ```/etc/profile```.

### Frontend
As variáveis de ambiente do frontend são configuradas automaticamente, dentro do arquivo ```./frontend/.env```, na raiz da pasta frontend:
```bash
REACT_APP_BACKEND_WS=ws://localhost:8080
REACT_APP_BACKEND_URL=http://localhost:8080
PORT=80
```



----
# Integração contínua com Travis CI

Para executar a suíte de testes do frontend a cada _push_ do desenvolvedor, foi utilizado o Travis CI. O Travis CI foi escolhido por ser uma plataforma online, de fácil utilização e gratuíta. Além disto, o Travis CI não exige nenhuma configuração local, e as únicas configurações necessárias são feitas no arquivo ```.travis.yml``` que se localizará na raiz do projeto. O link para este projeto na plataforma [pode ser encontrado aqui](https://travis-ci.org/GabrielNegreirosLima/dito-chat), ou no link abaixo: 

> https://travis-ci.org/GabrielNegreirosLima/dito-chat

Na plataforma pode-se perceber cada tentativa de _building_, temos um novo item em _Build History_, que pode ser acessado para obtenção de informações.

O arquivo ```./.travis.yml``` detêm as configurações necessárias para que a os testes do frontend sejam executados corretamente no ambiente, dado que os requisitos já são cumpridos durante o processo de teste (como variáveis de ambiente, que agora são configuradas em ```./frontend/.env```).


O arquivo ```./.travis.yml``` pode ser encontrado abaixo:

```yaml
# Linguagem a ser executada
language: node_js

# Versao do Node
node_js:
  - stable

# Pasta a ser cacheada
cache:
  directories:
    - node_modules

# Comando a ser executado antes dos scripts de teste
before_script:
  - cd frontend/

# Instalacao das dependencias e execucao da suite de testes
script:
  - npm install
  - npm test
```

----

# *Deploy* contínuo com Ansible

O processo de _deploy_ contínuo pode ser implementado por meio de um serviço, em que com poucos (ou apenas um), pode-se colocar a aplicação em produção. Para este projeto, foi escolhido a ferramenta Ansible, por ser de fácil codificação, leitura e ter uma documentação vasta e bem escrita, além de ser uma ferramenta OpenSource de fácil instalação, leve e independente de outros softwares .

Abaixo está descrito passo a passo as decisões de implementação e as configurações do Ansible para este projeto.

## Instalação do Ansible

> Usaremos outro ambiente Ubuntu 18.04 para simular um servidor de controle, que executará o Ansible. O Ansible é uma ferramenta que exige poucos recursos, portanto não é necessário um servidor dedicado a isto, porém o ideal é que este não seja o mesmo servidor de aplicação.

O processo de instalação é simples, seguido pelo script ```./basics/ansible-install.sh```:
```bash
# Permissão de root e instalação
$ sudo apt-get install ansible -y

# Para testar e ver a versão
$ ansible --version
```

## Arquivos de configuração do projeto

Basicamente os arquivos de configuração são ```./deploy/ansible.cfg``` e ```./deploy/hosts```.

O arquivo ```./deploy/ansible.cfg``` diz quais são os _inventories_, listas de configuração do Ansible:
```bash
# Arquivo ./deploy/ansible.cfg
[defaults]

inventory = ./hosts
```

O arquivo ```./deploy/hosts``` informa traduz nomes para IPs como facilitador para uso do Ansible, além disto este arquivo pode trazer configurações com usuário e senha de SSH para ser acessado:
```bash
# Arquivo ./deploy/hosts
[ditochat]

192.168.1.11 ansible_user=ubuntu ansible_password=yourpassword
```

## *Playbook*

O playbook é um arquivo baseado na linguagem YAML que executará nossas tarefas de deploy, o Ansible se encarregará de executar o script com todos os passos para que o projeto seja clonado do GitHub,  copiado para seu diretório em produção, e que o serviço de web seja reiniciado.

----