
let sizeImages = '600x600';
const winnerSentences = ['awesome!', 'well done!', 'correct!', 'exactly!', 'yes!', 'nailed it!']

const animals = [
    { name: 'an elephant', visual: "https://source.unsplash.com/BuQ1RZckYW4/" + sizeImages + "" },
    { name: 'a turtle', visual: "http://source.unsplash.com//L-2p8fapOA8/" + sizeImages + "" },
    { name: 'a gorilla', visual: "https://source.unsplash.com/Ns0rFLTjLU4/" + sizeImages + "" },
    { name: 'a giraffe', visual: "https://source.unsplash.com/gOWuRBY7gDM/" + sizeImages + "" },
    { name: 'a kangaroo', visual: "https://source.unsplash.com/PgCYN4Da76k/" + sizeImages + "" },
    { name: 'a shark', visual: "https://source.unsplash.com/sEkE2AWwF7A/" + sizeImages + "" },
    { name: 'a cat', visual: "https://source.unsplash.com/75715CVEJhI/" + sizeImages + "" },
    { name: 'a puppy', visual: "https://source.unsplash.com/h7VBJRBcieM/" + sizeImages + "" },
    { name: 'a parrot', visual: "https://source.unsplash.com/3osGqRRtQBE/" + sizeImages + "" },
    { name: 'a butterfly', visual: "https://source.unsplash.com/99bz22tvPWM/" + sizeImages + "" }
];

const colors = [
    { name: 'blue', visual: '#1973FF' },
    { name: 'green', visual: '#00DC0D' },
    { name: 'yellow', visual: '#FFFF00' },
    { name: 'pink', visual: '#FD65FF' },
    { name: 'purple', visual: '#800080' },
    { name: 'orange', visual: '#FF8628' },
    { name: 'grey', visual: '#808080' },
    { name: 'red', visual: '#FF0000' },
    { name: 'brown', visual: '#724242' },
    { name: 'white', visual: '#FFFFFF' },

]

const borders = ['14% 16% 10% 18% / 18% 12% 14% 9%', '18% 20% 10% 20% / 18% 12% 17% 9%', '9% 9% 10% 15% / 18% 12% 13% 9%', '11% 15% 13% 6% / 12% 12% 13% 9%', '18% 21% 10% 7% / 12% 12% 15% 12%', '12% 17% 10% 8% / 13% 12% 23% 21%'];
let targetDisplay = document.querySelector('h2');
let arrayOfGame = animals;
let mode = 'animals';
let pickedImage = shuffle(arrayOfGame)[Math.floor(Math.random() * arrayOfGame.length)];
let displayMessageWinner = document.querySelector('.winner');
let displayMessage = document.querySelectorAll(".displayMessageTryAgain"); //You did it! or Try again! message
let colors_btn = document.querySelector('.colors-btn');
let animals_btn = document.querySelector('.animals-btn');
let reset_btn = document.querySelector('.reset');
let cards = document.querySelectorAll("main > div:not(.wrapper)");
let imgs = document.querySelectorAll('img');

//------------------------------------------------

