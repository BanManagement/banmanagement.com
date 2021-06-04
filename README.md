# Documentation site
This repo contains the source code for https://banmanagement.com

# Contributing

## Getting Started

Make sure you have at least [Node.js v12](https://nodejs.org) or higher:

```sh
node -v

v12.16.1
```

### Fork, Clone & Install

Start by forking banmanagement.com to your GitHub account.  Then clone your fork and install dependencies:

```sh
git clone git@github.com:<your-user>/banmanagement.com.git
cd banmanagement.com
npm install
```

Add this repo as a git remote so you can pull/rebase your fork with the latest updates:

```
git remote add upstream git@github.com:BanManagement/banmanagement.git
```


### Commands


```sh
npm test                  // run linting

npm run dev               // run a development server to view the site including automatic reload

npm run build             // build everything

npm run start             // run site (requires build script to be ran first)
```
