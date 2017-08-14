# Separating modules and displaying JSON data queried from MySQL

  In this workshop we will find out how to logically separate your angular code
  into separate files and namespaces, and how to display data queried from MySQL
  on a webpage.

# How to load modules in separate files

It is useful to separate your code into logical modules. Our style guide tells us that we should only define
one component per file: [https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#rule-of-1](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#rule-of-1) 

## Bootstrap the application

  - Create `index.html`
  - Include angular from [https://developers.google.com/speed/libraries/#angularjs](https://developers.google.com/speed/libraries/#angularjs)
  
## Create MyApp module

  - Create file `MyApp.js` in `modules` path and define a module named `MyApp`
  - Include the file in your html
  - Set an `ng-app` attribute on the `html` element to `MyApp`
  - Sanity check: load the page and make sure there are no errors in the console
  
## Create view module

We will create a view module for our page controllers

  - Create a file `MyViews` in the `modules` path and define a module name `MyApp.MyViews`
  - Include the file in your html
  - Sanity check: load the page and make sure there are no error in the console
  
## Add view module dependency on app

  - Add `MyApp.MyViews` as a dependency to the `MyApp` module
  - Sanity check: load the page and make sure there are no error in the console
  
## Define page controller on view module

  - Create a file `MyPageController.js` and add a controller named `MyPageController` to your view module
  - Add a `var`, `vm` set to `this`
  - Add a property `title` set to `'Famous Programmers'`
  - Create a `main` element in your `index.html` file
  - Set the element attribute `ng-controller` to `MyPageController as vm`
  - Bind the content of an `h1` element to `vm.title`
  - Refresh the page to view the controller's message
  
## Review

  *What did we just do?*
  
  We created a "core" module, `MyApp`, and a "view" module, `MyApp.MyViews`. The core module is used as base namespace
  that will include the main dependencies of the app, and also allow the app to be initialized, by attributing it to
  `ng-app`.  
  
  The `MyApp.MyViews` namespace defines controllers that supports our views. This means one main controller per page.
  By making our core module dependant on this module, it is automatically loaded when then app loads. However, it is
  only used on pages that have an element with the `ng-controller` attribute set to the name of the controller. In this
  case, it would be `MyPageController`.  
  
  Our scripts are loaded in order of dependency. Our stack loads all module declaration first, then the definitions.
  Once the modules are loaded, additions to that module can be loaded in any order.  
  
# Retrieving and displaying JSON data  

  We'll create a PHP script that returns data, then display that data in the browser.
  
## Import sample data

  - ssh into your dbbox > `vagrant ssh dbbox`
  - navigate to sql dump file > `cd shared/angular-workshop-2`
  - import the sql > `mysql -u root -ppassword < angular-workshop-2.sql`
  - inspect the api response script at `famous-programmers.php`, and test it at:
  [http://localhost:8080/angular-workshop-2/famous-programmers.php](http://localhost:8080/angular-workshop-2/famous-programmers.php)
  
## Create a module for our API

  - Create file `MyAPI.js` in `modules` path and define a module named `MyApp.MyAPI`
  - Include the file in your html after `<script src="modules/MyViews.js"></script>`
  - Sanity check: load the page and make sure there are no errors in the console
  
## Add view module dependency on view

  - Add `MyApp.MyAPI` as a dependency to the `MyApp.MyView` module
  - Sanity check: load the page and make sure there are no error in the console
  
## Create api service

  - Create a new file, `MyAPIService.js` in the root path
  - Create a service that can make a GET request to our API endpoint and return a promise object
  - Use the `$http` service docs to complete this task: [https://docs.angularjs.org/api/ng/service/$http](https://docs.angularjs.org/api/ng/service/$http)
  
## Include api service

  - Include `MyAPIService.js` AFTER `MyPageController.js`. This shows that the dependency can be loaded after the
  thing that depends on it. 
  
## Load the service into your controller

  - Back in your controller, add `MyAPIFactory` to your injected dependencies
  - Dump `MyAPIFactory` to the console and be sure we have the correct object
  
## Load the JSON data into a variable

  - In your controller, use your api service to return a promise from our api request
  - Use the promise and add a success function that will load the results into a controller
  variable named `vm.famousProgrammers`
  
## Display the JSON on the page

  - Use the `ng-repeat` attribute to display the data on the page in a table
  - Include bootstrap to style the table: [https://getbootstrap.com/docs/4.0/getting-started/introduction/](https://getbootstrap.com/docs/4.0/getting-started/introduction/)

## Bonus

  - Throttle the speed of the requests
  - Conditionally show a loading message while `vm.famousProgrammers` is falsey