# XP FEC

Teste de uma aplicação de conexão com a API do Spotify.

## Pré-Requisitos

Para rodar o projeto deve-se utilizar os seguintes requisitos:
- Nodejs 
- NPM

## Componentes

Os componentes utilizados neste projeto são:
- Nodejs v10.20.0
- NPM v6.14.4
- React v16.8.1
- node-sass v4.11.0
- webpack v4.29.3
- axios v0.19.2

## Instalação

Para instalar basta rodar os comandos abaixo, lembrando que é necessário ter todos os pré-requisitos instalados.
- npm i
- npm start

## Funcionalidades

Este teste tem as seguintes funcionalidades:
- Conexão com a API Web do Spotify [https://developer.spotify.com/documentation/web-api/](https://developer.spotify.com/documentation/web-api/).
- Multiplo login de acesso a aplicação: login com o client_id local, login com o client_id de terceiros, login com o hash do client_id (client_id_client_secret) e login com o token de auth.
- Este não possui nenhum framework de CSS (Bootstrap, PureCss, etc.), sendo este também totalmente responsivo (XL, LG, MD, SM, XS e XT) usando SASS e Media Queries.
- Este não foi feito com nenhum scaffolds (Create React App, etc.), ou seja, toda configuração da esteira de deploy (Webpack) foi configurada manualmente.
- A aplicação possui persistência por meio de sessões (express-session) guardando alguns dados ao longo do uso, ex.: os dados da última busca realizada.
- O desenvolvimento foi feito por meio de componentes (ReactJS e SASS) e esta divisão foi adiconada a esteira de deploy por meio de code-splitting (ReactJS Lazy).
- Foi desenvolvido um backend em Nodejs para consumir e tratar os dados da API do Spotify.
- Buscar na tela principal por artista, álbum e/ou música.
- Na lista de música da tela principal, permite escutar um preview da música (se disponível).
- Na tela de detalhe do artista é possível visualizar os dados principais do artista, assim como os albuns do artista.
- Na tela de detalhe do álbum é possível visualizar os detalhes do album, assim como as faixas e ouvir um preview de cada faixa (se disponível).
