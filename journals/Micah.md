## March 22, 2024

Today I worked on:

* Fixing all of the bits of broken code
* Making the docs

## March 20, 2024

Today, I worked on:

* Making the pipeline pass
* Fixing the frontend authentication 

Today, I learned that I hate flake8 and think that it makes
my code much harder to read. It does, however, catch silly
mistakes that I've made, which is good.

## March 19, 2024

Today, I worked on:

* Setting up frontend authentication to stop users from
accessing pages that they shouldn't be able to reach.
* I made the Routine Display Page.

Today, I realized that we were short on time and I was
having trouble teaching well enough to get us finished in
time. I decided to just do the next page mob programming 
with me driving, and I fnished it up so we aren't pushing
time any more. I will use this experience to be vigilant about
not pushing time limits.

## March 12, 2024

Today, I worked on:

* Integrating the Redux into login form
* Walked Andrew through doing the same for signup form

We mob programmed today to figure out integrating Redux. 

Today, I discovered that Redux status can be used to allow
a page to navigate, or to store an error message. I also
learned that a get request cannot have a body, so you need
to ensure that you are not sending a json object. You instead
need to send many individual pieces.

## March 11, 2024

Today, I worked on:

* Creating all of the frontend redux API routes

We mob programmed today to set up all of the routes. 

Today, I that baseQuery in createApi needs to have a
capital Q or your exports don't work. I also learned
that the middleware in the store needs have a list of all 
the middlewares concatenated together if you have multiple
API slices.

## March 7, 2024

Today, I worked on:

* Creating all of the routes for our code 
* Added the rest of the account APIs

We mob programmed today to set up all of the routes
so we can work on our pages while figuring out redux. 

Today, I learned how to use the new react-router-dom.
The RouterProvider was particularly confusing to me.
It can't be wrapped around anything or it gets mad at you.
The only way it should interact with any other components
is by using the routes provided to it via the router.

## March 5, 2024

Today, I worked on:

* Setting up redux 

We mob programmed today to set up redux. We didn't
finish it because it got confusing with APIs.

Today, I learned that redux makes small projects 
very confusing and convoluted, and there are many
tools online that warn about that. It apparently
really shines at bigger levels.

## February 29, 2024

Today, I worked on:

* An API for Deleting an Exercise 
* I coached Andrew through making APIs to create a Workout and Get a Workout

Me and Andrew paired today and I helped explain 
a lot of the fastAPI functionality to him. I walked
him through building an API and making a route for
it. He was fuzzy on some of the content but he 
seems like he's getting it better now.

Today, I improved my ability to read tracebacks. 
Usually, before, the last line of the traceback 
was the easiest place to find the error. Now, we
are starting to see that our errors start halfway
up the traceback. I learned to look through the
traceback and find a file that we worked on, then
use that to diagnose the issue.