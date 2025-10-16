"use client";

import React from "react";
import DotGrid from "../DotGrid";
import RippleGrid from "../RippleGrid";
import Particles from "../Particles";



const BackgroundContainter = () => {
  return (
    <div className="h-screen w-screen fixed z-0 top-0 left-0">
      {/* @ts-ignore */}
      <Particles
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
      {/* <RippleGrid
      enableRainbow={false}
      gridColor="#ffffff"
      rippleIntensity={0.05}
      gridSize={10}
      gridThickness={15}
      mouseInteraction={true}
      mouseInteractionRadius={1.2}
      opacity={0.8}
    /> */}
      {/* <DotGrid
    dotSize={10}
    gap={15}
    baseColor="#5227FF"
    activeColor="#5227FF"
    proximity={120}
    shockRadius={250}
    shockStrength={5}
    resistance={750}
    returnDuration={1.5}
  /> */}
    </div>
  );
};

export default BackgroundContainter;
