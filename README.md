# random-food

## Build Setup

```bash
# パッケージの依存関係をインストールします。
$ yarn install
# もしくは
$ npm install

# ホットリロードを効かせるために開発者モードをport3000番で立てます。
$ yarn dev
# もしくは
$ npm run dev

``` 
ただし、このWebAppにはGoogleAuthとGoogleMapAPIを使用しておりますので、それぞれのTokenが必要になります。
ご自身のGCPコンソールにおいて、TokenとSecretを入手する必要があり、それに伴ってAPIを有効化しなければなりません。


## 概要
このアプリケーションはGoogleMapAPIとLocationAPIを使用し、半径５００m以内のレストランやカフェをランダムに決定し、道のりを教えてくれるアプリケーションです。

## 使用技術
* Node.js v16.10.0
* Nuxt.js v2.15.8
* GCP(GAE)
* Vuetify v2.6.1


