import * as THREE from "three";
import { BufferGeometry } from "three";

export default class MyScene extends THREE.Scene {
  time: number;
  yOff: number;
  points: THREE.Points;
  coords: THREE.Vector3[];

  constructor() {
    super();

    const geom = new THREE.PlaneGeometry(50, 50, 128, 128);
    const colors = [];
    const vertices = [];
    this.coords = [];
    const color = new THREE.Color();
    var positionAttribute = geom.attributes.position;
    for (var i = 0; i < positionAttribute.count; i++) {
      var x = positionAttribute.getX(i);
      var y = positionAttribute.getY(i);
      var z = positionAttribute.getZ(i);
      this.coords.push(new THREE.Vector3(x, y, z));
      vertices.push(x, y, z);
      colors.push(color.r, color.g, color.b);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const sprite = new THREE.TextureLoader().load("static/textures/disc.png");
    const material = new THREE.PointsMaterial({
      size: 0.3,
      opacity: 0.8,
      map: sprite,
      sizeAttenuation: true,
      alphaTest: 0.5,
      transparent: true,
      vertexColors: true,
    });

    this.points = new THREE.Points(geometry, material);

    this.add(this.points);

    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(-10, 15, 50);
    this.add(light);
    this.time = 0;
    this.points.rotation.x = -Math.PI / 7;
  }

  update() {
    this.time += 0.015;
    this.updateGeometry(this.points.geometry);
  }

  updateGeometry(geometry: BufferGeometry) {
    var positionAttribute = geometry.attributes.position;
    var colorAttribute = geometry.attributes.color;

    for (var i = 0; i < this.coords.length; i++) {
      var c = this.coords[i];

      var dist = (c.x * c.x + c.y * c.y) / 4;
      var z =
        5 *
        Math.exp(-0.05 * dist) *
        Math.sin((2 * Math.PI * dist) / 30 - this.time);
      const color = new THREE.Color();
      color.setHSL(dist * 0.01, 1, 0.5);
      colorAttribute.setXYZ(i, color.r, color.g, color.b);
      positionAttribute.setXYZ(i, c.x, c.y, z);
    }
    positionAttribute.needsUpdate = true;
    colorAttribute.needsUpdate = true;
  }
}
