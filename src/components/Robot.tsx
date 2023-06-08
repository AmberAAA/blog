import React, { FC, useEffect, useRef, useState } from "react";
import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  AmbientLight,
  Vector3,
  SRGBColorSpace,
  ACESFilmicToneMapping,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import styled from "styled-components";
import { Robot3D } from "../3d/robot";

const SIZE = 400;
const Cont = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: ${SIZE}px;
  height: ${SIZE}px;
  z-index: 10;
  cursor: pointer;
`;

export const Robot: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [robot] = useState(new Robot3D(1));

  const start = () => {
    const camera = new PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 4);
    camera.lookAt(new Vector3(0, 0, 0));

    const scene = new Scene();

    const loader = new GLTFLoader();
    loader.setPath("/");

    robot.init().then(() => {
      scene.add(robot.scene);
      renderer.render(scene, camera);
    })


    const light = new AmbientLight(0xededed, 0.8);
    scene.add(light);

    const renderer = new WebGLRenderer({
      antialias: false,
      alpha: true,
    });
    renderer.setSize(SIZE, SIZE);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 4;

    const controls = new OrbitControls(camera, renderer.domElement);

    const r = () => {
      controls.update();
      robot.animate();
      renderer.render(scene, camera);
      window.requestAnimationFrame(r);
    };

    window.requestAnimationFrame(r);
    ref.current.appendChild(renderer.domElement);
  };

  useEffect(() => {
    if (ref.current) {
      start();
    }
  }, [ref]);

  return <Cont className="container" ref={ref}></Cont>;
};
