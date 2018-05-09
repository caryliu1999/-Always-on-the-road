const {ccclass, property} = cc._decorator;
@ccclass
export class ImpulseManager extends cc.Component
{
    @property(cc.Vec2)
    private impulse:cc.Vec2 = cc.v2(0, 1000);
    onBeginContact(contact:any, selfCollider:any, otherCollider:any)
    {
        let manifold = contact.getWorldManifold();
        if (manifold.normal.y < 1) return;

        let body = otherCollider.body;
        body.linearVelocity = cc.v2();
        body.applyLinearImpulse(this.impulse, body.getWorldCenter(), true);
    }
    onLoad()
    {

    }
}