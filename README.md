# Dito Chat App

Just a simple chat app built with React, Go, Websockets and Redis.


__ATENÇÃO! Considere como servidor de aplicação o servidor que irá hospedar o chat. Como servidor de controle, será o servidor usado para executar o Ansible!__

## Mudanças para implementação do projeto

### Frontend

Para uma abstração maior das variáveis de ambiente no frontend, e evitar configurações posteriores, tanto na plataforma de integração quanto no ambiente de produção, foi criado o arquivo ```./frontend/.env```. Desta forma a aplicação têm melhor escalabilidade com relação às variáveis de ambiente, sendo incluídas no arquivo pelo programador. Este arquivo é procurado pelos ambientes de produção, teste e desenvolvimento, porém __as variáveis configuradas no terminal ou no sistema operacional têm precedência__.
Nele, observa-se as variáveis de ambiente detalhadas no README do diretório ```./frontend```, além de uma variável que instrui o projeto à usar a porta padrão 80:

```
REACT_APP_BACKEND_WS=ws://localhost:8080
REACT_APP_BACKEND_URL=http://localhost:8080
PORT=80
```

<br>

# Instalando e configurando o ambiente de produção

> Instalando e testando a aplicação primeiramente em ambiente Ubuntu Linux 18.04. Os scripts em Shell estão dentro do diretório ./basics.

A descrição detalhada da instalação das depêndencias e configuração do __ambiente de produção__ pode ser encontrada no diretório ```./basics``` e seu [README.md]().

<br>

# Integração contínua com Travis CI

Para executar a suíte de testes do frontend a cada _push_ do desenvolvedor, foi utilizado o Travis CI. O Travis CI foi escolhido por ser uma plataforma online, de fácil utilização e gratuíta. Além disto, o Travis CI não exige nenhuma configuração local, e as únicas configurações necessárias são feitas no arquivo ```.travis.yml``` que se localizará na raiz do projeto. O link para este projeto na plataforma [pode ser encontrado aqui](https://travis-ci.org/GabrielNegreirosLima/dito-chat), ou no link abaixo: 

> https://travis-ci.org/GabrielNegreirosLima/dito-chat

Na plataforma pode-se perceber cada tentativa de _building_, temos um novo item em _Build History_, que pode ser acessado para obtenção de informações.

O arquivo ```./.travis.yml``` detêm as configurações necessárias para que a os testes do frontend sejam executados corretamente no ambiente, daInstalando os udo que os requisitos já são cumpridos durante o processo de teste (como variáveis de ambiente, que agora são configuradas em ```./frontend/.env```).


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

<br>

# *Deploy* contínuo com Ansible

> Instalando e testando o __servidor de controle com Ansible__ primeiramente em ambiente Ubuntu Linux 18.04. 

A descrição detalhada da configuração e dos passos para deploy automático estão no diretório ```./deploy ``` e em seu [README.md](https://github.com/GabrielNegreirosLima/dito-chat/tree/master/deploy#deploy-cont%C3%ADnuo-com-ansible).


