"use client";

import React from "react";
import Squares from "../Squares";
import DotGrid from "../DotGrid";
import RippleGrid from "../RippleGrid";
import Particles from "../Particles";

const BackgroundContainter = () => {
  return (
    <div className="h-screen w-screen fixed z-[-1] top-0 left-0">
      {/* @ts-ignore */}
      <DotGrid
        dotSize={3}
        gap={30}
        baseColor="#271E37"
        activeColor="#1C0641"
        proximity={120}
        shockRadius={250}
        shockStrength={5}
        resistance={750}
        returnDuration={1.5}
      />
      {/* <Squares
        speed={0}
        squareSize={40}
        direction="diagonal" // up, down, left, right, diagonal
        borderColor="#1C0641"
        hoverFillColor="#222"
      /> */}
      {/* <Particles
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={500}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      /> */}
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
