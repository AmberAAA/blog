import { AnimationAction, AnimationMixer, Clock, Group, Object3D} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";


export class Robot3D {
  
  constructor (public z: number) {};

  public scene: Group;
  public mixer: AnimationMixer;
  public action: AnimationAction;
  private readonly clock = new Clock();

  public get isInit () {
    return !!this.scene;
  }

  async init () {
    return new Promise<void>(res => {
      const loader = new GLTFLoader();
      loader.setPath("/");
      loader.load('buster_drone.glb', (gltf) => {
        this.scene = gltf.scene;
        this.scene.children.forEach(e => this.mapChild(e))
        this.format();
        this.mixer = new AnimationMixer(this.scene);
        this.action = this.mixer.clipAction(gltf.animations[0]);
        this.action.play();
        this.initEvent();
        res();
      })
    })
  }

  private mapChild (obj: Object3D) {
    if (obj.name === 'Scheibe') {
      obj.visible = false;
      return;
    }
    if (obj.children.length) {
      obj.children.forEach(e => this.mapChild(e))
    }
  }

  private format () {
    const z = this.z;
    this.scene.scale.set(z, z, z);
    this.scene.position.set(0, 0, 0);
  }

  public animate() {
    if (this.mixer) {
      this.mixer.update(this.clock.getDelta());
    }
  }

  public initEvent () {
    window.document.addEventListener("mousemove", e => {
      const factor = Math.PI / 180 * 30
      const x = e.clientX / window.innerWidth * factor  - factor;
      const y = e.clientY / window.innerHeight * factor - factor;
      this.lookAt(y, x);
    });
  }
  

  public lookAt (x, y) {
    if (!this.isInit) return;
    this.scene.rotation.set(x, y, 0)
  }
}