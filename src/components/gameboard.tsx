// src/components/Gameboard.tsx
import React, { useState, useEffect } from "react";

interface CardProps {
  image: string;
}

const Card: React.FC<CardProps> = ({ image }) => {
  const [flipped, setFlipped] = useState(false);

  const flipMap: { [key: string]: string } = {
    "card2.png": "/assets/cards/marawgha/card7.png",
    "card4.png": "/assets/cards/marawgha/card5.png",
    "card8.png": "/assets/cards/marawgha/card3.png",
  };

  const fileName = image.split("/").pop() || "";
  const hasFlip = flipMap[fileName] !== undefined;

  return (
    <div
      style={{ perspective: "1000px", width: "320px", height: "420px", marginTop: "30px" }}
      onClick={() => hasFlip && setFlipped(!flipped)}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transition: "transform 0.8s",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* الوجه الأمامي */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 12px 25px rgba(255,255,255,0.5)",
          }}
        >
          <img src={image} alt="Card" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        {/* الوجه الخلفي */}
        {hasFlip && (
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 12px 25px rgba(255,255,255,0.5)",
            }}
          >
            <img src={flipMap[fileName]} alt="Back" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}
      </div>
    </div>
  );
};

interface GameboardProps {
  players: string[];
  section:
    | "mn_al_akher"
    | "khayalak"
    | "min_qalbik"
    | "mood"
    | "waraqak"
    | "instruction"
    | "marawgha";
  onBack: () => void;
}

