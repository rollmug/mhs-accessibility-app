# MHS Accessibility App

**Requirements:** a server with:

- the latest version of Node.js and NPM 
- Docker and Docker Compose installed

## Getting Started

First, clone this directory on a server:

```bash
git clone https://github.com/rollmug/mhs-accessibility-app.git
# then:
cd mhs-accessibility-app
npm install
```

### Set Environment vars:

In the project root directory, create a file called `.env.local` and add the following text, configuring the first three URLs as needed:

```dotenv
GRAPHQL_URL=https://path-to-directus/graphql
FILES_BASE_URL=https://path-to-directus/assets
NEXT_PUBLIC_FILES_BASE_URL=https://path-to-directus/assets
CACHE_DELAY=100
```

## Development:

To run the development server in Node (for testing):

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production:

For production use, run the following command:

```bash
docker-compose up -d --build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

## Updating to the Latest Version

1. `cd` to the project root directory.
2. stop the running services (ie, `docker-compose down`).
3. Run `git pull`.
4. Start services again: `docker-compose up -d --build`

## Run from another docker-compose file

Install this project in a directory that contains an existing `docker-compose` file, as above. Then include the following in the existing docker-compose file:

```yaml
services:
  # other services etc...

  collected-mohistory:
    container_name: collected-mohistory
    build:
      context: .
    restart: always
    environment:
      NODE_ENV: production
    env_file: 
      - .env.local
    ports:
      - 3000:3000
    # networks:
      # any networks here, if needed

  # rest of compose file...
```

When launching, make sure you include the `build` commnad:

```bash
docker-compose up -d --build
```

## Docker-compose from git

To build directly from git, use the following in your docker-compose file:

```yaml
services:
  # other services etc...

  cosmic-playlist:
    container_name: cosmic-playlist
    build: https://github.com/rollmug/mhs-accessibility-app.git
    restart: always
    environment:
      NODE_ENV: production
    env_file: 
      - .env.local
    ports:
      - 3000:3000
    # networks:
      # any networks here, if needed

  # rest of compose file...
```