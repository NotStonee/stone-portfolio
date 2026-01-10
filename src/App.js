
import { useEffect, useRef, useState } from "react";
import Wavify from "react-wavify";
import "./App.css";




// Popup definitions
const popups = [
  { key: 'about', label: 'About', content: <div><h2>About</h2><p>This is the About popup window.</p></div> },
  { key: 'links', label: 'Links', content: <div><h2>Links</h2><ul><li><a href="https://github.com/NotStonee" target="_blank" rel="noopener noreferrer">GitHub</a></li></ul></div> },
  { key: 'work', label: 'Work', content: <div><h2>Work</h2><p>Showcase your work here.</p></div> },
  { key: 'contact', label: 'Contact', content: <div><h2>Contact</h2><p>Email: <a href="mailto:your@email.com">your@email.com</a></p></div> },
];


// DraggablePopup: A window that can be moved by dragging its header.
function DraggablePopup({
  title,
  children,
  onClose,
  position,
  setPosition,
  zIndex,
  onDragStart,
  onDragEnd,
  animateOut,
  onAnimationEnd
}) {
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  // Start dragging and record the offset between mouse and popup position
  const handleMouseDown = (e) => {
    setDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    if (onDragStart) onDragStart();
  };

  // Move popup, clamping so the header stays on screen
  const handleMouseMove = (e) => {
    if (!dragging) return;
    // Try to get popup and header dimensions
    let popupWidth = 360; // fallback
    let headerHeight = 40; // fallback
    const popupElem = document.querySelector('.popup-window[style*="z-index: ' + zIndex + '"]');
    if (popupElem) {
      popupWidth = popupElem.offsetWidth;
      const header = popupElem.querySelector('.popup-titlebar');
      if (header) headerHeight = header.offsetHeight;
    }
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let x = e.clientX - offset.current.x;
    let y = e.clientY - offset.current.y;
    // Clamp so header is always visible
    x = Math.max(0, Math.min(x, vw - popupWidth));
    y = Math.max(0, Math.min(y, vh - headerHeight));
    setPosition({ x, y });
  };

  // Stop dragging
  const handleMouseUp = () => {
    setDragging(false);
    if (onDragEnd) onDragEnd(position);
  };

  // Attach/remove mousemove/mouseup listeners when dragging
  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    // eslint-disable-next-line
  }, [dragging]);

  return (
    <div
      className={`popup-window ${animateOut ? 'popup-animate-out' : 'popup-animate-in'}`}
      style={{
        left: position.x,
        top: position.y,
        zIndex,
      }}
      onMouseDown={onDragStart}
      onAnimationEnd={onAnimationEnd}
    >
      <div
        className="popup-titlebar"
        onMouseDown={handleMouseDown}
      >
        <span>{title}</span>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'inherit',
            fontWeight: 'bold',
            fontSize: 18,
            cursor: 'pointer'
          }}
        >
          &times;
        </button>
      </div>
      <div style={{ padding: 16 }}>{children}</div>
    </div>
  );
}



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

  // Popup state

  // openPopups: [{key, zIndex, closing: bool}]
  const [openPopups, setOpenPopups] = useState([]);
  // popupPositions: { [key]: {x, y} }
  const [popupPositions, setPopupPositions] = useState({});
  const [zCounter, setZCounter] = useState(10);

  // Open a popup, bringing it to front or creating it at a unique default position
  const openPopup = (key) => {
    setOpenPopups((prev) => {
      if (prev.find((p) => p.key === key)) {
        // Bring to front
        return prev.map((p) =>
          p.key === key ? { ...p, zIndex: zCounter + 1 } : p
        );
      }
      // If not open, add to openPopups
      return [
        ...prev,
        {
          key,
          zIndex: zCounter + 1,
          closing: false,
        },
      ];
    });
    setZCounter((z) => z + 1);
    // If no position exists, set a unique default position
    setPopupPositions((prev) => {
      if (prev[key]) return prev;
      const idx = popups.findIndex(p => p.key === key);
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // Offset each popup by 40px diagonally from center, with a small random offset
      const randOffsetX = Math.round(Math.random() * 30 - 15);
      const randOffsetY = Math.round(Math.random() * 30 - 15);
      return {
        ...prev,
        [key]: {
          x: Math.round(vw / 2 - 180 + idx * 40 + randOffsetX),
          y: Math.round(vh / 2 - 120 + idx * 40 + randOffsetY)
        }
      };
    });
  };

  // Start closing animation for popup
  const closePopup = (key) => {
    setOpenPopups((prev) =>
      prev.map((p) =>
        p.key === key ? { ...p, closing: true } : p
      )
    );
  };

  // Remove popup from openPopups after close animation
  const handlePopupAnimationEnd = (key, closing) => {
    if (closing) {
      setOpenPopups((prev) => prev.filter((p) => p.key !== key));
    }
  };

  // Bring popup to front by increasing its zIndex
  const bringToFront = (key) => {
    setOpenPopups((prev) =>
      prev.map((p) =>
        p.key === key ? { ...p, zIndex: zCounter + 1 } : p
      )
    );
    setZCounter((z) => z + 1);
  };

  // Main content
  return (
    <div className="app-root" style={{ minHeight: '100vh', background: 'none', position: 'relative', overflow: 'hidden' }}>
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
            <span className = "info-description">developer, student, and skater</span>
          </p>
        </div>
        {/* Section buttons */}
        <div className="section-buttons" style={{ display: 'flex', gap: 16, margin: '16px 0' }}>
          {popups.map((popup) => (
            <button
              key={popup.key}
              onClick={() => openPopup(popup.key)}
              style={{
                padding: '10px 24px',
                fontSize: 18,
                borderRadius: 6,
                border: '1px solid #888',
                background: '#fff',
                color: '#222',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                fontFamily: "'Roboto Mono', monospace"
              }}
            >
              {popup.label}
            </button>
          ))}
        </div>
        {/* Image */}
        <div className="img-container">
          {/* <img src={red} alt="red" className="main-img" /> */}
        </div>
      </div>
      {/* Draggable Popups */}
      {openPopups.map((popup) => {
        const popupDef = popups.find((p) => p.key === popup.key);
        // Always use position from popupPositions (guaranteed to exist after openPopup)
        const position = popupPositions[popup.key];
        const setPosition = (pos) => {
          setPopupPositions((prev) => ({ ...prev, [popup.key]: pos }));
        };
        return (
          <DraggablePopup
            key={popup.key}
            title={popupDef.label}
            zIndex={popup.zIndex}
            position={position}
            setPosition={setPosition}
            onClose={() => closePopup(popup.key)}
            onDragStart={() => bringToFront(popup.key)}
            onDragEnd={() => {}}
            animateOut={popup.closing}
            onAnimationEnd={() => handlePopupAnimationEnd(popup.key, popup.closing)}
          >
            {popupDef.content}
          </DraggablePopup>
        );
      })}
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
      {/* Top wave (foreground) */}
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