const Gameboard: React.FC<GameboardProps> = ({ players, section, onBack }) => {
  const allCards: { [key: string]: string[] } = {
    mn_al_akher: [
      "/assets/cards/mn_al_akher/card1.png",
      "/assets/cards/mn_al_akher/card2000.png",
      "/assets/cards/mn_al_akher/card3.png",
      "/assets/cards/mn_al_akher/card4000.png",
      "/assets/cards/mn_al_akher/card5.png",
      "/assets/cards/mn_al_akher/card6.png",
      "/assets/cards/mn_al_akher/card7.png",
      "/assets/cards/mn_al_akher/card8000.png",
      "/assets/cards/mn_al_akher/card9.png",
      "/assets/cards/mn_al_akher/card10.png",
    ],
    khayalak: [
      "/assets/cards/khayalak/card1.png",
      "/assets/cards/khayalak/card200.png",
      "/assets/cards/khayalak/card3.png",
      "/assets/cards/khayalak/card400.png",
      "/assets/cards/khayalak/card5.png",
      "/assets/cards/khayalak/card6.png",
      "/assets/cards/khayalak/card7.png",
      "/assets/cards/khayalak/card800.png",
      "/assets/cards/khayalak/card9.png",
      "/assets/cards/khayalak/card10.png",
    ],
    min_qalbik: [
      "/assets/cards/min_qalbik/card1.png",
      "/assets/cards/min_qalbik/card20.png",
      "/assets/cards/min_qalbik/card3.png",
      "/assets/cards/min_qalbik/card40.png",
      "/assets/cards/min_qalbik/card5.png",
      "/assets/cards/min_qalbik/card6.png",
      "/assets/cards/min_qalbik/card7.png",
      "/assets/cards/min_qalbik/card80.png",
      "/assets/cards/min_qalbik/card9.png",
      "/assets/cards/min_qalbik/card10.png",
    ],
    mood: [
      "/assets/cards/mood/card1.png",
      "/assets/cards/mood/card20000.png",
      "/assets/cards/mood/card3.png",
      "/assets/cards/mood/card40000.png",
      "/assets/cards/mood/card5.png",
      "/assets/cards/mood/card6.png",
      "/assets/cards/mood/card7.png",
      "/assets/cards/mood/card80000.png",
      "/assets/cards/mood/card9.png",
      "/assets/cards/mood/card10.png",
    ],
    waraqak: [
      "/assets/cards/waraqak/card1.png",
      "/assets/cards/waraqak/card21.png",
      "/assets/cards/waraqak/card3.png",
      "/assets/cards/waraqak/card41.png",
      "/assets/cards/waraqak/card5.png",
      "/assets/cards/waraqak/card6.png",
      "/assets/cards/waraqak/card7.png",
      "/assets/cards/waraqak/card81.png",
      "/assets/cards/waraqak/card9.png",
      "/assets/cards/waraqak/card10.png",
    ],
    instruction: [
      "/assets/cards/instruction/card1.png",
      "/assets/cards/instruction/card2.png",
      "/assets/cards/instruction/card3.png",
      "/assets/cards/instruction/card4.png",
    ],
    marawgha: [
      "/assets/cards/marawgha/card1.png",
      "/assets/cards/marawgha/card2.png",
      "/assets/cards/marawgha/card3.png",
      "/assets/cards/marawgha/card4.png",
      "/assets/cards/marawgha/card5.png",
      "/assets/cards/marawgha/card6.png",
      "/assets/cards/marawgha/card7.png",
      "/assets/cards/marawgha/card8.png",
    ],
  };

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [remainingCards, setRemainingCards] = useState<string[]>(allCards[section]);
  const [displayedCard, setDisplayedCard] = useState<string | null>(null);
  const [playerMarawghaUsed, setPlayerMarawghaUsed] = useState<{ [key: string]: boolean }>({});
  const [showExplainPopup, setShowExplainPopup] = useState(false);
  const [showChoosePopup, setShowChoosePopup] = useState(false);
  const [showEndPopup, setShowEndPopup] = useState(false);

  const currentPlayer = players[currentPlayerIndex];
  const nextPlayer = players[(currentPlayerIndex + 1) % players.length];

  useEffect(() => {
    if (remainingCards.length > 0 && !displayedCard) drawCard();
  }, []);

  const drawCard = () => {
    if (remainingCards.length === 0) {
      setShowEndPopup(true);
      return;
    }
    const randomIndex = Math.floor(Math.random() * remainingCards.length);
    const selectedCard = remainingCards[randomIndex];
    const newCards = [...remainingCards];
    newCards.splice(randomIndex, 1);
    setRemainingCards(newCards);
    setDisplayedCard(selectedCard);
  };

  const drawMarawghaCard = () => {
    if (playerMarawghaUsed[currentPlayer]) {
      alert("⚠️ لقد سحبت كرت المراوغة مسبقًا!");
      return;
    }
    const marawghaCard = "/assets/cards/marawgha/first.png";
    setDisplayedCard(marawghaCard);
    setPlayerMarawghaUsed({ ...playerMarawghaUsed, [currentPlayer]: true });
  };

  const nextTurn = () => {
    drawCard();
    setShowExplainPopup(false);
    setShowChoosePopup(false);
    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f4eddf 0%, #f4eddf 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* زر العودة */}
      <button
        onClick={onBack}
        style={{
          alignSelf: "flex-start",
          marginBottom: "25px",
          padding: "10px 20px",
          borderRadius: "12px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "#002A4f",
          color: "#EBEBDF",
          fontWeight: "bold",
          fontSize: "1rem",
          transition: "all 0.2s ease",
        }}
      >
        🔙 رجوع للسكشنز
      </button>

      {/* اللاعب الحالي واللاعب التالي */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "30px", flexWrap: "wrap" }}>
        {["🎮 الدور الحالي", "➡️ اللاعب التالي"].map((label, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#4f0000",
              padding: "20px 30px",
              borderRadius: "16px",
              textAlign: "center",
              minWidth: "150px",
            }}
          >
            <h3 style={{ margin: 0, fontWeight: "bold", color: "#ffffff" }}>{label}</h3>
            <p style={{ fontSize: "1.5rem", fontWeight: "bold", marginTop: "10px", color: "#ffffff" }}>
              {i === 0 ? currentPlayer : nextPlayer}
            </p>
          </div>
        ))}
      </div>

      {/* عداد الكروت */}
      <p style={{ marginBottom: "20px", fontSize: "1rem", color: "#4f0000" }}>
        الكروت المتبقية: {remainingCards.length}
      </p>

      {/* عرض الكرت */}
      {displayedCard ? (
        <div style={{ textAlign: "center" }}>
          <Card image={displayedCard} />

          {displayedCard.includes("marawgha") && (
            <div style={{ marginTop: "15px", display: "flex", gap: "10px", justifyContent: "center" }}>
              <button
                onClick={() => setShowExplainPopup(true)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "12px",
                  border: "none",
                  backgroundColor: "#4f0000",
                  color: "#EBEBDF",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                الشرح
              </button>
              <button
                onClick={() => setShowChoosePopup(true)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "12px",
                  border: "none",
                  backgroundColor: "#006400",
                  color: "#EBEBDF",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                اختار
              </button>
            </div>
          )}
        </div>
      ) : (
        <p style={{ fontSize: "1.1rem", marginTop: "20px", color: "#002A4f" }}>اضغط التالي لسحب كرت 🎴</p>
      )}

      {/* أزرار المراوغة والتالي */}
      <button
        onClick={drawMarawghaCard}
        style={{
          marginTop: "15px",
          padding: "10px 24px",
          fontSize: "1.1rem",
          borderRadius: "12px",
          border: "none",
          backgroundColor: "#4f0000",
          color: "#EBEBDF",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        كرت المراوغة 🃏
      </button>
      <button
        onClick={nextTurn}
        style={{
          marginTop: "15px",
          padding: "12px 28px",
          fontSize: "1.3rem",
          borderRadius: "12px",
          border: "none",
          backgroundColor: "#002A4f",
          color: "#EBEBDF",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        التالي ▶️
      </button>

      {/* بوب أب الشرح */}
      {showExplainPopup && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 999 }}>
          <div style={{ background: "#fff", padding: "15px", borderRadius: "12px", textAlign: "center", position: "relative", width: "320px", maxWidth: "90%" }}>
            <img src="/assets/cards/marawgha/explain.png" alt="شرح المراوغة" style={{ width: "100%", borderRadius: "8px" }} />
            <button onClick={() => setShowExplainPopup(false)} style={{ marginTop: "12px", padding: "6px 14px", borderRadius: "8px", border: "none", backgroundColor: "#b5651d", color: "#fff", cursor: "pointer", fontSize: "0.9rem" }}>✖ إغلاق</button>
          </div>
        </div>
      )}

      {/* بوب أب الاختيار */}
      {showChoosePopup && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", padding: "30px", borderRadius: "16px", textAlign: "center", maxWidth: "600px", width: "90%" }}>
            <h3 style={{ marginBottom: "25px", color: "#002A4f", fontSize: "1.4rem" }}>اختر كرت:</h3>
            <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
              {["card2.png", "card4.png", "card8.png"].map((card, index) => (
                <img
                  key={index}
                  src={`/assets/cards/marawgha/${card}`}
                  alt={`اختيار ${card}`}
                  style={{ width: "160px", height: "220px", borderRadius: "12px", cursor: "pointer", boxShadow: "0 6px 16px rgba(0,0,0,0.35)", transition: "transform 0.2s" }}
                  onClick={() => {
                    setDisplayedCard(`/assets/cards/marawgha/${card}`);
                    setShowChoosePopup(false);
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              ))}
            </div>
            <button onClick={() => setShowChoosePopup(false)} style={{ marginTop: "25px", padding: "10px 20px", borderRadius: "10px", border: "none", backgroundColor: "#b5651d", color: "#fff", cursor: "pointer", fontSize: "1rem", fontWeight: "bold" }}>✖ إغلاق</button>
          </div>
        </div>
      )}

      {/* بوب أب انتهاء الكروت */}
      {showEndPopup && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2000 }}>
          <div style={{ background: "#fff", padding: "30px", borderRadius: "16px", textAlign: "center", maxWidth: "400px", width: "90%", boxShadow: "0 8px 20px rgba(0,0,0,0.4)" }}>
            <h2 style={{ fontSize: "1.6rem", marginBottom: "15px", color: "#4f0000" }}>انتهت جميع الكروت</h2>
            <p style={{ fontSize: "1rem", marginBottom: "20px", color: "#333" }}>لقد لعبتم كل الأوراق المتاحة. يمكنكم البدء من جديد أو العودة للاختيار.</p>
            <button onClick={() => { setShowEndPopup(false); onBack(); }} style={{ padding: "10px 20px", borderRadius: "12px", border: "none", backgroundColor: "#4f0000", color: "#fff", cursor: "pointer", fontWeight: "bold", fontSize: "1rem" }}>🔙 رجوع</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gameboard;
