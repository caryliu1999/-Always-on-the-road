const {ccclass, property} = cc._decorator;
@ccclass
export class HeroManager extends cc.Component
{
    @property
    private maxSpeed:number = 500;
    @property
    private jumps:number =  2;
    @property
    private acceleration:number =  1500;
    @property
    private jumpSpeed:number =  200;
    @property
    private drag:number =  600;
    private MOVE_LEFT:number = 1;
    private MOVE_RIGHT:number = 2;
    private _moveFlags:number = 0;
    private _up:boolean = false;
    private body:cc.RigidBody = null;
    private _upPressed:boolean = false;
    onLoad() 
    {
        cc.director.getPhysicsManager().enabled = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this._moveFlags = 0;
        this._up = false;
        this.body = this.getComponent(cc.RigidBody);
    }
    onKeyDown (event) 
    {
        switch(event.keyCode) 
        {
            case cc.KEY.a:
            case cc.KEY.left:
                this._moveFlags |= this.MOVE_LEFT;
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                this._moveFlags |= this.MOVE_RIGHT;
                break;
            case cc.KEY.up:
                if (!this._upPressed) {
                    this._up = true;
                }
                this._upPressed = true;
                break;
        }
    }
    onKeyUp (event) 
    {
        switch(event.keyCode) 
        {
            case cc.KEY.a:
            case cc.KEY.left:
                this._moveFlags &= ~this.MOVE_LEFT;
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                this._moveFlags &= ~this.MOVE_RIGHT;
                break;
            case cc.KEY.up:
                this._upPressed = false;
                break;
        }
    }
    update(dt:any) 
    {
        var speed = this.body.linearVelocity;

        if(this._moveFlags === this.MOVE_LEFT) 
        {
            // this.anim.play('walk');
            if(this.node.scaleX > 0) 
            {
                this.node.scaleX *= -1;
            }
            speed.x -= this.acceleration * dt;
            if(speed.x < -this.maxSpeed) 
            {
                speed.x = -this.maxSpeed;
            }
        } 
        else if (this._moveFlags === this.MOVE_RIGHT) 
        {
            // this.anim.play('walk');
            if(this.node.scaleX < 0) 
            {
                this.node.scaleX *= -1;
            }
            speed.x += this.acceleration * dt;
            if(speed.x > this.maxSpeed) 
            {
                speed.x = this.maxSpeed;
            }
        }  
        else 
        {
            if(speed.x != 0) 
            {
                var d = this.drag * dt;
                if(Math.abs(speed.x) <= d) 
                {
                    speed.x = 0;
                    // this.anim.play('idle');
                } 
                else
                {
                    speed.x -= speed.x > 0 ? d : -d;
                }
            }
        }
        if(Math.abs(speed.y) < 1) 
        {
            this.jumps   = 2;
        }
        if (this.jumps > 0 && this._up) 
        {
            speed.y = this.jumpSpeed;
            this.jumps--;
        }
        this._up = false;
        this.body.linearVelocity = speed;
    }
}