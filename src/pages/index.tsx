import React, { useState } from "react";
import { Transform3d } from "react-css-transform";
import { useWindowDimensions } from "../hooks/window";
import { rhythm } from "../utils/typography";
const unhex = str => str.substring(str.indexOf('#') + 1);

const plus2 = (fill = colors.MidnightBlue, opacity = 1) =>
  `url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%20fill%3D%22%23${unhex(
    fill
  )}%22%20fill-opacity%3D%22${opacity}%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')`;

const svgstring = (fill: string) => `<svg width="20" height="20" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><circle cx="25" cy="25" r="4" stroke="blue" stroke-width="0" fill="${unhex(fill)}" /></svg>`;

const plus = (fill = colors.MidnightBlue, opacity = 1) =>
  `url('data:image/svg+xml,${svgstring(fill)}')`;

const colors = {
  "LightPink": "#fcb0b3",
  "Umber": "#6b6054",
  "LightGreen": "#91f5ad",
  "MidnightBlue": "#090446",
  "MediumPurple": "#9381ff",
};

const st = {
  backgroundColor: colors.LightPink,
  backgroundImage: plus(),
};

const Logo = ({ x0, x1, y0, y1 }) => {
  const total = 100;
  const tl = `${total * x0} ${total * y0}`;
  const bl = `${total * x0} ${total * y1}`;
  const br = `${total * x1} ${total * y1}`;

  return <svg width="100%" height="100%" preserveAspectRatio="none" viewBox={`0 0 ${total} ${total}`} xmlns="http://www.w3.org/2000/svg">
    <path d={`M0 ${total * 0.8} L${tl} L${bl} L0 ${total}`} fill={colors.LightGreen} />
    <path d={`M${bl} L0 ${total} L${total * 0.4} ${total} L${br}`} fill={colors.MediumPurple} />
    <path d={`M${tl} Q${total * 0.45} ${total * 0.0} ${total * 0.6} ${total * y0} T ${total * x1} ${total * y0}`} stroke={colors.MidnightBlue} strokeWidth={total * 0.1} fill="none" />

    <path d={`M${tl} Q${total * 0.45} ${total * 0.0} ${total * 0.6} ${total * y0} T ${total * x1} ${total * y0} L${br} L${bl}`} strokeWidth={total * 0.01} fill="#223" />
  </svg>;
}

const HeroicPopout = ({ height, width }) => {
  const HERO_SCALE = 0.9;
  const boxCoords = {
    x0: 0.1,
    x1: 0.9,
    y0: 0.1,
    y1: 0.5,
  };

  return <div style={{
    position: "absolute",
    minWidth: 850,
    bottom: 0,
    left: 0,
    height: height * HERO_SCALE,
    width: width * HERO_SCALE,
    backgroundColor: "transparent",
  }}>
    <Logo {...boxCoords} />
    <h1 style={{
      color: colors.LightPink,
      padding: rhythm(2),
      margin: 0,
      position: "absolute",
      top: height * boxCoords.y0 * HERO_SCALE,
      left: width * boxCoords.x0 * HERO_SCALE,
      right: width * (1 - boxCoords.x1) * HERO_SCALE,
    }}>{"Fundementals of Design"}</h1>
  </div>
};

const translateToCentre = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
};

const theta = Math.PI / 3;
const xAxis = { x: 1, y: 0, z: 0 };
const yAxis = { x: 0, y: 1, z: 0 };
const zAxis = { x: 0, y: 0, z: 1 };

const a = { x: 1.2, y: -0.4, z: 0.4 };

export default function Home() {
  const { width, height } = useWindowDimensions();
  const [isShown, setIsShown] = useState(false);

  return <div>
    <div style={{ ...st, height, width }} >
      <HeroicPopout height={height} width={width} />
    </div>
    <div style={{
      height: 100, width: 100, backgroundColor: "blue"
    }} />

    <Transform3d rotate={theta} rotateAxis={a} translate={{ x: 100 }}>
      <div
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        style={{
          width: 1000,
          height: 1000,
          border: "4px solid black",
          margin: 50,
          background: isShown ? "#fee" : '#faa',
          borderRadius: 50,
          boxShadow: "5px 25px",
          backgroundImage: isShown
            ? `radial-gradient( circle farthest-corner at 10% 20%,  rgba(255,229,168,1) 0%, rgba(251,174,222,1) 100.7% )`
            : `radial-gradient( circle farthest-corner at 10% 20%,  rgba(251,174,222,1) 0%, rgba(255,229,168,1) 100.7% )`,
        }} >
        <h2>
          {`Props tiplicationOrder
Optional. An enum: either MULTIPLICATION_ORDER.PRE or MULTIPLICATION_ORDER.POST. This determines the order an object's local matrix is multiplied with it's parent's matrix world. The default is MULTIPLICATION_ORDER.POST. You can only set this at the most outer Transform2d component. PRE will mimic how the transforms would be applied if you were doing them as actual nested DOM elements. POST is much more natural mathematically and way more useful. You should use POST :)
Optional. An object describing translation. Either a plain JS object or a gl-matrix vec3. If you pass in a JS object without all dimensions, missing dimensions will be given 0 as the default value. If nothing is supplied no translation occurs.
Optional. The transform's scale. either a number, a plain JS object or a gl-matrix vec3. A number will apply the same scale to x, y and z. If you pass in a JS object without all dimensions, missing dimensions will be given 1 as the default value. If nothing is supplied no scaling occurs. `}
        </h2>
      </div>
    </Transform3d>


    <Transform3d rotate={theta} rotateAxis={a}>
      <div style={{ width: 1000, height: 1000, marginTop: -666, background: '#faa', borderRadius: 50, borderWidth: 5, borderColor: "black" }} >
        <p>{`Props
- multiplicationOrder
Optional. An enum: either MULTIPLICATION_ORDER.PRE or MULTIPLICATION_ORDER.POST. This determines the order an object's local matrix is multiplied with it's parent's matrix world. The default is MULTIPLICATION_ORDER.POST. You can only set this at the most outer Transform2d component. PRE will mimic how the transforms would be applied if you were doing them as actual nested DOM elements. POST is much more natural mathematically and way more useful. You should use POST :) `}</p>
      </div>
    </Transform3d>
    <Transform3d rotate={theta} rotateAxis={yAxis}>
      <div style={{ width: 100, height: 100, margin: 5, background: '#0f0' }} />
    </Transform3d>

  </div >;
};
