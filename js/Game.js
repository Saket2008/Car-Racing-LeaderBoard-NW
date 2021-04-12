class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);

    car1.addImage("car1", car1img);
    car2.addImage("car2", car2img);
    car3.addImage("car3", car3img);
    car4.addImage("car4", car4img);

    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    player.getCarsAtEnd();

    if(allPlayers !== undefined){
      //var display_position = 100;
      
      background("#c68767");
      image(trackImg, 0, -displayHeight * 4, displayWidth, displayHeight * 5.5);

      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 180;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);
          //cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null)
    {
      player.distance +=10
      player.update();
    }

    if (player.distance > 3700)
    {
      gameState = 2;
      //this.update(gameState);
      player.ended += 1;
      player.leaderBoard = player.ended;
      player.update();
      console.log("Your rank: " + player.leaderBoard);
      Player.updateCarsAtEnd(player.ended);
    }

    drawSprites();

    if(gameState === 2 && player.ended === 4)
    {
      end();
    }
  }

  end()
  {
    //console.log("game ended");
    background("yellow");
    camera.position.y = displayHeight/2;

    Player.getPlayerInfo();

    imageMode(CENTER);

    image(winnerImg, displayWidth/2, displayHeight/6 + 30, 100, 100);
    line(0, displayHeight/4 + 50, displayWidth, displayHeight/4 + 80);

    textSize(100);
    fill("black");
    text("Game Ended", displayWidth/2, displayHeight - 670);

    textSize(30);
    fill("red");
    text("Leaderboard:-", displayWidth/2 - 70, displayHeight/6 - 20);
    
    for(var plr in allPlayers)
    {
      if(allPlayers[plr].rank === 1)
      {
        text("1st: " + allPlayers[plr].name, displayWidth/2 - 20, displayHeight/4 + 70);
      }
      else if(allPlayers[plr].rank === 2)
      {
        text("2nd: " + allPlayers[plr].name, displayWidth/2 - 20, displayHeight/4 + 90);
      }
      else if(allPlayers[plr].rank === 3)
      {
        text("3rd: " + allPlayers[plr].name, displayWidth/2 - 20, displayHeight/4 + 130);
      }
      else if(allPlayers[plr].rank === 4)
      {
        text("4th: " + allPlayers[plr].name, displayWidth/2 - 20, displayHeight/4 + 170)
      }
    }
  }
}

