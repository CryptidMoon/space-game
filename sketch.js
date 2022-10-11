var playership,playershipImg
var alienship1,alienship2,alienship3,alienship4
var laserbullet,laserbulletImg
var restartbutton,restartbuttonImg
var bulletgroup, aliengroup
var score=0
var play=1
var end=0
var gameState=play

function preload(){
    playershipImg=loadImage('Playership.png');
    alienship1=loadImage('Mothership.png');
    alienship2=loadImage('alienship.png');
    alienship3=loadImage('alienship1.png');
    alienship4=loadImage('alienship2.png');
    laserbulletImg=loadImage('laser.png');
    restartbuttonImg=loadImage('restartbutton.png')

}

function setup(){
    createCanvas(1500,800)

    playership=createSprite(100,100)
    playership.addImage(playershipImg)

    restartbutton=createSprite(1200,80)
    restartbutton.addImage(restartbuttonImg)
    restartbutton.scale=0.6

    bulletgroup=new Group()
    aliengroup=new Group()
}

function draw(){
    background('darkblue')
    if(gameState==play){
        if (bulletgroup.isTouching(aliengroup)){
            bulletgroup.destroyEach()
            aliengroup.destroyEach()
            score+=1
        }
        spawnAliens()
        if (keyDown("space")){
        spawnBullet()
    }
    if (playership.isTouching(aliengroup)){
        gameState=end
    }

    }
    else if(gameState==end){
        playership.destroy()
        aliengroup.destroyEach()
        textSize(50)
        text("Game Over!",600,400)
        aliengroup.setVelocityXEach(0)
        aliengroup.setVelocityYEach(0);
        if(mousePressedOver(restartbutton)){
            score=0;
            gameState=play;
            spawnBullet;

        }

    }

    if(score==20){
        textSize(50)
        text("You Win!",650,400)
        gameState="win"
    }

    textSize(30)
    text("Score:"+score,1300,100)
    playership.x=mouseX
    playership.y=mouseY
   

    drawSprites()
}

function spawnAliens(){
    if(frameCount % 30 == 0){
        var alienships=createSprite(random(50,1400),random(50,1400))
        alienships.velocityX=random(10,-10);
        alienships.velocityY=random(10,-10);
        alienships.debug=false
        alienships.setCollider("circle",0,0,50)

        var rand=Math.round(random(1,4));
        switch(rand){
            case 1: alienships.addImage(alienship1);
                    break;
            case 2: alienships.addImage(alienship2);
                    break;
            case 3: alienships.addImage(alienship3);
                    break;
            case 4: alienships.addImage(alienship4);
                    break;
            default: break;
        }
        aliengroup.add(alienships)
    }
}
function spawnBullet(){
    var bullet=createSprite(playership.x,playership.y)
    bullet.addImage(laserbulletImg)
    bullet.velocityX=15 
    bulletgroup.add(bullet)
}