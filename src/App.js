import React, { useEffect } from "react";
import Wavify from "react-wavify";
function App() {

const [darkMode, setDarkMode] = React.useState(true);

//colors for dark mode
const bgColor = darkMode ? "#171717" : "#f5f5f5";
const textColor = darkMode ? "#f5f5f5" : "#181a1b";
const waveColor1 = darkMode ? "#adf1ff" : "#a0d2ff";
const waveColor2 = darkMode ? "#356586" : "#a0d2ff";

function toggleDarkMode() {
  setDarkMode(prev => !prev);
}

useEffect(() => {
    document.body.style.backgroundColor = bgColor;
    document.body.style.color = textColor;
  }, [bgColor, textColor]);

  return (
    <div style ={{
      color: textColor,
      transition: "all 1s ease"
    }}>
      <button
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          padding: "10px 20px",
          backgroundColor: darkMode ? "#333" : "#1976d2",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          zIndex: 10
        }}
        onClick={() => {
          toggleDarkMode();
        }}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <h1 style={{
        textAlign: "center" }}>Welcome to Stone.com</h1>
      {/* Bottom wave (background) */}
      <Wavify
        fill={waveColor1}
        paused={false}
        options={{
          height: 30,
          amplitude: 10,
          speed: 0.25,
          points: 2
        }}
        style={{
          position: "fixed",
          bottom: 0,
          width: "100vw",
          height: "30vh",
          zIndex: -2
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
          points: 2
        }}
        style={{
          position: "fixed",
          bottom: 0,
          width: "100vw",
          height: "30vh",
          zIndex: -1
        }}
      />
    </div>
  );
}

export default App;