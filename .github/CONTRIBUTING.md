
# How to contribute

I'm really glad you're reading this, volunteer developers to help this project are always welcome.

If you haven't already, follow me ([@johncasarrubias](irc://chat.freenode.net/opengovernment) on twitter). I want you to keep informed about new features and tutorials.

Here are some important resources:

  * [MEAN Expert Blog](http://mean.expert) tutorials about the MEAN Stack.
  * [WIKI](https://github.com/mean-expert-official/loopback-sdk-builder/wiki) official wiki documentation.
  * [Angular 2 Testing](https://angular.io/docs/ts/latest/guide/testing.html) official documentation for testing environment.
  * Bugs? [GitHub Issues](https://github.com/mean-expert-official/loopback-sdk-builder/issues) is where to report them

## Adding Issues
If you find any bug or enhancement, you are always welcome to create a [New Issue](https://github.com/mean-expert-official/loopback-sdk-builder/issues).

## Pull Request
If you would like to contribute by adding new features, enhancements or by fixing bugs; please consider that you need to create an issue prior your pull request. This is important for tracking purposes in CHANGELOG.

**IMPORTANT: Make sure you create a branch from `development` and then create the pull request also to development and not to master.**

Please send a [GitHub Pull Request](https://github.com/mean-expert-official/loopback-sdk-builder/pull/new/development) with a clear list of what you've done (read more about [pull requests](http://help.github.com/pull-requests/)). When you send a pull request, we will love you forever if you include RSpec examples. We can always use more test coverage. Please make sure all of your commits are atomic (one feature per commit).

Always write a clear log message for your commits. One-line messages are fine for small changes, but bigger changes should look like this:

    $ git commit -m "A brief summary of the commit
    > 
    > A paragraph describing what changed and its impact."
    
Most of the times you will need to add a new test or we may not be able to integrate it. Though, there are some cases when you don't need to add a unit test, like fixing a typo, adding a missing type, etc.

## Testing

Tests are being created and excecuted by using the Angular-CLI Tool, please refer to the official documentation.

````sh
$ cd to/loopback-sdk-builder
$ npm test 
````

Thanks,
Jonathan Casarrubias, [MEAN Expert](http://mean.expert).