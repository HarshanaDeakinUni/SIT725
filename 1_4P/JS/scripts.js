function changeText(){
        var textsArray = ["Text 1","Text 2", "Text 3", "Text 4", "Text 5"]
        var number = getRandomNumberBetween(0,textsArray.length - 1)
        console.log("Index: ", number)
        var element = document.getElementById("heading");
        element.innerHTML = textsArray[number];
        element.style.color = getRandomColour();

    }
    
    function getRandomNumberBetween(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    function getRandomColour(){
        var letters = '0123456789ABCDEF';
        var colour = '#';
        for (var i = 0; i < 6; i++) {
            colour += letters[Math.floor(Math.random() * 16)];
        }
        return colour;
    }
    