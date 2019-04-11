# Application 25 - Nested Routes

Chapter 8 - React Router

The goal of this version of the application is to provide nested routes. A nested route allows us to provide a common header/footer to several views, making it easier to isolate changes.

* The purpose of nested routes is to make it easier to define parts of a view that are shared amongst several views. For example, a header and a footer. The first thing we do is refactor `src/App.jsx` to include a new `App` component that defines the top structure of all the views in the app. The important part of this change is the `props.children` property that will inject the rendered route matched as a nested route. See below.
* Next, we modify the react router to include a top route for "/" that uses the `App` component as the top-most component. It then matches a route and supplies the matched component as the `props.children` of the `App` component.
* Next, we delete `<h1>Issue Tracker</h1>` in the `IssueList` render method as we are now including this as part of all routes that are rendered as part of the issue list application.
* Now, we add some additional CSS styles for the `header` and `footer` classes used in the definition of the `App` component in `src/App.jsx` to make things look slightly nicer.
* Lastly, we refactor the `src/App.jsx` router to have an "index route". This allows us to replace the redirect from "/" to "/issues". This is not strictly required, but it is often important if an application has a "landing view" that is different than the application. We do this with the creation of a "Dashboard" component. Our example includes a Dashboard component that simulates login/logout style functionality - without actually logging in or logging out.