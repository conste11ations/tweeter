# Tweeter Project

Tweeter is a simple, single-page Twitter clone. Features include: responsive design for diverse devices, funky google fonts, animated error messages based on tweet length validation, dynamically generated user information (for display purposes), slide toggling for the create tweet form. 

Built with: 
  - (front-end) HTML, CSS (flexbox, media queries), JS, jQuery, AJAX, MomentJS
  - (back-end) Node, Express

## Final Product

![Tweeter desktop version screenshot](./docs/desktop-screen.png?raw=true "Tweeter desktop version")
![Tweeter error message screenshot](./docs/error-msg.png?raw=true "Tweeter error message tweet ")
![Tweeter mobile version screenshot](./docs/mobile.png?raw=true "Tweeter mobile version ")

## Dependencies

    "body-parser": "^1.15.2",
    "chance": "^1.0.2",
    "express": "^4.13.4",
    "md5": "^2.1.0"

### Note the following JS libraries sourced externally on browser side.
 - JQuery 3.4.1 https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
 - MomentJS for relative timestamps https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js>


## Getting Started

- Install all dependencies (using the `npm install` command).
- Start up the web server using the `npm run local` command - the app will be served at <http://localhost:8080/>.
- Go to <http://localhost:8080/> in your browser.
