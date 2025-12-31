import { useEffect } from "react";
import Wavify from "react-wavify";
import "./App.css";
import red from "./imageres.png";



function App() {
  //colors for dark mode
  const bgColor =  "#171717" ;
  const textColor = "#f5f5f5";
  const invertedTextColor = "#181a1b";
  const waveColor1 = "#adf1ff";
  const waveColor2 = "#356586";

  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
    document.body.style.color = textColor;
  }, [bgColor, textColor]);

  return (
    <div className="app-root">
      {/* Main content */}
      <div className="main-content">
        <div className="main-header">
          <h1 className="main-title" style={{ color: invertedTextColor }}>
            welcome
          </h1>
        </div>
        {/* Introductory text */}
        <div className="intro-text">
          <p className="intro-message">
            hi{" "}
            <span className="highlight-name">
              i’m notstonee
            </span>
            <br />{" "}
            {/* <span className = "info-description">developer, student, and skater</span> */}
          </p>
        </div>
        {/*buttons to navigate portfolio sections*/}
        <div className="img-container">
          <img src={red} alt="red" className="main-img" />
        </div>
      </div>
      {/* Bottom wave (background) */}
      <Wavify
        fill={waveColor1}
        paused={false}
        options={{
          height: 30,
          amplitude: 10,
          speed: 0.25,
          points: 4,
        }}
        style={{
          position: "fixed",
          bottom: 0,
          width: "100vw",
          height: "30vh",
          zIndex: -2,
        }}
      />
      {/* Top wave (foreground, different color) */}
      <Wavify
        fill={waveColor2}
        paused={false}
        options={{
          height: 60,
          amplitude: 10,
          speed: 0.25,
          points: 4,
        }}
        style={{
          position: "fixed",
          bottom: 0,
          width: "100vw",
          height: "30vh",
          zIndex: -1,
        }}
      />
    </div>
  );
}

export default App;
