# streamlabs-scoreboard

![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/Touratica/streamlabs-scoreboard)
![David](https://img.shields.io/david/dev/Touratica/streamlabs-scoreboard)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)
[![GitHub issues](https://img.shields.io/github/issues/Touratica/streamlabs-scoreboard)](https://github.com/Touratica/streamlabs-scoreboard/issues)
[![GitHub forks](https://img.shields.io/github/forks/Touratica/streamlabs-scoreboard)](https://github.com/Touratica/streamlabs-scoreboard/network)
[![GitHub stars](https://img.shields.io/github/stars/Touratica/streamlabs-scoreboard)](https://github.com/Touratica/streamlabs-scoreboard/stargazers)
[![GitHub license](https://img.shields.io/github/license/Touratica/streamlabs-scoreboard)](https://github.com/Touratica/streamlabs-scoreboard/blob/main/LICENSE)

A purposely created set containing HTML, CSS (preprocessed Sass) and JavaScript (transpiled TypeScript) files to be used
as a Browser Source in Streamlabs OBS, in order to add a programmable scoreboard to a Scene.

## Introduction

### Motivations

This piece of code was motivated by the need of having an electronic programmable scoreboard in Streamlabs OBS, with
quick and simple controls, in order to use said program to broadcast the Portuguese first tier division national league
matches of korfball on YouTube, starting May 1, 2021.

## Roadmap

### 27/06/2021

The sofware is currently completely functional and has been in production since May 1, 2021. After releasing **[v1.0.0](https://github.com/Touratica/streamlabs-scoreboard/releases/tag/1.0.0)** and fixing some bugs, the Team's first objective was to add the functionality of showing a scoreboard in a different position when halftime was reached and releasing it as **v1.1.0**. However, since that functionality hasn't been started working on due to time contraints (because "the Team" is only me) and since other updates were given priority over this one (such as fixing bugs and adding other vital functionalities that were missing from the original program), those were launched as alpha pre-releases, being the latest one ([v1.1.0-alpha.2](https://github.com/Touratica/streamlabs-scoreboard/releases/tag/1.1.0-alpha.2)) the version currently in production.

The intention is to continue adding those missing vital functionalities and fixing any bugs that are detected before working on the halftime scoreboard, but setting the beggining of next season as the deadline for **v1.1.0**.

Adding fade in/out animation to the scoreboard is in the plans, estimated to be released as **v1.2.0**.

Proper localization is also something to tackle *ASAP*, with the first languages to be officialy supported being Portuguese (Portugal) and English (UK), estimated to be released as **v1.3.0**. 

A complete restructuring of the project into modules is on the works. Being such a breaking change, it will be realeased as **v2.0.0**. The time of its completion may obviously change versioning of the previously mentioned releases.
