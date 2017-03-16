function Background(game, spritesheet) {
    this.spritesheet = spritesheet;
    this.ctx = game.ctx;
    Entity.call(this, game, 0, 0);

    this.ani = new Animation(this.spritesheet, undefined, undefined, undefined, undefined, undefined, undefined, .75);

};

Background.prototype = Object.create(Entity.prototype);
Background.prototype.constructor = Background;

Background.prototype.draw = function () {
    // this.ctx.drawImage(this.spritesheet,
    //                this.x, this.y);
    this.ani.drawFrame(this.game.clockTick, this.game.ctx, this.x, this.y);
};

Background.prototype.update = function () {
};



function Panda(game, spritesheetLeft, spritesheetRight, spritesheetLove) {
    this.MOVELEFT = 0;
    this.MOVERIGHT = 1;
    this.LOVE = 2;
    this.status = this.MOVELEFT;
    this.moveleft = new Animation(spritesheetLeft, 47, undefined, 141, 0.10, 3, true, 1);
    this.moveright = new Animation(spritesheetRight, 47, undefined, 141, 0.10, 3, true, 1);
    this.love = new Animation(spritesheetLove, 42, undefined, 1722, 0.10, 41, true, 1);
    this.ani = this.moveleft;
    this.speed = -100;
    Entity.call(this, game, 500, 500);
}

Panda.prototype = Object.create(Entity.prototype);
Panda.prototype.constructor = Panda;

Panda.prototype.draw = function () {
    this.ani.drawFrame(this.game.clockTick, this.game.ctx, this.x, this.y);
}

Panda.prototype.update = function () {

    if(this.game.right.press){
        this.status = this.MOVERIGHT;

    } else if(this.game.left.press){
        this.status = this.MOVELEFT;

    } else if(this.game.up.press){
        this.status = this.LOVE;
    }

    if(this.status === this.MOVELEFT){
        this.ani = this.moveleft;
        if (this.ani.elapsedTime < this.ani.totalTime * 3)
            this.x += this.game.clockTick * this.speed;
    } else if(this.status === this.MOVERIGHT){
        this.ani = this.moveright;
        if (this.ani.elapsedTime < this.ani.totalTime * 3)
            this.x -= this.game.clockTick * this.speed;
    } else if(this.status === this.LOVE){
        this.ani = this.love;
    }

 
    if (this.x >= 1000) this.x = -100;
    if (this.x <= -100) this.x = 1000;

}


// inheritance 
function DumbFish(game, spritesheet) {
    this.animation = new Animation(spritesheet, 324, 256, 11, 0.15, 11, true, 1);
    this.speed = 100;
    this.ctx = game.ctx;
    Entity.call(this, game, 700, 0);
}

DumbFish.prototype = Object.create(Entity.prototype);
DumbFish.prototype.constructor = DumbFish;

DumbFish.prototype = new Entity();
DumbFish.prototype.constructor = DumbFish;

DumbFish.prototype.update = function () {
    // Doesnt move
    Entity.prototype.update.call(this);
}

DumbFish.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

// inheritance 
function Display(game) {
    Entity.call(this, game, 125, 600);
}

Display.prototype = Object.create(Entity.prototype);
Display.prototype.constructor = Display;

Display.prototype = new Entity();
Display.prototype.constructor = Display;

Display.prototype.update = function () {
    // Doesnt move
    Entity.prototype.update.call(this);
}

Display.prototype.draw = function () {
    this.game.ctx.save();
    this.game.ctx.fillStyle = "black";
    this.game.ctx.font = "24px Arial";
    this.game.ctx.fillText("Use Arrow to make panda change movement!!", this.x, this.y);
    this.game.ctx.restore();
    Entity.prototype.draw.call(this);
}