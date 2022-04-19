import { useState } from "react";
import "../scss/layout.scss";
import NavItem from "./common/NavItem";
import CreateDaoDashboard from "./createDaoDashboard";
import CreateSPLTokenStream from "./createSPLTokenStream";
import ModifyDao from "./ModifyDao";



const Layout: React.FC = (props) => {
  const sections = [<CreateDaoDashboard />, <CreateSPLTokenStream />, <ModifyDao/>];
  const [section, setSection] = useState(0);
  const onClick = (index: number): void => {
    setSection(index - 1);
  };
  return (
    <div className="dash_main">
      <div className="dash_header">Header part</div>
      <div className="dash_container">
        <div className="dash_menu">
          <ul>
            <li className={`${section == 0?'active': ''}`}>
                <NavItem
                  icon="/icons/entry-icon-farms.svg"
                  text="Create DAOs"
                  onClick={() => {
                    onClick(1);
                  }}
                />
              
            </li>
            <li className={`${section == 1?'active': ''}`}>
                <NavItem
                  icon="/icons/entry-icon-farms.svg"
                  text="Create Streams"
                  onClick={() => {
                    onClick(2);
                  }}
                />
              
            </li>
            <li className={`${section == 2?'active': ''}`}>
              
                <NavItem
                  icon="/icons/entry-icon-farms.svg"
                  text="Modify DAO"
                  onClick={() => {
                    onClick(3);
                  }}
                />
              
            </li>
          </ul>
        </div>
        <div className="dash_content">{sections[section]}</div>
      </div>
    </div>
  );
};

export default Layout;
