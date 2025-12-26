import React, { useEffect } from "react";
import Wavify from "react-wavify";
import moon from "./moon.jpg";
import sun from "./sun.jpg";

function App() {
  const [darkMode, setDarkMode] = React.useState(true);

  //colors for dark mode
  const bgColor = darkMode ? "#171717" : "#f5f5f5";
  const textColor = darkMode ? "#f5f5f5" : "#181a1b";
  const invertedTextColor = darkMode ? "#181a1b" : "#f5f5f5";
  const waveColor1 = darkMode ? "#adf1ff" : "#a0d2ff";
  const waveColor2 = darkMode ? "#356586" : "#a0d2ff";

  function toggleDarkMode() {
    setDarkMode((prev) => !prev);
  }

  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
    document.body.style.color = textColor;
  }, [bgColor, textColor]);

  return (
    <div
      style={{
        color: textColor,
        transition: "all 1s ease",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <button
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          padding: "5px 5px",
          backgroundColor: darkMode ? bgColor : bgColor,
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          zIndex: 10,
        }}
        onClick={() => {
          toggleDarkMode();
        }}
      >
        {darkMode ? (
          <img
            src={moon}
            alt="Dark Mode"
            style={{ width: "32px", height: "36px", borderRadius: "75%" }}
          />
        ) : (
          <img
            src={sun}
            alt="Light Mode"
            style={{ width: "32px", height: "36px", borderRadius: "75%" }}
          />
        )}
      </button>

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "60vh",
          width: "40vw",
          minWidth: "600px",
          maxWidth: "40vw",
          minHeight: "200px",
          maxHeight: "60vh",
          border: "2px solid white",
          borderRadius: "15px",
          backgroundColor: darkMode ? "#222222" : "#e0e0e0",
          borderColor: darkMode ? "#444444" : "#c0c0c0",
        }}
      >
        <div
          style={{
            backgroundColor: darkMode ? "#e0e0e0" : "#222222",
            width: "100%",
            height: "10%",
            borderTopLeftRadius: "13px",
            borderTopRightRadius: "13px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              color: invertedTextColor,
              fontFamily: "Roboto Mono, monospace",
            }}
          >
            welcome
          </h1>
        </div>

        {/* Introductory text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vpx",
            flex: 1,
            marginTop: "-40%",
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontSize: "50px",
              margin: "20px",
              fontFamily: "Zen Kaku Gothic New, sans-serif",
            }}
          >
            hi{" "}
            <span style={{ color: "#a8dfffff", fontWeight: "regular" }}>
              i’m notstonee
            </span>
            <br />{" "}
            <span style={{ fontSize: 20 }}>developer, student, and skater</span>
          </p>
        </div>

        {/*buttons to navigate portfolio sections*/}
        <div></div>
      </div>

      {/* Bottom wave (background) */}
      <Wavify
        fill={waveColor1}
        paused={false}
        options={{
          height: 30,
          amplitude: 10,
          speed: 0.25,
          points: 2,
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
          points: 2,
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
