/* global document, keys */

function highlightPiece() {
  // highlight count 0 or 1
  $('.highlight').removeClass('highlight');
  // highlight count 0
  $(this).addClass('highlight');
  // highlight count 1
}

function handleArrow(event) {
  const boardCorners = {
    leftTop: 50,
    rightBottom: 750,
  };

  let isArrow = false;
  const $chessPiece = $('.highlight');
  const currentPosition = $chessPiece.position();
console.log(currentPosition);
  if (event.which === keys.left && currentPosition.left > boardCorners.leftTop) {
    $chessPiece.css('left', '-=100px');
    isArrow = true;
  } else if (event.which === keys.up && currentPosition.top > boardCorners.leftTop) {
    $chessPiece.css('top', '-=100px');
    isArrow = true;
  } else if (event.which === keys.right && currentPosition.left < boardCorners.rightBottom) {
    $chessPiece.css('left', '+=100px');
    isArrow = true;
  } else if (event.which === keys.down && currentPosition.top < boardCorners.rightBottom) {
    $chessPiece.css('top', '+=100px');
    isArrow = true;
  }

  if (isArrow) {
    event.preventDefault(); // prevent the default action (scroll / move caret)
  }
}

function listenForChessArrows() {
  $(document).keydown(handleArrow);
}

function bindChessDom() {
  $('.piece').click(highlightPiece);
}

function playChess() {
  bindChessDom();
  listenForChessArrows();
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    playChess,
  };
}
