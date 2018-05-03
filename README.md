# RestAPI TS

- Based on Typescript (TS)
- Include SwaggerUI

### DevStarter
```
  npm run dev
```

### All NPM-Options
```
  - "setup": "npm install --save",
  - "clean": "rm -rf dist node_modules && npm install",
  - "start": "node ./dist/server.js",
  - "dev": "LOG_LEVEL=debug nodemon --ext ts --watch src --exec './node_modules/.bin/ts-node' src/server.ts",
  - "lint": "tsconfig-lint",
  - "css": "node-sass --sourcemap false -r public -o public",
  - "build": "rm -Rf dist && npm run lint && tsc && cp src/swagger.json ./dist/ && echo 'Build finished!'"
```

### Environments
  - LOG_LEVEL = info [info,debug,error]
  - RUN_PORT = 3000

### Links
- [SwaggerUI](https://swagger.io/)
