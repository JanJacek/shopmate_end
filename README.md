# Mini-server-maja

An exemplary implementation of an `OpenAPI` specification based **REST API server**. Written in TypeScript, for `node.js`.

Project uses a minimal set of dependencies from which the most important are:

- [express](https://www.npmjs.com/package/express) &mdash; for general server functionality
- [express-openapi-validator](https://github.com/cdimascio/express-openapi-validator#example-express-api-server)
  &mdash; for OpenAPI specification validation

## Quick start

We assume that you have `node.js` [installed](https://nodejs.dev/learn/how-to-install-nodejs) (reasonably actual version, say >=16).

The following command uses `yarn` [package manager](https://www.npmjs.com/package/yarn) but the code should work with the `npm` manager as well.

1. Clone repo to your local directory
2. Go to the main directory of repo and issue an empty `yarn` command to download and install dependencies
3. Start the service with `yarn start`

You should get the following output:

```terminal
>$ yarn start
yarn run v1.22.17
$ node index.js
API Server works at http://localhost:3333
Try open http://localhost:3333/status in your browser to see the status page.
```

Follow the instruction to open the status page.

Click the test button to access `/api/maja/test` endpoint. Use browsers dev tools to observe network activity and the content of request and response.

## Development

### Project files

Project consists of the following files:

- `package.json` &mdash; standard package configuration file used in `node.js` projects
- `handlers.js` &mdash; each API endpoint requires a dedicated function to handle the incoming requests which is called _a handler_; they are defined in this file but one can put handlers anywhere he/she want (for complicated ones it makes perfect sense to put them in a separate file)
- `api-spec.yaml` &mdash; start point for **your OpenAPI specification**
- `index.js` &mdash; module entry point; this file is used in `yarn start` command
- `status.html` &mdash; the whole content of `/status` page
- `LICENSE` &mdash; license text
- `.gitignore` &mdash; files that should be ignored by `git`
- `README.md` &mdash; this file

### Adding a new endpoint

1. Add a definition of new endpoint to the `api-spec.yaml` file. This step is optional &mdash; skip it if you don't need `OpenAPI` specification, the only consequence is that the automatic requests validation will not work for it.
2. Write a function that should be called when the server receives a request targeting the URL of the endpoint (see `handlers.js` for an example and/or [express documentation](http://expressjs.com/en/guide/routing.html))
3. Link your handler with the matching URL with an appropriate routing method: `.get`, `.post`, `.patch`, etc. (see `index.js` for an example)
# shopmate_end
