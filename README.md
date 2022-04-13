# Calendar.js
Calendar.js provide a fast way to work with dates when you don't wanna deal with hours, minute, second and so on.
It means that Calendar.js comes in handy when you wanna work with something like a 'calendar based app' or maybe you need some date system for a browser.
The output is really easy-to-use: once you had import the module, instantiate a calendar object, set a year range and you get a json with a ordered list containing all the days belonging to those years.

## Import
let's install the package first:

### Copy the raw js  
The simplest way is to grab the raw js from https://github.com/ActuallyNotaDev/Calendar.js/blob/main/calendar.js,
make a new js file, paste it.
after that from your entry script:
```javascript
import calendar from '<PATH>/calendar.js';

var 📅 = new calendar()
```
---

// npm package will be avabile soon

---

## Usage
calendar use a ```📅.set( first_year, last_year )``` function to inizialize a calendar that goes from one year(```first_year```) to another(```last_year```). Once done quik get your calendar.
```javascript
// let's get the calendar from 1997 to 2007
📅.set( 1997, 2007 )

console.log(📅.getCalendar())
```
The output, if you are testing on a browser should be like this:



