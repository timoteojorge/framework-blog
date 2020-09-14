### Live Demo
Uma versão demo está disponível em:<br>

[https://react-blog.timoteojorge.com/](https://react-blog.timoteojorge.com/)


### Pré-requisitos para rodar API

* Java 11
* maven
* Banco de dados Postgres instalado

### Banco de dados
Para rodar a API é necessário que o banco de dados postgres esteja rodando com as seguintes configurações:

* **Porta:** 5432
* **Nome do Banco de dados:** db_blog
* **Usuário:** postgres
* **Senha:** admin

A porta, o usuário e a senha podem ser alterados no arquivo `application-dev.properties`
A criação do esquema e da base de dados pode ser encontrada no arquivo `db/schema.sql`.

### Para rodar a API

Abra o terminal na pasta raiz do projeto e digite:<br>
`cd api`<br>
`./mvnw spring-boot:run`<br>

### Documentação da API
No presente projeto foi utilizado o swagger para documentar a API. Para utilizá-lo, após subir a aplicação, navegue até:<br>
`http://localhost:8080/api/v1/swagger-ui.html`<br>

### Autenticando
Ao rodar o script de inicialização do banco de dados um usuário de teste é inserido na base de dados com os seguintes dados:

* **Email:** usuarioteste@frwk.com.br
* **Senha:** 123456

Este usuário pode ser utilizado tanto para acessar o front como para se autenticar no swagger.

Para se autenticar no swagger, navegue até:<br>
`http://localhost:8080/api/v1/swagger-ui.html#/authentication-controller/loginUsingPOST`
Enviando o seguinte body na requisição:<br>
```
{
  "email": "usuarioteste@frwk.com.br",
  "password": "123456"
}
```
- - -

### Pré-requisitos para rodar o front

* Node 12
* yarn

### Para rodar o front

Abra o terminal na pasta raiz do projeto e digite:<br>
`cd front`<br>
`yarn`<br>
`yarn start`<br>

Após esses comandos, abra o navegador na seguinte URL
`http://localhost:3000/login`
- - -
