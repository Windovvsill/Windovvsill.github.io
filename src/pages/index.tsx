import React, { useState } from "react";
import { useWindowDimensions } from "../hooks/window";
import { rhythm } from "../utils/typography";

const unhex = str => str.substring(str.indexOf('#') + 1);

const svgstring = (fill: string) => `<svg width="20" height="20" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg"><circle cx="25" cy="25" r="4" stroke="blue" stroke-width="0" fill="${unhex(fill)}" /></svg>`;

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
};

const Pyramid = ({ dx, dy, width, height }) => {
  const total = 100;

  const center = `${total / 2 + dx} ${total / 2 + dy}`;

  return <svg width={width} height={height} preserveAspectRatio="none" viewBox={`0 0 ${total} ${total}`} xmlns="http://www.w3.org/2000/svg">
    {/* L */}
    <path d={`M 0 0 L ${center} L 0 ${total} L 0 0`} fill={colors.LightPink} />
    {/* B */}
    <path d={`M 0 ${total} L ${center} L ${total} ${total} L 0 ${total}`} fill={colors.MidnightBlue} />
    {/* R */}
    <path d={`M ${total} 0 L ${center} L ${total} ${total} L ${total} 0`} fill={colors.Umber} />
    {/* T */}
    <path d={`M ${total} 0 L ${center} L 0 0 L ${total} 0`} fill={"#fff"} />
  </svg>;
};

const Line = ({ width, height }) => {
  return <div style={{
    height,
    width,
    backgroundColor: "#fefe",
    marginLeft: 10,
  }}>
  </div>;
};

const Line2 = ({ width, height }) => {
  console.log(width, height);
  return <svg width="100%" height="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 1000 10`}>
    <rect fill="rgb(222,255,255)" width={1000} height={20} />
  </svg>;
};

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
    }}>{"Windowsill . dev"}</h1>
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

  const lines = Math.ceil(width / 12);

  return <div>
    <div style={{ ...st, height, width }} >
      {/* <HeroicPopout height={height} width={width} /> */}
      <h1 style={{
        color: colors.MidnightBlue,
        fontSize: "120pt",
        padding: rhythm(2),
      }}>{"Windowsill.dev"}</h1>
      <h3 style={{
        color: colors.MidnightBlue,
        backgroundColor: colors.LightPink,
        padding: rhythm(2),
      }}>{"Staying Indoors | React Native | Typescript"}</h3>
      <div style={{ position: "relative", height: "100vh" }}>
        {/* <div style={{
          position: "absolute",
          top: 0,
        }}>
          {Array.from(new Array(100)).map((_e, i) => {
            return <Line width={((Math.sin(i / Math.PI) + 1) / 2) * (width * 0.15) + (width * 0.5)} height={height} />;
          })}
        </div>

        <div style={{
          position: "absolute",
          top: 3,
        }}>
          {Array.from(new Array(100)).map((_e, i) => {
            return <Line width={((Math.sin(i / Math.PI) + 1) / 2) * (width * 0.15) + (width * 0.6)} height={height} />;
          })}
        </div>
        <div style={{
          position: "absolute",
          top: 6,
        }}>
          {Array.from(new Array(100)).map((_e, i) => {
            return <Line width={((Math.sin(i / Math.PI) + 1) / 2) * (width * 0.15) + (width * 0.7)} height={height} />;
          })}
        </div> */}
        <div style={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
        }}>
          {Array.from(new Array(lines)).map((_e, i) => {
            return <Line height={((Math.sin(i / Math.PI) + 1) / 2) * (height * 0.15) + (height * 0.35)} width={2} />;
          })}
        </div>
        <div style={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          paddingLeft: "3px",
        }}>
          {Array.from(new Array(lines)).map((_e, i) => {
            return <Line height={((Math.sin(i / Math.PI) + 1) / 2) * (height * 0.15) + (height * 0.35)} width={2} />;
          })}
        </div>

        <div style={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          paddingLeft: "6px",
        }}>
          {Array.from(new Array(lines)).map((_e, i) => {
            return <Line height={((Math.sin(i / Math.PI) + 1) / 2) * (height * 0.15) + (height * 0.35)} width={2} />;
          })}
        </div>
        {/* <div style={{
          position: "absolute",
          top: 0,
          transform: "rotate(-90deg)",
        }}>
          {Array.from(new Array(60)).map((_e, i) => {
            return <Line width={((Math.sin(i / Math.PI) + 1) / 2) * (width * 0.16) + (width * 0.20)} height={height} />;
          })}
        </div>
        <div style={{
          position: "absolute",
          top: 0,
          transform: "rotate(-90deg)",
        }}>
          {Array.from(new Array(60)).map((_e, i) => {
            return <Line width={((Math.sin(i / Math.PI) + 1) / 2) * (width * 0.17) + (width * 0.20)} height={height} />;
          })}
        </div> */}
      </div>
    </div>
    {/* <div style={{
      marginTop: "150vh",
      height: "100vh",
      width: "100wh",
      backgroundColor: "rgb(245, 243, 235)",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    }} >
      <Paint color="rgb(211, 173, 177)" />
      <Paint color="rgb(76, 72, 69)" />
      <Paint color="rgb(79, 111, 133)" />
      <Paint color="rgb(245, 243, 235)" />
      <Paint color="rgb(203, 201, 198)" />
      <Paint color="rgb(63, 80, 82)" />
      <Paint color="rgb(36, 91, 97)" />

    </div> */}

    <div style={{ height, width, backgroundColor: "#fff" }} >

    </div>

    <div style={{ height, width, backgroundColor: "#fff" }} >

      {Array.from(new Array(50)).map((_e, ix) => {
        return Array.from(new Array(50)).map((_e, iy) => {
          return <Pyramid dy={iy * 4 - 100} dx={ix * 4 - 100} width={Math.min(width, height) / 50} height={Math.min(width, height) / 50} />
        })
      })}
    </div>

    {/* <Transform3d rotate={theta} rotateAxis={a} translate={{ x: 100 }}>
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
    </Transform3d> */}

  </div >;
};

const Paint = ({ color }) => <div style={{
  backgroundColor: color,
  height: "75vh",
  width: "100%",
}}></div>;
