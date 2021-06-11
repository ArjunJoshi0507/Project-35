var dogHappy
var dogStand
var foodS
var FoodStock
var foodObject
var lastFed

function preload()
{
	dogHappy = loadImage("images/dogHappy.png");
  dogStand = loadImage("images/dogStand.png");
  //load images here
}

function setup() {
	createCanvas(1000, 400);
  database = firebase.database();
  foodStock = database.ref('Food')
  foodStock.on("value",readStock);
  dog = createSprite(800,200,100,100);
  dog.scale =0.25
  dog.addImage(dogStand)
  addFood = createButton("Add Food");
  addFood.position(800,100);
  addFood.mousePressed(addF);
  feedFood = createButton("Feed Dog")
  feedFood.position(700,100);
  feedFood.mousePressed(feed);
  foodObject = new Food()
}
function readStock(data){
  foodS = data.val();
  foodObject.updatefoodStock(foodS);
 
 }

 function addF(){
   foodS++
   database.ref("/").update({
     Food : foodS
   })
 }

function feed(){
  dog.addImage(dogHappy)
  if(foodObject.getfoodStock()<=0){
    foodObject.updatefoodStock(0)
    
  }
  else{
    foodObject.updatefoodStock(foodObject.getfoodStock()-1)
  }
  database.ref("/").update({
    Food : foodObject.getfoodStock(),
    feedTime : hour()
  })
}
 /*function writeStocks(x){
  dog.addImage(dogHappy)
   if(x<=0){
      x=0;
   }
   else{
     x=x-1
   }
 
   database.ref('/').update({
     Food:x
   })
  }
*/
function draw() {  
background(46, 139, 87);

foodObject.display()

  drawSprites();
  //add styles here
  text("Note: Press UP_ARROW Key To Feed the Pup! ",250, 50)
  textSize(25)
  text("Food remaining :"+foodS,250,200)

  database.ref("feedTime").on("value",function(data){
    lastFed = data.val()
  })
  fill(255)

  if(lastFed>=12){
  text("Last Fed : " + lastFed % 12 + "pm",300,50)
  }
  else if(lastFed == 0){
    text("Last Fed : 12 am",300,50)
  }
  else{
    text("Last Fed : " + lastFed + "am",300,50)
  }
}