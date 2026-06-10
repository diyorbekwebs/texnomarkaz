import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", padding: "100px 20px" }}>
      <h1 style={{ fontSize: 80, fontWeight: 800, color: "#e2e8f0" }}>404</h1>
      <p style={{ fontSize: 20, color: "#64748b", marginBottom: 24 }}>Sahifa topilmadi</p>
      <button
        onClick={() => navigate("/")}
        style={{
          background: "#2563eb", color: "#fff",
          border: "none", borderRadius: 12,
          padding: "12px 28px", fontSize: 15,
          fontWeight: 600, cursor: "pointer"
        }}
      >
        Bosh sahifaga qaytish
      </button>
    </div>
  );
}