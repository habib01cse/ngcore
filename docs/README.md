# Pridebookpro

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Initial Folder Creation
mkdir -p js/vendors && touch js/vendors/README.md
mkdir backgroud icon logo menu page && touch backgroud/README.md icon/README.md logo/README.md menu/README.md page/README.md
mkdir services pipes directives gaurds components mocks models views controls && touch services/README.md pipes/README.md directives/README.md gaurds/README.md components/README.md mocks/README.md models/README.md views/README.md controls/README.md

ng g class app.config
ng g class app.exception.handler
ng g class app.config.lazy.module


# Upgradation
-------------- Step 1 --------------
    ## How to remove Node.js from Windows:
        Take a deep breath.

        Uninstall from Programs & Features with the uninstaller.

        Reboot (or you probably can get away with killing all node-related processes from Task Manager).

        Look for these folders and remove them (and their contents) if any still exist. Depending on the version you installed, UAC settings, and CPU architecture, these may or may not exist:

        C:\Program Files (x86)\Nodejs
        C:\Program Files\Nodejs
        C:\Users\{User}\AppData\Roaming\npm (or %appdata%\npm)
        C:\Users\{User}\AppData\Roaming\npm-cache (or %appdata%\npm-cache)
        C:\Users\{User}\.npmrc (and possibly check for that without the . prefix too)
        C:\Users\{User}\AppData\Local\Temp\npm-*
        Check your %PATH% environment variable to ensure no references to Nodejs or npm exist.

        If it's still not uninstalled, type where node at the command prompt and you'll see where it resides -- delete that (and probably the parent directory) too.

        Reboot, for good measure.

   
-------------- Step 2 --------------
    $ ng new pridebookpro --style=scss --skip-install --skip-git
    $ npm i bootstrap --save
    $ npm i font-awesome --save
    $ npm i jquery --save
    $ npm i primeicons --save
    $ npm i primeng --save


# Guideline
1. We will try to use yarn for build and deploy our project instead of npm for faster working.

//for staging environment
ng build --configuration=qa
