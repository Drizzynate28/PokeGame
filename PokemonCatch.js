(function () {
    var catchBtn = document.querySelector('.button');
    var star = document.querySelector('.star1');
    var successMessage = document.querySelector('.success');
    var gotchaMessage = document.querySelector('.gotcha');
    var throwMessage = document.querySelector('.throw');
    var pikachu = document.querySelector('.pikachu');

    //start the animation when the catch button is pressed
    function catchStart(e) {
        //run the throw message
        throwMessage.style.animation = 'throwMessage 1s 1 steps(21, start)';
        throwMessage.style.animationFillMode = 'forwards';

        //make pikachu disappear when the pokeball pauses during the throw
        pikachu.style.animation = 'pikachu-disappear 0.5s ease 1';
        pikachu.style.animationDelay = '1s';
        pikachu.style.animationFillMode = 'forwards';
        document.getElementsByClassName("gotcha").innerHTML = "Gotcha!";
    }

    //show the catch text message when one of the star animations ends
    function showMessage() {
        //hide the throw message
        throwMessage.style.display = 'none';

        //animate the gotcha message
        gotchaMessage.style.animation = 'gotchaMessage 0.7s 1 steps(7, start)';
        gotchaMessage.style.animationFillMode = 'forwards';

        //animate the caught message
        successMessage.style.animation = 'successMessage 1.7s 1 steps(19, end)';
        successMessage.style.animationDelay = '1.7s';
        successMessage.style.animationFillMode = 'forwards';
    }

    catchBtn.addEventListener('click', catchStart, false);
    star.addEventListener('animationend', showMessage);
})();