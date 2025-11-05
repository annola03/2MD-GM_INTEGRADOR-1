import "./header.css";
export default function Header() {
    return (
      <header className="header">
        <div className="search">
          🔍
          <input type="text" placeholder="Search..." />
        </div>
  
        <div className="header-right">
          <div className="stats">
            <span><strong>Total members:</strong> 2000</span> |{" "}
            <span><strong>Current used:</strong> 1800</span>
          </div>
  
          <button className="filter-btn">⚙️ Filter</button>
  
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
  