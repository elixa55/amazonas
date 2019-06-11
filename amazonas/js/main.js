 /*** the constructor of possible objects (indian, bonus elements etc.) ***/
            function Icon(x, y, image, sizeW, sizeH) {
                this.x = x;
                this.y = y;
                this.image = image;
                this.sizeW = sizeW;
                this.sizeH = sizeH;
                this.display = function () {
                    return context.drawImage(this.image, this.x, this.y, this.sizeW, this.sizeH);
                }
            }
            /*** initializing variables ***/
            var score = 50;
            document.getElementById("score").innerHTML= score;
            var level = 1;
            document.getElementById("level").innerHTML= level;
            var lives = 3;
            document.getElementById("lives").innerHTML= lives;
            var canvas = document.getElementById("canvas");
            var context = canvas.getContext("2d");
            window.addEventListener('keydown', indianMove, false);

            var speedFish=3;
            var speedBird=2;
            var numberTreasure=6;

            var indianImg = new Image();
            indianImg.src = "./images/indio.png";
            var indian = new Icon(20, 520, indianImg, 80, 80);

            var birdRImg = new Image();
            birdRImg.src = "./images/birdR.png";
            var birdLImg = new Image();
            birdLImg.src = "./images/birdL.png";
            var bird2Img = new Image();
            bird2Img.src = "./images/bird2.png";
            var birdR = new Icon(canvas.width-100, 10, birdRImg, 130, 130);
            var birdL = new Icon(100, 80, birdLImg, 130, 130);

            var crash = new Image();
            crash.src ="./images/crash.png";

            var imgFish1 = new Image();
            var imgFish2 = new Image();
            var imgFish3 = new Image();
            imgFish1.src ="./images/piranha1.png";
            imgFish2.src ="./images/piranha2.png";
            imgFish3.src ="./images/piranha3.png";

            var message ="Hey! Look here!";
            document.getElementById("text").innerHTML= message;

            var listOrderRare = []; // lists of piranjas's coordinates to visulalise
            var listOrderDense = [];
            var listBottomRandom = [];
            var listBirdRight = [];
            var listBirdLeft = [];

            var goldArray = [];   // coordinates of bonus elements

            var requestAnimationFrame = window.requestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.msRequestAnimationFrame;
            reload();
            /*** according to the level calls a convenient function,
             * actually it contains 5 levels, but new combinations of the functions can be added easily ***/
            function reload() {
                requestAnimationFrame(reload);
                if (level==1)
                    level1();
                else if (level==2)
                    level2();
                else if (level==3)
                    level3();
                else if (level==4)
                    level4();
                else if (level==5)
                    level5();
                else {
                    if (score>=50) {
                        displayMessage("CONGRATULATION! YOU FOUND LOT OF GOLD! YOUR SCORES: " + score);
                        alert("CONGRATULATION! YOU FOUND LOT OF GOLD. YOUR SCORES: " + score);
                        document.location.reload();
                        reload();
                    }
                    else {
                        displayMessage("YOUR LIFE'S SAVED, BUT YOU HAVEN'T FOUND GOLD.");
                        alert("YOUR LIFE'S SAVED, BUT YOU HAVEN'T FOUND GOLD.");
                        document.location.reload();
                        reload();
                    }
                }
            }
            /*** 1 - 5 different difficulty levels***/
            function level1() {
                checkLevelCompleted();
                drawBackground();
                drawIndian();
                createGoldArray(numberTreasure);
                displayTreasure(goldArray, numberTreasure);
                treasureHunting(numberTreasure);
                piranhaBottomRare();
                drawBottomPiranha(listOrderRare, imgFish1, speedFish);
            }
            function level2() {
                speedFish=15;
                checkLevelCompleted();
                drawBackground();
                drawIndian();
                piranhaBottomDense();
                drawBottomPiranha(listOrderDense, imgFish1, speedFish);
            }

            function level3() {
                speedFish=3;
                speedBird=2;
                drawBirdRight(speedBird);
                drawIndian();
                piranhaFromBirdRight();
                createGoldArray(numberTreasure);
                displayTreasure(goldArray, numberTreasure);
                treasureHunting(numberTreasure);
                piranhaFromBottomRandom();
                drawPiranhaBothDirection(speedFish);
                removePiranhaBothDirection();
                checkLevelCompleted();
            }

            function level4() {
                speedFish = 3;
                speedBird = 2;
                drawBirdRight(speedBird);
                drawBirdLeft(speedBird, bird2Img);
                drawIndian();
                createGoldArray(numberTreasure);
                displayTreasure(goldArray, numberTreasure);
                treasureHunting(numberTreasure);
                piranhaFromBirdRight();
                piranhaFromBirdLeft();
                piranhaFromBottomRandom();
                drawPiranhaBothDirection(speedFish);
                removePiranhaBothDirection();
                checkLevelCompleted();
            }

            function level5() {
                speedFish = 5;
                speedBird = 3;
                drawBirdRight(speedBird);
                drawBirdLeft(speedBird, birdLImg);
                drawIndian();
                createGoldArray(numberTreasure);
                displayTreasure(goldArray, numberTreasure);
                treasureHunting(numberTreasure);
                piranhaFromBirdRight();
                piranhaFromBirdLeft();
                piranhaFromBottomRandom();
                drawPiranhaBothDirection(speedFish);
                removePiranhaBothDirection();
                checkLevelCompleted();
            }

            function startNewGame() {
                if (confirm("Do you want to start new game?")) {
                    document.location.reload();
                    reload();
                }
            }
            /*** in base of the given parameter creates the list of the bonus elements,
             * generates their properties, like coordinates (random), type of their image etc.***/
            function createGoldArray(size)   {
                if (goldArray.length==0) {
                    if (goldArray.length < size) {
                        for (var i = 0; i < size; i++) {
                            var treasure = new Icon();
                            var imageGold = new Image();
                            treasure.x = 100 + Math.floor(Math.random() * (1050 - 100 + 1));
                            treasure.y = 300 + Math.floor(Math.random() * (450 - 300 + 1));
                            var random = 1 + Math.floor(Math.random() * 5);
                            if (random == 1) {
                                imageGold.src = "./images/gold1.png";
                                treasure.image = imageGold;
                            } else if (random == 2) {
                                imageGold.src = "./images/gold2.png";
                                treasure.image = imageGold;
                            } else if (random == 3) {
                                imageGold.src = "./images/gold3.png";
                                treasure.image = imageGold;
                            }  else if (random == 4) {
                                imageGold.src = "./images/gold4.png";
                                treasure.image = imageGold;
                            } else {
                                imageGold.src = "./images/gold5.png";
                                treasure.image = imageGold;
                            }
                            treasure.sizeW = 50;
                            treasure.sizeH = 50;
                            goldArray[i] = treasure;
                        }
                    }
                }
            }
            /*** by collisions of the indian and bonus objects generates special events:
             * gives plus scores, visualises it, the indian jumpes up in safe from bottom piranjas, message,
             * and puts the bonus in safe***/
            function treasureHunting (size) {
                for (var i=0, j=540;i<size;i++, j-=50) {
                    if ((distanceTo(goldArray[i].x, goldArray[i].y, indian.x, indian.y) <30) && indian.x<1000){
                        score +=20;
                        document.getElementById("score").innerHTML= score;
                        indian.x = goldArray[i].x;
                        indian.y= 180;
                        displayMessage("Hurray!!!. You've got " + score +" scores");
                        goldArray[i].x=1150;
                        goldArray[i].y=j;
                    }
                }
            }
            /*** ... and visualises them***/
            function displayTreasure(array, size) {
                for (var i=0;i<size;i++)
                    array[i].display();
            }
            /*** message to inform the user in a html element***/
            function displayMessage(text) {
                message=text;
                document.getElementById("text").innerHTML = message;
                //var n = new Notification("Attention", {body: "BANG! Back to the island!"});
                setTimeout(function() {message="Hey! Look here!";
                    document.getElementById("text").innerHTML=message;
                }, 2500);
            }
            /*** the animation of the birds (from left, right move to a given point)***/
            function drawBirdRight(speedBird) {
                drawBackground();
                birdR.display();
                birdR.x -= speedBird;
                if (birdR.x <= 100-birdR.x/3) {
                    birdR.x = 1000;
                }
            }
            function drawBirdLeft(speedBird, img) {
                birdL.image = img;
                birdL.display();
                birdL.x += speedBird;
                if (birdL.x > 1200-birdL.x/5) {
                    birdL.x = 100;
                }
            }
            function drawBackground() {
                var riverImg = new Image();
                riverImg.src ="./images/water.png";
                var philoImg = new Image();
                philoImg.src ="./images/philo.png";
                var cityImg = new Image();
                cityImg.src ="./images/town.png";
                var patternRiver=context.createPattern(riverImg,"repeat");
                var patternPhilo=context.createPattern(philoImg,"repeat");
                var patternCity=context.createPattern(cityImg, "repeat");
                context.rect(0,0,150,100);
                context.fillStyle=patternRiver;
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.fillStyle = patternPhilo;
                context.fillRect(0, 260, 100, 340);
                context.fillStyle = patternCity;
                context.fillRect(1100, 260, 100, 340);
            }

            function drawIndian() {
                indian.display();
            }

            function drawCrash(objx, objy) {
                context.drawImage(crash, objx, objy, 70, 70);
            }
            /*** controlls the coordinates of indian***/
            function indianMove(e) {
                var key = e.which;
                if (key == 39) {
                    if (indian.x < canvas.width - 40) {
                        indian.x += 20;
                    }
                } else if (key == 37) {
                    if (indian.x > 0) {
                        indian.x -= 20;
                    }
                }
                else if (key == 38) {
                    if (indian.y >270) {
                        indian.y -= 20;
                    }
                }
                else if (key==40)  {
                    if (indian.y <520) {
                        indian.y += 20;
                    }
                }
            }
            /*** generate different list of piranhas (from the top, from bottom, random and ordered etc)***/
            function piranhaFromBirdRight() {
                if (Math.random() > 0.99) {
                    listBirdRight.push({
                        x: birdR.x,
                        y: 50
                    })
                }
            }
            function piranhaFromBirdLeft() {
                if (Math.random() > 0.99) {
                    listBirdLeft.push({
                        x: birdL.x+50,
                        y: 100
                    })
                }
            }

            function piranhaFromBottomOrder(m, array) {
                array.push({
                    x: m,
                    y: 540
                })
            }

            function piranhaBottomRare() {
                for (var i=100;i<1100;i+=350) {
                    piranhaFromBottomOrder(i, listOrderRare);
                }
            }

            function piranhaBottomDense() {
                for (var i=100;i<1100;i+=100) {
                    piranhaFromBottomOrder(i, listOrderDense);
                }
            }


            function piranhaFromBottomRandom() {
                if (Math.random() > 0.99) {
                    var temp = 100 + Math.floor( Math.random() * ( 1100 - 100 + 1 ) );
                    listBottomRandom.push({
                        x: temp,
                        y: 540
                    })
                }
            }
            /*** draw different list types***/
            function drawBottomPiranha(array, img, speedFish) {
                for (var i in array) {
                    var element = array[i];
                    while (element.y >270 && element.x < 1050) {
                        context.drawImage(img, element.x, element.y, 50, 50);
                        element.x += speedFish;
                        element.y -= speedFish;
                        scoresCalculatorCollision(element);
                        element.shift();
                    }
                }
            }

            function drawPiranhaDirectionDown(array, img, speedFish){
                for (var i in array) {
                    var element = array[i];
                    context.drawImage(img, element.x, element.y, 50, 50);
                    element.y += speedFish;
                    scoresCalculatorCollision(element);
                }
            }

            function drawPiranhaDirectionUp(array, img, speedFish){
                for (var i in array) {
                    var element = array[i];
                    context.drawImage(img, element.x, element.y, 50, 50);
                    element.y -= speedFish;
                    scoresCalculatorCollision(element);
                }
            }
            /*** by collision of a piranha and the indian various events generate (minus points,
             * indian returns to the starter position, checking of the scores etc.)***/
            function scoresCalculatorCollision(element) {
                if (distanceTo(element.x, element.y, indian.x, indian.y) <40){
                    score -= 50;
                    document.getElementById("score").innerHTML= score;
                    context.drawImage(crash, indian.x, indian.y, 80, 80);
                    displayMessage("BANG!! Back to the island.");
                    if (score <=0 && lives <=0) {
                        checkLevelCompleted();
                    }else if (score<=0){
                        lives--;
                        document.getElementById("lives").innerHTML= lives;
                    }
                    indian.x=20;
                    indian.y=520;
                }
            }


            /*** call of various functions with parameter of the speed of piranjas***/
            function drawPiranhaBothDirection(speedFish) {
                drawPiranhaDirectionDown(listBirdRight, imgFish3, speedFish);
                drawPiranhaDirectionUp(listBottomRandom, imgFish1, speedFish);
                drawPiranhaDirectionDown(listBirdLeft, imgFish2, speedFish);
            }
            /*** removes the elements of the list when it reaches a given coordinate ***/
            function removePiranhaBothDirection() {
                if (listBirdRight.length > 0 && listBirdRight[0].y > 600) {
                    listBirdRight.shift();
                }
                if (listBottomRandom.length > 0 && listBottomRandom[0].y <= 270) {
                    listBottomRandom.shift();
                }
                if (listBirdLeft.length > 0 && listBirdLeft[0].y > 600) {
                    listBirdLeft.shift();
                }
            }
            /*** compares the distance of 2 objects by collision ***/
            function distanceTo(obj1x, obj1y, obj2x, obj2y) {
                var dx = obj2x- obj1x;
                var dy = obj2y - obj1y;
                return Math.sqrt(dx * dx + dy * dy)
            }
            /*** check the state of the gamer in base of the obtained results ***/
            function checkLevelCompleted() {
                if (indian.x >1050) {
                    message = "You've superated " + level + " th level.";
                    displayMessage(message);
                    document.getElementById("text").innerHTML = message;
                    //var n = new Notification("Attention", {body: "message"});
                    setTimeout(function() {message="Hey! Look here!";
                        document.getElementById("text").innerHTML=message;
                    }, 2500);
                    if (lives<=0) {
                        displayMessage("GAME OVER");
                        alert("GAME OVER");
                        startNewGame();
                    }
                    level++;
                    score+=50;
                    document.getElementById("level").innerHTML= level;
                    document.getElementById("score").innerHTML= score;
                    indian.x = 20;
                    indian.y = 520;
                    reload();
                    if (goldArray.length!=0) {
                        while (goldArray.length >0) {
                            goldArray.pop();
                        }
                    }
                }
            }