## API

---

### Usuários

---

#### Ler usuário logado

Retorna os dados do usuário logado.

GET /usuario/logado

#### REQUISIÇÃO

##### PARÂMETROS: nenhum

##### CABEÇALHOS:

*   token: Token de autenticação

##### CORPO: nenhum

#### RESPOSTA

##### CABEÇALHOS: nenhum

##### CORPO: dados do usuário logado. Por exemplo:

```plaintext
{
        "id": 3,
        "nome": "dell",
        "sobrenome": "lucas",
        "email": "lucasdell.@gmail.com",
        "senha": "456789"
}
```

STATUS:

*   200: sucesso na leitura
*   400: falha na leitura
*   401: usuário não autorizado

---

### Bares

---

#### Ler Cardápios

Lê todos os cardápios de um bar específico.

GET /Bares/:id/cardapios

##### Requisição

Parâmetros:

*   id: id do bar

Cabeçalho: nada

Corpo: nada

##### Resposta

Cabeçalho: nada

Corpo: Se existe o bar, então lista de cardápios do bar, incluindo os produtos, no format JSON. Por exemplo:

```plaintext
[
    {
        "id": 1,
          "nome": "Sanduiches",
          "id_bar": 1,
          "produtos": [
              {
                  "id": 1,
                  "nome": "Hamburguer",
                  "descricao": "Pão, queijo, hamburger, ovo, tomate",
                "preco": 10.00,
                "url": "/imagens/hamurguer.jpg"
              },
              {
                  "id": 2,
                  "nome": "X-Tudo",
                  "descricao": "Pão, queijo, hamburger, ovo, bacon, abacaxi, tomate",
                "preco": 12.00,
                "url": "/imagens/x-tudo.jpg"
              },
          ]
    },
    {
        "id": 2,
          "nome": "Bebidas",
          "id_bar": 1,
          "produtos": [
              {
                  "id": 3,
                  "nome": "Coca",
                  "descricao": "Coca-cola 1.5 l",
                "preco": 10.00,
                "url": "/imagens/coca.jpg"
              },
              {
                  "id": 4,
                  "nome": "Suco",
                  "descricao": "Suco natural de laranja",
                "preco": 12.00,
                "url": "/imagens/suco.jpg"
              },
          ]
    }
]
```

Status:

*   404: se não existe o bar para o id especificado.
*   400: error geral
*   200: sucesso na leitura