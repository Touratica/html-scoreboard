# streamlabs-scoreboard

![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/Touratica/html-scoreboard)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)
[![GitHub issues](https://img.shields.io/github/issues/Touratica/streamlabs-scoreboard)](https://github.com/Touratica/html-scoreboard/issues)
[![GitHub forks](https://img.shields.io/github/forks/Touratica/streamlabs-scoreboard)](https://github.com/Touratica/html-scoreboard/network)
[![GitHub stars](https://img.shields.io/github/stars/Touratica/streamlabs-scoreboard)](https://github.com/Touratica/html-scoreboard/stargazers)
![GitHub](https://img.shields.io/github/license/Touratica/html-scoreboard)
![npm](https://img.shields.io/npm/dw/@touratica/html-scoreboard)

A purposely created self-served HTML scoreboard to be used in sports' matches' live streams.

## Introduction

### Motivations

This piece of code was motivated by the need of having an electronic programmable scoreboard in Streamlabs, with
quick and simple controls, in order to use said program to broadcast the Portuguese first tier division national league
matches of korfball on YouTube, starting May 1, 2021.

## Roadmap

### 10/01/2023

The software continues to be used without hiccups several times per week. No known bugs are known at the moment, but new features are still programmed to be added.
Version **[v2.0.0](https://github.com/Touratica/streamlabs-scoreboard/releases/tag/v2.0.0)** was just released, but not with what was antecipated to be in it. Instead, it made the package self-serving, which means there's no need to use another program to serve the html/css/js files. It was also published to npm.

### 27/06/2021

The sofware is currently completely functional and has been in production since May 1, 2021. After releasing **[v1.0.0](https://github.com/Touratica/streamlabs-scoreboard/releases/tag/1.0.0)** and fixing some bugs, the Team's first objective was to add the functionality of showing a scoreboard in a different position when halftime was reached and releasing it as **v1.1.0**. However, since that functionality hasn't been started working on due to time contraints (because "the Team" is only me) and since other updates were given priority over this one (such as fixing bugs and adding other vital functionalities that were missing from the original program), those were launched as alpha pre-releases, being the latest one ([v1.1.0-alpha.2](https://github.com/Touratica/streamlabs-scoreboard/releases/tag/1.1.0-alpha.2)) the version currently in production.

The intention is to continue adding those missing vital functionalities and fixing any bugs that are detected before working on the halftime scoreboard, but setting the beggining of next season as the deadline for **v1.1.0**.

Adding fade in/out animation to the scoreboard is in the plans, estimated to be released as **v1.2.0**.

Proper localization is also something to tackle _ASAP_, with the first languages to be officialy supported being Portuguese (Portugal) and English (UK), estimated to be released as **v1.3.0**.

A complete restructuring of the project into modules is on the works. Being such a breaking change, it will be realeased as **v2.0.0**. The time of its completion may obviously change versioning of the previously mentioned releases. This version will also be accompanied by full documentation.
