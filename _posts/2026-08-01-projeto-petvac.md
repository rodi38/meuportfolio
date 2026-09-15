---
layout: post
title: "PetVac – controle de vacinação de pets"
date: 2026-08-01 12:00:00 -0300
categories: projetos
tags: [react-native, fastify, typescript, mongodb, api-rest, mobile]
---

# PetVac – controle de vacinação de pets

O PetVac nasceu como projeto extensionista da faculdade, com um objetivo simples: permitir que tutores cadastrem seus pets e mantenham um histórico organizado das vacinas aplicadas. Depois da entrega acadêmica, decidi continuar evoluindo o projeto por conta própria, revisando a arquitetura e adicionando funcionalidades que foram além do escopo original.

Hoje o PetVac é composto por duas aplicações:

- **[PetVacApi](https://github.com/rodi38/PetVacApi)** — API REST que concentra toda a regra de negócio.
- **[PetVaccination](https://github.com/rodi38/PetVaccination)** — aplicativo mobile (React Native) usado pelo tutor no dia a dia.

## O que o app resolve

A ideia central é dar ao tutor um lugar único para:

- Cadastrar pets com espécie, raça, sexo e data de nascimento (a idade é calculada automaticamente a partir da data de nascimento).
- Registrar cada vacina aplicada, com múltiplas doses, veterinário e clínica responsáveis.
- Consultar o histórico de vacinação de cada pet a qualquer momento, evitando duplicidade de aplicação de uma mesma vacina.

## Backend (PetVacApi)

A API é construída com **Fastify 5** e **TypeScript**, usando o driver nativo do **MongoDB** (sem ORM) para persistência. O código é organizado em camadas — `routes` (definição das rotas e schemas do Swagger), `controllers` (parsing/validação da requisição e orquestração), `services` (regras de negócio e acesso ao banco) e `models` (entidades e schemas de validação) — seguindo o fluxo `rota → controller → service → resposta padronizada`.

Alguns pontos da arquitetura:

- **Validação de entrada** com Zod, cujos schemas também alimentam a documentação OpenAPI (Swagger UI, disponível em `/docs`).
- **Autenticação via JWT**, com invalidação automática de tokens antigos sempre que o usuário troca de senha.
- **Soft delete** em pets, vacinas e vacinações — nada é apagado fisicamente, preservando o histórico de saúde do animal. Excluir um pet, por exemplo, também marca em cascata suas vacinações como excluídas, dentro de uma transação.
- **Proteção contra IDOR**: tentar acessar um recurso que existe mas pertence a outro usuário retorna `404`, não `403`, para não revelar a existência do dado a terceiros.
- Todas as respostas seguem um envelope padronizado (`{ success, data, error }`), o que facilita bastante o consumo no app.
- Cobertura de testes de integração com Jest e `mongodb-memory-server`, cobrindo autenticação, ownership, paginação, soft delete e o ciclo completo de vacinações.

## Mobile (PetVaccination)

O app é feito em **React Native 0.76 + TypeScript**, com **React Navigation** para as telas e **axios** para comunicação com a API. A estrutura também é dividida por responsabilidade: `contexts` cuida do estado global de autenticação, `services` concentra a comunicação com a API e operações locais, `screens` traz as telas em si e `hooks` reúne lógica reutilizável de requisições e validação de formulários.

A camada de autenticação é centralizada: uma instância do axios injeta automaticamente o Bearer token nas requisições e, ao receber um `401` da API, limpa a sessão local e redireciona o usuário para o login. Ao abrir o app, o token salvo é validado localmente (decodificação do JWT) antes de restaurar a sessão.

## Stack usada

**Backend:** Fastify, TypeScript, MongoDB, Zod, JWT, bcrypt, Swagger/OpenAPI, Jest.
**Mobile:** React Native, TypeScript, React Navigation, axios, AsyncStorage.

## Próximos passos

Como o projeto segue em evolução fora da faculdade, algumas ideias já mapeadas para as próximas versões:
- Refresh token, para sessões mais longas sem exigir novo login.
- Permitir que o tutor registre doses de reforço aplicadas em clínicas/veterinários diferentes.
- Relatórios de vacinação.

Confira o código completo nos repositórios: [PetVacApi](https://github.com/rodi38/PetVacApi) (backend) e [PetVaccination](https://github.com/rodi38/PetVaccination) (mobile).
