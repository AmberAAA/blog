import React, { FC, useEffect, useRef } from "react";
import { WebGLRenderer, PerspectiveCamera, Scene, Color, AmbientLight, PointLight, RectAreaLight, Vector3, DirectionalLight, DirectionalLightHelper, CameraHelper } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import styled from "styled-components";

const Cont = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 400px;
  height: 400px;
  z-index: 10;
  cursor: pointer;
`;

export const Robot: FC = () => {

  const ref = useRef<HTMLDivElement>(null);

  const start = () => {
    const camera = new PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0 , 8);
    camera.lookAt(new Vector3(0,0,0));

    const scene = new Scene();

    const loader = new GLTFLoader();
    loader.setPath("/robot/");
    loader.load("scene.gltf", (e) => {
      const modal = e.scene;
      const z = 0.05;
      modal.scale.set(z, z, z);
      modal.position.set(0,0,0);
      scene.add(modal);
      renderer.render(scene, camera);
    })
      
    const light = new AmbientLight(0xffffff, 1);
    scene.add(light);


    const rectLight = new DirectionalLight( 0xbbbbbb, 1);
    rectLight.position.set( 15, 15, 15 );
    rectLight.lookAt( 0, 0, 0 );
    scene.add( rectLight );

    const renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);

    const controls = new OrbitControls(camera, renderer.domElement);

    const r = () => {
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(r);
    }

    r();


    ref.current.appendChild(renderer.domElement);
  }


  useEffect(() => {

    if (ref.current) {
      start()
    }
  }, [ref])
  
  
  return <Cont className="container" ref={ref}></Cont>
}