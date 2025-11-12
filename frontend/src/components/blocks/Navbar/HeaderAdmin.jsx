import "./header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h2 className="header-title">Painel Administrativo</h2>
      </div>

      <div className="header-right">
        <div className="stats">
          <span>
            <strong>Total:</strong> 2.000
          </span>
          <span>
            <strong>Usando:</strong> 1.800
          </span>
        </div>

        <div className="profile">
          <img src="https://i.pravatar.cc/40" alt="User" className="avatar" />
          <div className="profile-info">
            <p className="profile-name">Luke Asotie</p>
            <p className="profile-role">Admin for Associations</p>
          </div>
        </div>
      </div>
    </header>
  );
}
