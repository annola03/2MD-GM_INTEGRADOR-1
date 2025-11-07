import "./header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="search">
        <img
          src="https://img.icons8.com/?size=100&id=elSdeHsB03U3&format=png&color=000000"
          alt="Buscar"
          width="18"
          height="18"
          style={{ marginRight: "10px", verticalAlign: "middle" }}
        />
        <input type="text" placeholder="Search..." />
      </div>

      <div className="header-right">
        <div className="stats">
          <span><strong>Total members:</strong> 2000</span> |{" "}
          <span><strong>Current used:</strong> 1800</span>
        </div>

        <button className="filter-btn">
          <img
            src="https://img.icons8.com/?size=100&id=Gkju9C9xs2XV&format=png&color=FFFFFF"
            alt="Filtrar"
            width="18"
            height="18"
            style={{ marginRight: "6px", verticalAlign: "middle" }}
          />
          Filter
        </button>

        <div className="profile">
          <img src="https://i.pravatar.cc/40" alt="User" />
          <div>
            <p><strong>Luke Asotie</strong></p>
            <p style={{ fontSize: "12px", color: "#666" }}>Admin for Associations</p>
          </div>
        </div>
      </div>
    </header>
  );
}
