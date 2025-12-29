import { useEffect } from "react";
import Wavify from "react-wavify";
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
          backgroundColor:  "#222222" ,
          borderColor: "#444444",
        }}
      >
        <div
          style={{
            backgroundColor:"#e0e0e0",
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
            {/* <span style={{ fontSize: 20 }}>developer, student, and skater</span> */}
          </p>
        </div>

        {/*buttons to navigate portfolio sections*/}
        <div><img src={red} alt="red" style={{width: "720px", height: "420px" }}></img></div>
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
