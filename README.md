# Play - Back End API Endpoint

DISCLAIMER: This project was developed with a mobile-first orientation. As it is
still in progress, please adjust to a mobile view in order to have the best experience.
Desktop/Ipad iterations, through media queries, will be developed and added in the future.

[Live Link](https://danielmulitauopele.github.io/play-js/)

## Table of Contents

* [Description/Purpose](#descriptionpurpose)
* [System Requirements](#system-requirements)
* [Setup](#setup)
* [Dependencies](#dependencies)
* [Contributors](#contributors)
* [Screenshots](#screenshots)
    * [Songs](#songs)
        * [Retrieve All Songs](#get-apiv1songs)
        * [Retrieve A Song](#get-apiv1songsid)
        * [Add A Song](#post-apiv1songs)
        * [Update A Song](#patch-apiv1songsid)
        * [Delete A Song](#delete-apiv1songsid)
    * [Playlists](#playlists)
        * [Retrieve All Playlists](#get-apiv1playlists)
        * [Create A Playlist](#post-apiv1playlists)
        * [Retrieve A Playlist](#get-apiv1playlistsplaylist_idsongs)
        * [Add Song To A Playlist](#post-apiv1playlistsplaylist_idsongsid)
        * [Remove Song From A Playlist](#delete-apiv1playlistsplaylist_idsongsid)



## Description/Purpose

This project is a front-end application that is derived from a separate back-end application.
It includes a database service that tracks songs that users have favorited
through the front-end application. Users can also create playlists and add
their favorite songs to a playlist. Song metadata comes from the [MusixMatch API](https://developer.musixmatch.com/).

## System Requirements

This application requires several technologies to be installed to our local
machine. The following are required:

* [jQuery](https://jquery.com/)

## Setup

To install this application locally, take the following steps:

1. Run `git clone git@github.com:DanielMulitauopele/play-api.git` in your terminal
2. Navigate to the newly created project directory
3. Run `npm install` in your terminal to install the required node modules
4. In your terminal run `psql` to launch the PostgreSQL CLI
5. Run `CREATE DATABASE play;` for the development database, and
`CREATE DATABASE play_test;` for the test database.
6. Run `knex migrate:latest` to run the necessary migrations to get the tables
up and running.
7. Run `npm test` to start the test suite.
8. Run `npm start` to start the server to view the application endpoints at
`http://localhost:3000`.

## Dependencies

**Production**
 - [Express](https://www.npmjs.com/package/express)
 - [Nodemon](https://www.npmjs.com/package/nodemon)
 - [Knex](https://www.npmjs.com/package/knex)
 - [PG](https://www.npmjs.com/package/pg)
 - [PryJS](https://www.npmjs.com/package/pryjs)

**Development**
 - [Chai](https://www.npmjs.com/package/chai)
 - [ChaiHTTP](https://www.npmjs.com/package/chai-http)
 - [Mocha](https://www.npmjs.com/package/mocha)
 - [Istanbul](https://www.npmjs.com/package/istanbul)
 - [NYC](https://www.npmjs.com/package/nyc)

## Contributors

This project was developed, tested, and published by [Mike McKee](https://github.com/mikecm1141/) and [Daniel Mulitauopele](https://github.com/DanielMulitauopele/).

## Screenshots
