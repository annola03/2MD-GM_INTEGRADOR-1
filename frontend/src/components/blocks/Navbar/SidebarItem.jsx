export default function SidebarItem({ icon, text, open }) {
    return (
      <li>
        <span>{icon}</span>
        <span className="text">{text}</span>
      </li>
    );
  }
  