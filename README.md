# Frontend Technical Test

# INSTALLATION

```
git clone
```

```
yarn install
```

```
yarn dev
```

# TESTING

```
yarn test
```

# REQUIREMENTS (ALL MARKED AS DONE)

## General

    Games added to the cart should persist on local storage. DONE
    Deployment of the web app on Vercel from your own GitHub repository.  Done
    The web app must have a responsive design. Done
    Implement unit testing. Done
    Do not use any 3rd party components like Material-ui, Shadcn-ui, etc. Use the TailwindCSS config file for colors, etc. Done
    In the footer, the Apply Digital logo should redirect you to the route "/". Done
    The header should only have two navigation elements, a logo that redirects you to "/" and a cart icon to "/cart". Done

## Catalog Page

    The page must have a loading indicator. Done
    The selected "genre" filter should persist on the url and be used when Donequerying the results if the page is visited for the first time using these parameters. Done
    When clicking on the "Add To Cart" button, the game has to be added to the Cart. Done
    If the item is added to cart, the button should say "Remove" and if clicked it should remove the item from the cart. Done
    ¨See more¨ button must be implemented. Done
    The "genre" filter selector can be implemented using the native select element. It doesn’t need to be complex. Done

## Cart Page

    It should display every item added to the cart, including name, description, price, image, genre, and display the "New" label using the isNew attribute. Done
    The "X" button on each item should remove it from the cart. Done
    The Order Summary section should display the items quantity, each item's price and the order total. Done
    It should display a "Back to Catalog" button that takes back to "/" Done

# EXTRAS

    State management using context , avoid to install external libraries and overengineering. (for big apps Zustand or redux should be use of course)
    Lazy Loading Added in order to improve performance.
    Jest config added.
    Enviroment variables added locally and in vercel.
    Accesibility Added.
    Tailwind theme config.
    Loading pages per page.
    Custom hooks used.
    All files commented with JSDoc style.
