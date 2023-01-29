
var gameState="start"
var rabbit
var fruitsGroup 
var branchGroup
var score=0
var life=2
function preload(){
    apple=loadImage("apple.png")
    bg=loadImage("background.jpg")
    banana=loadImage("banana.png")
    blueberry=loadImage("blueberry.png")
    branchLeft=loadImage("branchleft.png")
    branchRight=loadImage("branchright.png")
    grapes=loadImage("grapes.png")
    rabbitCrying=loadImage("rabbitcrying.png")
    rabbitRequesting=loadImage("rabbitrequesting.png")
    rabbitSitting=loadImage("rabbitsitting.png")
    strawberry=loadImage("strawberry.png")
    cloudImage=loadImage("Cloud.png")
    restart=loadImage("restartButton.png")
    backgroundMusic=loadSound("ptdBackgroundMusic.m4a")
    eating=loadSound("eating_sound.mp3")
    sad=loadSound("sad.wav")
    playButton=loadImage("PlayButton.png")
}
function setup(){
    createCanvas(windowWidth,windowHeight)
    
    rabbit=createSprite(width/2,height-70)
    rabbit.addImage("sitting",rabbitSitting)
    rabbit.scale=0.6
    rabbit.addImage("crying",rabbitCrying)
    rabbit.addImage("requesting",rabbitRequesting)
    fruitsGroup=createGroup()
    branchGroup=createGroup()
    
    cloud=createSprite(width/2,height/2,40,30)
    cloud.addImage(cloudImage)

    restartButton=createSprite(width/2,height/2,40,30)
    restartButton.addImage(restart)
    restartButton.scale=0.08

    play=createSprite(width/2,height/2)
    play.addImage(playButton)
    play.scale=0.5
    
    
}
function draw(){
    background(bg)
    drawSprites()
    textSize(30)
    fill("white")
    text("Score:"+score,50,70)
    fill("black")
    text("Lives:"+life,width-150,70)
    if(!backgroundMusic.isPlaying()){
        backgroundMusic.play()
        backgroundMusic.setVolume(1)
    }
    if(gameState=="start"){
        play.visible=true
        cloud.visible=false
        restartButton.visible=false
        rabbit.visible=false

        textSize(70)
        fill("pink")
        textAlign(CENTER)
        text("Bunny's fruit",width/2,height/2+220)
        if(mousePressedOver(play)){
            gameState="play"
        }
    }

    if(gameState=="play"){
        play.visible=false
        cloud.visible=false
        restartButton.visible=false
        rabbit.visible=true
        rabbit.changeImage("sitting")
        if(keyDown(LEFT_ARROW)){
            rabbit.x-=10
        }
        if(keyDown(RIGHT_ARROW)){
            rabbit.x+=10
        }
        fruits()
        branches()
        for(var i=0;i<fruitsGroup.length;i++){
            if(fruitsGroup[i].isTouching(rabbit)){
                fruitsGroup[i].destroy()
                score+=5
                eating.play()
                eating.setVolume(2)
            }

        }
        for (var i=0;i<branchGroup.length;i++){
            if(branchGroup[i].isTouching(rabbit)){
                branchGroup[i].destroy()
                life-=1
                sad.play()
                rabbit.changeImage("requesting")
                gameState="stop"
            }
        }
        if(life==0){
            gameState="end"
        }
    }
    if(gameState=="stop"){
        play.visible=false
        backgroundMusic.stop()
        cloud.visible=true
        rabbit.visible=true
        restartButton.visible=true
        cloud.x=rabbit.x
        restartButton.x=cloud.x
        restartButton.y=cloud.y-10
        textSize(30)
        fill("black")
        textAlign(CENTER)
        text("I want to eat fruits only",cloud.x,cloud.y-40)
        fruitsGroup.destroyEach()
        branchGroup.destroyEach()
        if(mousePressedOver(restartButton)){
            gameState="play"
            backgroundMusic.play()
        }
    }
    if(gameState=="end"){
        play.visible=false
        backgroundMusic.stop()
        cloud.visible=false
        rabbit.visible=true
        restartButton.visible=false
        fruitsGroup.destroyEach()
        branchGroup.destroyEach()
        textSize(50)
        fill("black")
        textAlign(CENTER)
        text("Game Over",width/2,height/2)
        rabbit.changeImage("crying")
    }
   
}
function fruits(){
    if (frameCount % 60 === 0){
        var fruit = createSprite(100,-50,10,40);
        fruit.x=random(100,width-100)
        fruit.velocityY = +5;
            var rand = Math.round(random(1,5));
            switch(rand) {
            case 1: fruit.addImage(strawberry);
                    break;
            case 2: fruit.addImage(apple);
                    break;
            case 3: fruit.addImage(banana);
                    break;
            case 4: fruit.addImage(blueberry);
                    break;
            case 5: fruit.addImage(grapes);
                    break;
            default: break;
            }       
            fruit.scale = 0.3;
            fruit.lifetime = 300;
            fruitsGroup.add(fruit);
    }
}
function branches(){
    if(frameCount%90==0){
        branch=createSprite(random(100,width-100),-50,40,20)
        branch.velocityY=+5
        var rand=Math.round(random(1,2))
        switch(rand){
            case 1: branch.addImage(branchLeft)
            break
            case 2: branch.addImage(branchRight)
            break
            default: break
        }
        branch.scale=0.4
        branch.lifetime=400
        branchGroup.add(branch)

    }
}