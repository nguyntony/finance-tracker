# T|WIN Personal Finance Tracker

---

## Summary

T|WIN is a personal finance tracker web application. This app will help organize your expenses and savings. It makes it easier to see where your money is going, so that you can maintain your budget and save up for your goals.

## Features

-   Visualization of expenses
-   Filter monthly statements
-   Categorize your expenses
-   Create saving goals
-   Transfer funds to a savings account
-   Allocate saving funds towards your goals
-   Create, receive, update and delete: deposits, transactions, goals
-   Create a user account with your own personal data
-   Displays recent transaction and saving goal

## Future Features

-   Implement profile picture upload
-   Pin your important saving goal for a quick glance
-   Filter completed saving goals
-   Filter transactions by category

## Featured Libraries

-   [Chart.js](https://www.chartjs.org/)
-   [Flash](https://www.npmjs.com/package/connect-flash)
-   [Numeral](https://www.npmjs.com/package/express-numeral)
-   [Moment.js](https://momentjs.com/)

## Challenges

-   One challenge is introducing the Chart.js library. For most of the app, we are making database calls with Sequelize and that data is readily available. However, Chart.js has built-in user interactivity, which we wished to use. Our app runs on Node.js and with Node, you are not able to do DOM manipulation. So we had to figure out a way to access the database and have data available for Chart.js. Our solution involved in hosting our very own .JSON file in one of routes and we will have another script file that will fetch the .JSON data from that route. This way, we are able to use the built-in features of Chart.js by simply creating a route with the data that we need.
-   Another challenge is that, we wanted to get our hands dirty with CSS and design. With that being said, we needed to figure out the design and how it will complement the users’ experience. This was especially difficult for when you include web/mobile responsiveness. A challenge was figuring out how to balance design and experience into a smaller screen. Our solution to this is to eliminate some of the distractions from our original design idea and focus on what is important. We would then weave some of those design elements into what the main focus is so that there would be fluidity among different mediums.

## Team

-   [Tyler Nguyen](https://github.com/nguyntyler)
-   [Tony Nguyen](https://github.com/nguyntony)

## User Guide

Please refer back to this guide after creating a user account.

### Dashboard

This is the user dashboard. Here is where you will be able to quickly deposit funds, add transactions and start a saving goal. To the left, is the sidebar where you can view your statistics or logout.

This page is a quick view of your account balance, savings balance and recent transaction/saving goal. Click on the buttons on each card to go to the focused view of each category.

![Dashboard](https://github.com/nguyntony/finance-tracker/blob/main/public/images/user-guide/dashboard-info.png)

### Transaction View

In the transaction view, you will see a list of your transaction of the current month. You can see past months by using the filter. To update a specific transaction click on the its title and to delete a transaction click the corresponding X button.

![Transaction View](https://github.com/nguyntony/finance-tracker/blob/main/public/images/user-guide/transaction-info.png)

### Savings View

In the savings view, this is where your goals will be. You will see a progress bar of how far are you into the goal. To allocate funds into your goals, click on the purple button “Allocate savings”.

If you allocated funds into a goal that you wish to change you can click on the goal title, (it will redirect you to the edit page) and on the top right corner you will see a purple button “Reallocate”.

NOTE: The “Reallocate” button will only appear if there is any progress towards your goal (ie. The “Townhouse” goal has a progress of $500, so if you click on the goal title you will see if the “Reallocate” button).

![Saving View](https://github.com/nguyntony/finance-tracker/blob/main/public/images/user-guide/saving-info.png)

## Icons and Images

-   [Icons](https://www.flaticon.com/authors/freepik)
-   [Images](https://www.freepik.com/vectors/people)
