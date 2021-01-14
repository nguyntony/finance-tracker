# T|WIN  Personal Finance Tracker
- - - -
## Summary 
T|WIN is a personal finance tracker web application. This app will help organize your expenses and savings. It makes it easier to see where your money is going, so that you can maintain your budget and save up for your goals. 

## Features 
- Visualization of expenses 
- Filter monthly statements
- Categorize your expenses
- Create saving goals
- Transfer funds to a savings account
- Allocate saving funds towards your goals
- Create, receive, update and delete: deposits, transactions, goals
- Create a user account with your own personal data
- Displays recent transaction and saving goal

## Future Features
- Implement profile picture upload 
- Pin your important saving goal for a quick glance
- Filter completed saving goals
- Filter transactions by category

## Featured Libraries
- [Chart.js](https://www.chartjs.org/)
- [Flash](https://www.npmjs.com/package/connect-flash)
- [Numeral](https://www.npmjs.com/package/express-numeral)
- [Moment.js](https://momentjs.com/)

## Challenges
- One challenge is introducing the Chart.js library. For most of the app, we are making database calls with Sequelize and that data is readily available. However, Chart.js has built-in user interactivity, which we wished to use. Our app runs on Node.js and with Node, you are not able to do DOM manipulation. So we had to figure out a way to access the database and have data available for Chart.js. Our solution involved in hosting our very own .JSON file in one of routes and we will have another script file that will fetch the .JSON data from that route. This way, we are able to use the built-in features of Chart.js by simply creating a route with the data that we need. 
- Another challenge is that, we wanted to get our hands dirty with CSS and design. With that being said, we needed to figure out the design and how it will complement the users’ experience. This was especially difficult for when you include web/mobile responsiveness. A challenge was figuring out how to balance design and experience into a smaller screen. Our solution to this is to eliminate some of the distractions from our original design idea and focus on what is important. We would then weave some of those design elements into what the main focus is so that there would be fluidity among different mediums.

## Team 
- [Tyler Nguyen](https://github.com/nguyntyler)
- [Tony Nguyen](https://github.com/nguyntony)


