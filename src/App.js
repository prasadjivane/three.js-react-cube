import { useEffect } from 'react';
import "./App.css"
import * as THREE from 'three';
import { GUI } from 'dat.gui';
import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('threeDemo');
    test.initialize();
    test.animate();

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( {color: 0x46fcfc} );
    const cube = new THREE.Mesh(geometry, material);
    test.scene.add( cube );
    const gui = new GUI();
    const geometryFolder = gui.addFolder('Mesh Geometry');
    geometryFolder.open();
    const rotationFolder = geometryFolder.addFolder('Rotation');
    rotationFolder.add(cube.rotation, 'x', 0, Math.PI).name('Rotate X Axis');
    rotationFolder.add(cube.rotation, 'y', 0, Math.PI).name('Rotate Y Axis');
    rotationFolder.add(cube.rotation, 'z', 0, Math.PI).name('Rotate Z Axis');
    const scaleFolder = geometryFolder.addFolder('Scale');
    scaleFolder.add(cube.scale, 'x', 0, 2).name('Scale X Axis');
    scaleFolder.add(cube.scale, 'y', 0, 2).name('Scale Y Axis');
    scaleFolder.add(cube.scale, 'z', 0, 2).name('Scale Z Axis');
    scaleFolder.open();

    const materialFolder = gui.addFolder('Mesh Material');
    const materialParams = {
      cubeColor: cube.material.color.getHex(),
    };
    materialFolder.add(cube.material, 'wireframe');
    materialFolder
      .addColor(materialParams, 'cubeColor')
    return () => {
      gui.destroy();
    };
  }, []);

  return (
    <div>
      <canvas id="threeDemo" />
    </div>
  );
}

export default App;
