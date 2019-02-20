# graphql-tcc-web


##### Projeto de uma API com GraphQL desenvolvida em NodeJS. Esse projeto foi desenvolvido para fins de estudo e apresentação.

#### Instruções de uso:
- Faça um git clone https://github.com/jonathastassi/graphql-tcc-web.git ou baixe o projeto.
- Abra o terminal, navegue até a pasta do projeto e digite: npm install.
- Para iniciar o servidor, digite: npm start

#### Testar a API GraphQL
- Abra o navegador e acesse http://localhost:4000/graphql

#### Comandos para executar
- #### Comando para listar todos os usuários, mostrando o nome e o id dos posts de cara usuário.
```
{
  getUsers {
    id
    name
    posts {
      title
      id
    }
  }
}
```

- #### Comando para adicionar um novo usuário.
```
mutation {
createUser(name: "Jonathas") {
    name
    id
  }
}
```

- #### É possível chamar 2 queries.
```
query {
  getUser(id: 5) {
    name
  }

  getPosts {
    title
    user {
      name
    }
  }
}
```

- #### Comando para inserir um novo post e exibir o nome do usuário.
```
mutation {
   createPost(title: "Titlo", content: "Conteudo", user_id: 6) {
    title
    id
    user {
      name
    }
  }
}
```

- #### Comando para exibir o Post com ID 2.
```
{
  getPost(id: 2) {
    id
    title
  }
}
```

- #### Comando para exibir todos os posts e o nome do usuário que o criou.
```
{
  getPosts {
    id
    title
    user {
      name
    }
  }
}
```