//FUNCTION WINNER SENTENCE
function winnerSentence() {
    let randomNum = Math.floor(Math.random() * winnerSentences.length);
    return winnerSentences[randomNum];

}
//FUNCTION TYPE OF BORDER 
function randomBorder() {
    let randomNum = Math.floor(Math.random() * borders.length);
    return borders[randomNum];

}
// FUNCTION SHUFFLE ARRAY
function shuffle(arra1) {
    var ctr = arra1.length, temp, index;

    while (ctr > 0) { // While there are elements in the array

        index = Math.floor(Math.random() * ctr); // Pick a random index

        ctr--; // Decrease ctr by 1

        temp = arra1[ctr]; // And swap the last element with it

        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

// Target Display
targetDisplay.textContent = pickedImage.name;


// FUNCTION Positioning images in place 
// Images can be pictures or colors
function positioningImages() {
    if (mode !== 'animals') {
        for (let i = 0; i < cards.length; i++) {

            cards[i].style.visibility = 'visible';
            cards[i].firstElementChild.style.display = 'none';
            cards[i].style.borderRadius = randomBorder();
            displayMessage[i].classList.remove('shake-vertical');
            displayMessageWinner.classList.remove('pulsate-fwd');
            cards[i].style.backgroundColor = (arrayOfGame[i].visual);
        }

    } else {

        for (let i = 0; i < cards.length; i++) {
            cards[i].style.visibility = 'visible';
            cards[i].firstElementChild.style.display = 'block';
            cards[i].firstElementChild.style.borderRadius = randomBorder();
            displayMessage[i].classList.remove('shake-vertical');
            displayMessageWinner.classList.remove('pulsate-fwd');
            cards[i].firstElementChild.setAttribute('src', arrayOfGame[i].visual);
        }
    }
};


//FUNCTION CLEAN turn cards into void squares with background Color === main background Color
function clean() {
    for (let i = 0; i < cards.length; i++) {
        cards[i].firstElementChild.style.display = 'none';
        cards[i].style.backgroundColor = '#142a4b';
    };
}

//FUNCTION RESET
function reset() {
    let newPickedImage = shuffle(arrayOfGame)[Math.floor(Math.random() * arrayOfGame.length)];
    if (newPickedImage === pickedImage) {
        newPickedImage = shuffle(arrayOfGame)[Math.floor(Math.random() * arrayOfGame.length)];
    } pickedImage = newPickedImage;

    positioningImages();
    targetDisplay.textContent = pickedImage.name;
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.cursor = 'pointer';
        imgs[i].classList.remove('fadeOut');
    }
}
// Select Type of Game
colors_btn.addEventListener('click', function () {
    while (mode != 'colors') {
        colors_btn.classList.add('buttonSelected');
        animals_btn.classList.remove('buttonSelected');
        arrayOfGame = colors;
        mode = 'colors';
        clean();
    }

});
animals_btn.addEventListener('click', function () {
    while (mode != 'animals') {
        animals_btn.classList.add('buttonSelected');
        colors_btn.classList.remove('buttonSelected');
        arrayOfGame = animals;
        mode = 'animals';
        clean();
    }

});

// Press and Reset New Game
reset_btn.addEventListener('mousedown', function () {
    reset_btn.classList.add('clicked');
});
reset_btn.addEventListener('mouseup', function () {
    reset_btn.classList.remove('clicked');

    reset();

});

// Click on images
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function () {
        if (mode === 'animals') {

            if (arrayOfGame[i].name !== pickedImage.name) {
                cards[i].style.cursor = 'default';
                imgs[i].classList.add('fadeOut');
                displayMessage[i].classList.add('shake-vertical');
                setTimeout(function () { displayMessage[i].style.display = 'block'; }, 0);
                setTimeout(function () { displayMessage[i].style.display = 'none'; }, 1100);
                setTimeout(function () { cards[i].style.visibility = 'hidden'; }, 1050);


            }
            else {
                for (let j = 0; j < cards.length; j++) {
                    if (arrayOfGame[j].name !== pickedImage.name) {
                        imgs[j].classList.add('fadeOut');
                    }
                }
                displayMessageWinner.textContent = winnerSentence();
                displayMessageWinner.style.display = 'block';
                displayMessageWinner.classList.add('pulsate-fwd');
                setTimeout(function () { displayMessageWinner.style.display = 'none'; }, 2500);
                setTimeout(function () { clean(); }, 2500);
                setTimeout(function () { reset(); }, 3000);

            }
        }

        else { //You are playing for 'colors'
            if (arrayOfGame[i].name !== pickedImage.name) {
                cards[i].style.transition = 'all 150ms';
                cards[i].style.cursor = 'default';
                cards[i].style.backgroundColor = '#142a4b';
                displayMessage[i].classList.add('shake-vertical');
                setTimeout(function () { displayMessage[i].style.display = 'block'; }, 0);
                setTimeout(function () { displayMessage[i].style.display = 'none'; }, 1100);
                setTimeout(function () { cards[i].style.visibility = 'hidden'; }, 1050);

            }
            else {
                for (let j = 0; j < cards.length; j++) {
                    if (arrayOfGame[j].name !== pickedImage.name) {
                        cards[j].style.transition = 'all 150ms';
                        cards[j].style.backgroundColor = '#142a4b';

                    }
                }
                displayMessageWinner.textContent = winnerSentence();
                displayMessageWinner.style.display = 'block';
                displayMessageWinner.classList.add('pulsate-fwd');
                setTimeout(function () { displayMessageWinner.style.display = 'none'; }, 2500);
                setTimeout(function () { clean(); }, 2500);
                setTimeout(function () { reset(); }, 3000);

            }
        }
    });
}


//------------ START:

positioningImages();


/*

TO IMPROVE:
    - able to add animals without having to add colors.
    - auto-fill grid when cards disappear (css grid allows it, flex no?).
    - responsive for mobile and big desktop.
    - buttons section: organize better, more gap between NewGame and rest.
    - loading speed of images (can I load them before I show them?)
    - Maybe a little animation before display the game for the 1st time.

*/














