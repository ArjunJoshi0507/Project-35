class Food{
    constructor(){
        this.foodStock = 0;
        this.lastFed = 0;
        this.image = loadImage("images/Milk.png")
    }
    getfoodStock(){
        return this.foodStock
    }
    updatefoodStock(x){
        this.foodStock = x;
    }
    display(){
        var x = 80
        var y = 100
        if(this.foodStock!= 0){
            for(var i = 0 ; i<this.foodStock ; i++){
                if(i%10 === 0){
                    x = 80;
                    y = y+50;
                }
                image(this.image,x,y,50,50)
                x = x+50
            }
        }
    }
}