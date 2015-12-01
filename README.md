## jQuery Poker Card

The jQuery Poker Card plug-in allows for the creation of dynamic poker cards. Creating the cards as a plug-in allows us to leverage the power of jQuery to manipulate them for many uses. This project is at a very early stage. It is a smaller part of a bigger project and will change as the requirements of the main project changes.

## How do I add a poker card to the screen?

Adding a poker card is simple. Simply add the following HTML block to your page.

```html

<div class="poker-card" data-value="A" data-color="red" data-suit="&hearts;"></div>

```

Note: Please take note of the following data attributes.

The 'data-value' attribute is the value the card will display. In reality,  this value can be any character and does not have to be the normal values. (1-10, J, Q, K, A)

The 'data-color' attribute is the color of the fonts and symbols in the card. This attribute can be any value accepted by the "color" css style attribute.

The data-suit attribute is the value of the symbol that will be displayed in the card. For maximum flexibility, this value can be any string. Defaults are "&hearts", "&diams", "&spades", and "&clubs".

Also: The default width for a poker card is 200px. Please make sure you set the width of the div to your desired value.

## Accessing cards.

```javascript
  $(".poker-card").pokerCards("flip");
```

To access cards, you can use any selector allowed by jQuery. This allows for immense power. You can separate cards by decks, hands, table, etc., and access them by using the appropriate selector.

Use the 'pokerCards' method to access any of the methods provided by the plug-in.


## Scaling cards.

Poker cards will not scale automatically. You need to call the resize method manually.

```javascript
  $(".poker-card").pokerCards("resize");
```

The resize method will be called once when the page loads. This allows fonts to scale dependent on the initial width you set.



##
