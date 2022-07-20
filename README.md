<p align="center">
  <img src=assets/cover.png>
</p>

<p align="center">
  <img src=https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white>
  <img src=https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB>
</p>

# Índice
- [Índice](#índice)
- [FinAPI](#finapi)
  - [Requisitos](#requisitos)
  - [Regras de negócio](#regras-de-negócio)
- [Enpoints](#enpoints)
  - [`/account`](#account)
    - [Create](#create)
    - [Get](#get)
    - [Put](#put)
    - [Delete](#delete)
  - [`/deposit`](#deposit)
    - [Post](#post)
  - [`/withdraw`](#withdraw)
    - [Post](#post-1)
  - [`/statement`](#statement)
    - [Get](#get-1)
  - [`/statement/date?date=""`](#statementdatedate)
    - [Get](#get-2)

# FinAPI
Projeto desenvolvido no primeiro módulo do Ignite.

## Requisitos
- [x] Deve ser possível criar umma conta
- [x] Deve ser possível buscar o extrato bancário do cliente
- [x] Deve ser possível realizar um depósito
- [x] Deve ser possível realizar um saque
- [x] Deve ser possível buscar o extrato bancário do cliente por data
- [x] Deve ser possível atualizar dados da conta do cliente
- [x] Deve ser possível obter dados da conta do cliente
- [x] Deve ser possível deletar uma conta
Regras de negócio
- [x] Não deve ser possível cadastrar uma conta com CPF já existente
- [x] Não deve ser possível fazer depósito em uma conta não existente
- [x] Não deve ser possível buscar extrato em uma conta não existente
- [x] Não deve ser possível fazer saque em uma conta não existente
- [x] Não deve ser possível excluir uma conta não existente
- [x] Não deve ser possível fazer saque quando o saldo for insuficiente

## Regras de negócio
- [x] Não deve ser possível cadastrar uma conta com CPF já existente
- [x] Não deve ser possível fazer depósito em uma conta não existente
- [x] Não deve ser possível buscar extrato em uma conta não existente
- [x] Não deve ser possível fazer saque em uma conta não existente
- [x] Não deve ser possível excluir uma conta não existente
- [x] Não deve ser possível fazer saque quando o saldo for insuficiente


# Enpoints
## `/account`

### Create
**Request body**
```json
{
	"cpf": string,
	"name": string
}
```
### Get
O CPF deve ser enviado no header da requisição.

**Response**
```json
{
  "customer": {
    "cpf": string,
    "name": string,
    "id": string,
    "statement": []
  }
}
```

### Put
O CPF deve ser enviado no header da requisição.

**Request**
```json
{
	"name": string
}
```

**Response**
```json
{
  "customer": {
    "cpf": string,
    "name": string,
    "id": string,
    "statement": []
  }
}
```

### Delete
O CPF deve ser enviado no header da requisição.

## `/deposit`
### Post
O CPF deve ser enviado no header da requisição.

**Request**
```json
{
	"description": string,
	"amount": number
}
```


## `/withdraw`
### Post
O CPF deve ser enviado no header da requisição.

**Request**
```json
{
	"description": string,
	"amount": number
}
```

## `/statement`
### Get
O CPF deve ser enviado no header da requisição.

```json
{
  "statements": [
    {
      "description": string,
      "amount": number,
      "created_at": Date,
      "type": "credit" | "debit"
    },
  ]
}
```


## `/statement/date?date=""`
### Get
O CPF deve ser enviado no header da requisição.

```json
{
  "statements": [
    {
      "description": string,
      "amount": number,
      "created_at": Date,
      "type": "credit" | "debit"
    },
  ]
}