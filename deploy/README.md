# *Deploy* contínuo com Ansible

O processo de _deploy_ contínuo pode ser implementado por meio de um serviço, em que com poucos (ou apenas um), pode-se colocar a aplicação em produção. Para este projeto, foi escolhido a ferramenta Ansible, por ser de fácil codificação, leitura e ter uma documentação vasta e bem escrita, além de ser uma ferramenta OpenSource de fácil instalação, leve e independente de outros softwares .

Abaixo está descrito passo a passo as decisões de implementação e as configurações do Ansible para este projeto.

> Usaremos outro ambiente Ubuntu 18.04 para simular um servidor de controle, que executará o Ansible. O Ansible é uma ferramenta que exige poucos recursos, portanto não é necessário um servidor dedicado a isto, porém o ideal é que este não seja o mesmo servidor de aplicação.
> Todos os passos abaixo devem ser executados no __servidor de controle__.



<br>

## Instalação do Ansible

O processo de instalação é simples, seguido pelo script ```./basics/ansible-install.sh```:
```bash
# Permissão de root e instalação
$ sudo apt-get install ansible -y

# Para testar e ver a versão
$ ansible --version
```



<br>

## Arquivos de configuração do projeto

Basicamente os arquivos de configuração são ```./deploy/ansible.cfg``` e ```./deploy/hosts```.

O arquivo ```./deploy/ansible.cfg``` diz quais são os _inventories_, listas de configuração do Ansible:
```bash
# Arquivo ./deploy/ansible.cfg
[defaults]

inventory = ./hosts
```


<br>
O arquivo ```./deploy/hosts``` informa traduz nomes para IPs como facilitador para uso do Ansible, além disto este arquivo pode trazer configurações com usuário e senha de SSH para ser acessado (troque 192.168.0.10 pelo IP do seu servidor):

```bash
# Arquivo ./deploy/hosts
[ditochat]

192.168.0.10 ansible_user=ubuntu ansible_password=yourpassword
```

<br>

Para uma configuração completa, é preciso acessar o host pelo menos uma vez, para que este seja adicionado no arquivo ```$HOME/.ssh/know_hosts``` do __servidor de controle.__

```bash
$ sudo ssh ubuntu@192.168.0.10
```



<br>

## *Playbook*

O playbook é um arquivo baseado na linguagem YAML que executará nossas tarefas de deploy, o Ansible se encarregará de executar o script com todos os passos para que o projeto seja clonado do GitHub,  copiado para seu diretório em produção, e que o serviço de web seja reiniciado. O arquivo é encontrado em ```./deploy/ditoplay-playbook.yml``` e é auto explicativo.

```yaml
---
- hosts: localhost
  vars:
    release_path: /home/negreiros/ditochat_implements

  tasks:

    - name: Clona o repositório localmente
      git:
        repo: ssh://git@github.com/GabrielNegreirosLima/dito-chat.git
        force: yes
        accept_hostkey: yes
        key_file: /home/negreiros/.ssh/id_rsa
        version: scripts-cd
        dest: "{{ release_path }}"


    - name: Instala as dependencias para criar a build do frontend
      command: yarn --cwd "{{ release_path }}"/frontend/ install

    - name: Cria a build do frontend
      command: yarn --cwd "{{ release_path }}"/frontend/ run build

    - name: Instala as dependencias para criar a build do backend
      command: chdir=/home/negreiros/ditochat_implements/backend go get ./...

    - name: Cria a build do backend
      command: chdir=/home/negreiros/ditochat_implements/backend go build ./.




# Configurações feitas no ambiente de produção
- hosts: ditochat

  tasks:

    - name: Copia o diretório de backend para produção
      copy:
        src: /home/negreiros/ditochat_implements/backend/
        dest: /home/negreiros/ditochat_public/backend


    - name: Mata os backends anteriores
      become: yes
      become_user: root
      command: killall backend
      ignore_errors: yes


    - name: Configura permissões para execução do backend
      file: 
        path:  /home/negreiros/ditochat_public/backend/backend
        state: file
        mode: 0755


    - name: Executa novo backend
      command: echo "\n" | /home/negreiros/ditochat_public/backend/backend &


    - name: Copia o diretório de build do frontend para produção
      copy:
        # O source e no servidor de controle e o dest é o servidor de aplicação em produçao
        src: /home/negreiros/ditochat_implements/frontend/build/
        dest: /home/negreiros/ditochat_public/frontend


    - name: Reinicia o servidor WEB
      become: yes
      become_user: root
      service: name=nginx state=restarted
```

<br>
Para a execução correta do playbook, e portanto do processo de deploy, o comando do Ansible deve ser executado da maneira abaixo. É solicitado a senha de root do **servidor de aplicação** ao executá-lo:
<br>
```bash
$ ansible-playbook deploy/ditochat-playbook.yml --ask-become-pass
```
