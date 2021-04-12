class Player {
  constructor(){
    this.index = null;
    this.distance = -300;
    this.name = null;
    this.ended = null;
    this.leaderBoard = null;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance,
      rank:this.leaderBoard
    });
  }

  getCarsAtEnd()
  {
    database.ref('carsAtEnd').on("value", (data)=> {
      this.ended = data.val()
    })
  }

  static updateCarsAtEnd(ended)
  {
    database.ref('/').update({
      carsAtEnd: ended
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
}