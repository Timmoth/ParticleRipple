import * as THREE from "three";
import MyScene from "./MyScene";

export default class App {
  scene: MyScene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  lastTimeStamp: number;

  constructor() {
    let canvas = document.getElementById(
      "ParticleRipple-canvas"
    ) as HTMLCanvasElement;
    const width = (canvas.width = 500);
    const height = (canvas.height = 500);

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(width, height);

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 15;

    this.scene = new MyScene();
    this.lastTimeStamp = 0;
  }

  Start() {
    this.running = true;
    this.tick();
  }

  Stop() {
    this.running = false;
  }

  running: boolean;

  tick() {
    if (!this.running) return;
    this.scene.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame((n) => this.tick());
  }
}
