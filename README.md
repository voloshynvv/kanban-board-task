# Github Kanban Board
Live: https://kanban-board-task-piok.vercel.app/

## Requirements
✅ User should enter repo URL in the input on top of the page and press "Load". For example: ```https://github.com/facebook/react``` <br/>
✅ App loads issues for the repo using Github API.<br/>
✅ App contains 3 columns: ToDo, In Progress, Done.<br/>
✅ User should be able to drag-n-drop between the columns and change the order of issues.<br/>
✅ Current issue position (column and order) should be stored between search and browser sessions. When the user loads issues for Repo1 -> Repo2 -> Repo1 he should see all changes he did for Repo1.<br/>
✅ User should be able to visit the profile of the owner of the repo and visit the repo as well by links under the input.

## Technologies
* React
* TypeScript
* Redux Toolkit
* Chakra UI
* dnd kit
* Vitest, React Testing Library, MSW

## How to start the app locally? 
Rename ```.env.example``` to ```.env.local``` <br/>
```VITE_API_KEY``` is optional. In case you face rate limits (as I did during development), please provide your own key.

Read more about rate limits: https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28#primary-rate-limit-for-unauthenticated-users

```
npm i 
npm run dev
```
