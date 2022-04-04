import "./sidebar.css";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">Overview</li>
            </Link>
            <li className="sidebarListItem">Profile</li>
            <li className="sidebarListItem">Maps</li>
            <li className="sidebarListItem">Chats</li>
            <li className="sidebarListItem">Notification</li>
            <li className="sidebarListItem">Logout</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
