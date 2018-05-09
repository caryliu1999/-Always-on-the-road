
const {ccclass, property} = cc._decorator;
@ccclass
export class CameraManager extends cc.Component
{
    @property(cc.Node)
    private target: cc.Node = null;
    private camera: cc.Camera;
    onLoad() 
    {
        this.camera = this.getComponent(cc.Camera);
    }
    onEnable() 
    {
        cc.director.getPhysicsManager().attachDebugDrawToCamera(this.camera);
    }
    onDisable()
    {
        cc.director.getPhysicsManager().detachDebugDrawFromCamera(this.camera);
    }
    // called every frame, uncomment this function to activate update callback
    lateUpdate()
    {
        let targetPos = this.target.convertToWorldSpaceAR(cc.Vec2.ZERO);
        this.node.position = this.node.parent.convertToNodeSpaceAR(targetPos);
        let ratio = targetPos.y / cc.winSize.height;
        this.camera.zoomRatio = 1 + (0.5 - ratio) * 0.5;
    }
}