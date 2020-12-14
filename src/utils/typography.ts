import Typography from "typography";

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.45,
  headerFontFamily: ['Fira Sans', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
  bodyFontFamily: ['Merriweather', 'serif'],
  scaleRatio: 4,
  color: "#433443",
});

export const { scale, rhythm, options } = typography;
export default typography;
