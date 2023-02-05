The project is to shall how to migrate processor from v1 to v2.
There are a lot of structure change in V2. This project can be built but not suppose to actually run.

Example Commit: sentioxyz/processor-v2-migrate@e85d2c5

- all project should be ESM module, which mean you need
  - add `"type": "module` to package.json
  - use new tsconfig and jest config, just use the sample `tsconfig.json` and `jest.config.ts`, remove the old `jest.config.js`
  - `@sentio/sdk` and `@sentio/cli` should both in `^2.0.0` in your package json.
  - relative import like `import "./myfile"` should be `import "./myfile.js"`
  - now use use one npm package with server exports, so
    - `import {xx} "@sentio/sdk-aptos"` should be `import {xx} "@sentio/sdk/aptos"`
    - if you imports multiple files in `processor.ts`, use `import "asdf"` instead of `require("asd")` (not `import("asdf")`). you should avoid use any require in your project in general
    - a lot of utils location has changed, see sample PR for examples
- Another major change is migrate to ethers 6, so we can get rid of `BigNumber` used. They should all be replace by native `bigint` usage. 
- testings 
  - test script in `package.json` should change from `jest` to `sentio test`
  - `const service = new TestProcessorServer(()=> require('./processor'))` change to `const service = new TestProcessorServer(()=> import('./processor.js'))`
- for aptos process, `xxx_typed` replaced as `xxx_decoded`
