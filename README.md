# mocha-async-failure-example
`npm install`

`npm run test`

Notice that the third suite fails because the `before` hook in the second suite modifies the global variable but never cleans up after itself.