
# Tic-Tac-Toe

## Developer Notes

- Simplicity and readability with good performance was the goal for this.
- For the win or draw check algorithm, I decided to go with readability over strict performance. We only have a max of 15x15 grid size, so worst case in our current setup the draw check will do close to its max 225 loops through the grid looking for empty cells. This is fine for browsers. We can make it all O(1) with counters, but that felt like a lot of state to add for a simple app like this.
- For the backend, I did spend time setting up Prisma as overall it felt like a time saving with the easy DB calling functions it gives you, the clean schema you can edit easily, and the ability to switch the SQLite temporary DB I used for this demo to a production-ready DB.
- Player IDs are currently hard-coded (1 and 2) for simplicity, as using numeric IDs instead of just player names makes it straightforward to expand the app later by linking it to a new Users table.
- In the data model, I chose the game outcome to be demonstrated by storing either the playerID who won or just null, implying no winner. Hopefully it is implicit that all these games in the table are completed games and no 'in progress' games are stored.
- In regards to React features, splitting into components felt unnecessary, and optimisations like useCallback felt overkill.
- Testing was essential for the check algorithm but too time-consuming for the backend simple API calls and frontend component testing.

## Setup

Make sure you have Node.js installed.

### Start Two Terminals

#### Backend Setup

```bash
cd backend
npm i
DATABASE_URL="file:./dev.db" npm run prisma:generate
DATABASE_URL="file:./dev.db" npm run prisma:migrate
npm run build
DATABASE_URL="file:./dev.db" npm start
```

#### Frontend Setup

```bash
cd client
npm i
npm start
```

Note:
If you are not using localhost:3000 for your backend URL, specify your url as an Env variable:

```bash
API_URL=[YOUR BACKEND SERVER URL] npm start
```


## Original Problem description below 

# Tic-Tac-Toe
The below problems are to allow us a glimpse into your problem solving ability, style and current skill set. We expect this test to take 2-3 hours, if you find yourself spending more than this do not aim to solve all 3 problems!

## Problems
### Problem 1
We have started a basic game of Tic-Tac-Toe as outlined [here](https://en.wikipedia.org/wiki/Tic-tac-toe) but we don't have anyone good enough to code to finish it! 
- Please implement a complete basic game of Tic-Tac-Toe
- Please use React and TypeScript throughout, if you know TailwindCSS please expand on what is already provided, otherwise it is fine to use raw styling 
- Both players will play out of the same application, it is sufficient to just switch the current player each time a move is played
- Once a game is completed, I should be able to start another game 

### Problem 2
We are bored with the basic game now, can you make it so the board can be scaled to any size? 
- Add some kind of input which allows me to change the board size
- The board size should be a number between 3 and 15 

### Problem 3
We want to store game results in a database.
- Create a simple backend server
- Use any SQL database to store the results, please structure it in a relational manner and in a way for it to be expanded for future use cases 
- Display simple stats back to the user including number of win and losses for each player

## Quickstart
- Make sure you have **node** installed
- `cd client`
- `npm i`
- `npm start`
