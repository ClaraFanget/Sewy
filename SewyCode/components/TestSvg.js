//Composant test qui ma permis de comprendre comment fonctionne le SVG
import React from "react";
import Svg, { Line, Rect } from "react-native-svg";

export function TestSvg({ x, y, largeur, hauteur }) {
  return (
    <Svg width={largeur + x + 10} height={hauteur + y + 10}>
      <Rect
        x={x}
        y={y}
        width={largeur}
        height={hauteur}
        stroke="blue"
        strokeWidth="2"
        fill="white"
      />
      <Line x1={x} y1={y} x2={200} y2={y} stroke="red" strokeWidth="2" />
      <Line x1={x} y1={y} x2={x} y2={-300} stroke="black" strokeWidth="2" />
    </Svg>
  );
}
