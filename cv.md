---
layout: cv
title: CV
---

# Curriculum Vitæ

{% include contact.html %}

## Sobre mim

Sou desenvolvedor FullStack com vivência em todas as etapas do desenvolvimento de aplicações web, do planejamento à entrega. Tenho domínio técnico que me permite transitar entre diferentes stacks: Java (Spring Boot), Node.js (Express, NestJS, Fastify) e PHP (Laravel) no back-end, com React e React Native no front-end.

Meu trabalho vai desde a manutenção e modernização de sistemas legados até a criação de novos projetos pensados para escalar, sempre buscando aplicar boas práticas como Clean Architecture e SOLID. Gosto de construir interfaces rápidas e responsivas, e também de cuidar da modelagem de bancos relacionais e não-relacionais (MySQL, PostgreSQL, MongoDB).

Atualmente curso Análise e Desenvolvimento de Sistemas e sigo aprofundando meus estudos em IA Generativa e Arquiteturas Inteligentes, buscando unir engenharia de software sólida a soluções cada vez mais inteligentes.

Além do trabalho como desenvolvedor, escrevo no [blog do site]({{ site.baseurl }}/blog/), onde compartilho artigos, aprendizados e bastidores dos projetos que desenvolvo — vale a pena dar uma conferida nos posts mais recentes.

## Experiência Profissional

### Desenvolvedor FullStack — DC Tecnologia
09/2024 – 03/2025 · São Paulo - SP, Brasil

Atuação no ciclo completo de desenvolvimento de software (web e mobile), equilibrando manutenção e otimização de sistemas legados com a arquitetura e implementação de novos projetos escaláveis.

* Criação e sustentação de APIs RESTful com PHP (Laravel) e Node.js (NestJS)
* Desenvolvimento de interfaces responsivas com React e aplicativos móveis com React Native, além de manutenção de interfaces legadas com jQuery
* Modelagem de bancos relacionais (MySQL, PostgreSQL) e não-relacionais (MongoDB)
* Implementação de autenticação e controle de acesso via JWT e OAuth
* Colaboração direta com a equipe na definição de prioridades e estimativa de tarefas

Tecnologias: PHP, Laravel, Node.js, NestJS, Docker, JavaScript, jQuery, React, React Native, MySQL, PostgreSQL, MongoDB, Scrum

### Analista de QA — IzzyWay Tecnologia
11/2023 – 02/2024 · Fortaleza - CE, Brasil

Atuação na garantia de qualidade de software integrada ao ciclo de desenvolvimento.

* Desenvolvimento de scripts para conversão de testes manuais em automatizados
* Análise de requisitos de negócio e técnicos para criação de casos de teste
* Execução de roteiros de testes e documentação de bugs, facilitando a correção pela equipe de desenvolvimento

### PetVac — Projeto de extensão, Estácio
08/2024 – 11/2024 · Fortaleza - CE, Brasil

Solução mobile para gestão da saúde animal, criada para auxiliar tutores no controle do calendário vacinal.

* App em React Native (CLI) e TypeScript, com React Navigation e AsyncStorage para persistência local; interface baseada em Material Design (Paper)
* API REST com Fastify e Node.js, usando injeção de dependência (tsyringe) e validação de esquemas com Zod
* Banco de dados MongoDB (Atlas) via TypeORM, com deploy da API na Render
* Autenticação via JWT e senhas protegidas com Bcrypt

### Local Lib — Projeto de extensão, Estácio
02/2024 – 05/2024 · Fortaleza - CE, Brasil

Solução FullStack para modernização do controle de acervo de uma escola pública em Fortaleza, automatizando empréstimo e catalogação antes feitos manualmente.

* Backend em Java com Spring Boot, Spring Data JPA e documentação via Swagger
* Frontend em React e TypeScript com Ant Design
* Banco de dados relacional PostgreSQL

## Formação Acadêmica

**Análise e Desenvolvimento de Sistemas** — Centro Universitário Estácio
02/2024 – 07/2026 · Fortaleza - CE, Brasil

**IA Generativa Aplicada e Arquiteturas Inteligentes** — Universidade Anhembi Morumbi
09/2026 – presente

## Tecnologias

Java, Spring Boot, NestJS, Next.js, TypeScript, Node.js, React, React Native, SQL, MySQL, PostgreSQL, MongoDB, Vue.js, JavaScript, Sequelize, Prisma ORM, Fastify, APIs REST, TypeORM, CSS, HTML, Angular, Git, Laravel, Docker, jQuery, Python, PHP, Metodologias Ágeis, Scrum

## Idiomas

Inglês — Técnico

## Blog

Além dos projetos listados no [portfólio]({{ site.baseurl }}/portfolio/), escrevo sobre desenvolvimento, aprendizados e bastidores no blog do site. Confira os posts mais recentes:

{% assign blog_posts = site.posts | where_exp: "post", "post.categories contains 'blog'" | where_exp: "post", "post.hidden != true" | limit: 3 %}
<ul>
{% for post in blog_posts %}
  <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a> — <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %e, %Y" }}</time></li>
{% endfor %}
</ul>

Veja todos os posts em [{{ site.url }}{{ site.baseurl }}/blog/]({{ site.baseurl }}/blog/).
