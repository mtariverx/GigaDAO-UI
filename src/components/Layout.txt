import { useState } from "react";
import Select from "react-select";
import "../scss/layout.scss";
import NavItem from "./common/NavItem";
import CreateDaoDashboard from "./createDaoDashboard";
import CreateSPLTokenStream from "./createSPLTokenStream";
import ModifyDao from "./ModifyDao";
import NavItemSubcategory from "./common/NavItemSubcategory";
import CreateTokenPool from "./createTokenPool";
import CreateDaoProfile from "./createDAOProfile";
import CreateNewProposal from "./createNewProposal";
const options = ["Token Pools", "New Proposal", "DAO Profile"];

const Layout: React.FC = (props) => {
  const sections = [<CreateDaoDashboard />, <CreateSPLTokenStream />, <ModifyDao />];
  const dash_sections = [<CreateTokenPool />, <CreateNewProposal />, <CreateDaoProfile />];
  const [section_num, setSection] = useState(0);
  const [subcategory, setSubcategory] = useState(-1);
  const [show_subcategory_memberDAO, setShowSubcategoryMemberDAO] =
    useState(false);
  const [show_section_flag, setShowSectionFlag]= useState(true);
  
  const onClickCategory = (index: number): void => {
    setSection(index);
    if (index == 0){
      setShowSubcategoryMemberDAO(!show_subcategory_memberDAO);
    } else {
      setShowSubcategoryMemberDAO(false);
    }
    
    if (show_subcategory_memberDAO == false) setSubcategory(-1);
    setShowSectionFlag(true);
  };

  console.log("show subcategory memeberDAO=", show_subcategory_memberDAO);
  console.log("section num=", section_num);
  console.log("subcategory =", subcategory);

  console.log("section flag=", show_section_flag);
  
  const onClickSubcategory = (index: number): void => {
    setSubcategory(index);
    setShowSectionFlag(false);
    
  };
  console.log(sections, section_num);
  return (
    <div className="dash_main">
      <div className="dash_header">Header part</div>
      <div className="dash_container">
        <div className="dash_menu">
          <ul>
            <li
              className={`${
                section_num == 0 && !show_subcategory_memberDAO ? "active" : ""
              }`}
            >

              
              <NavItem
                icon="/icons/entry-icon-farms.svg"
                text="DAO Dashboard"
                onClick={() => {
                  onClickCategory(0);
                }}
              />
            </li>
            <div>
              <ul
                style={
                  show_subcategory_memberDAO
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <li className={`${subcategory == 0 ? "active" : ""}`}>
                  <NavItemSubcategory
                    icon="/icons/entry-icon-farms.svg"
                    text={options[0]}
                    onClick={() => onClickSubcategory(0)}
                  />
                </li>
                <li className={`${subcategory == 1 ? "active" : ""}`}>
                  <NavItemSubcategory
                    icon="/icons/entry-icon-farms.svg"
                    text={options[1]}
                    onClick={() => onClickSubcategory(1)}
                  />
                </li>
                <li className={`${subcategory == 2 ? "active" : ""}`}>
                  <NavItemSubcategory
                    icon="/icons/entry-icon-farms.svg"
                    text={options[2]}
                    onClick={() => onClickSubcategory(2)}
                  />
                </li>
              </ul>
            </div>

            <li
              className={`${
                section_num == 1 && !show_subcategory_memberDAO ? "active" : ""
              }`}
            >
              <NavItem
                icon="/icons/entry-icon-farms.svg"
                text="Create Streams"
                onClick={() => {
                  onClickCategory(1);
                }}
              />
            </li>

            <li
              className={`${
                section_num == 2 && !show_subcategory_memberDAO ? "active" : ""
              }`}
            >
              <NavItem
                icon="/icons/entry-icon-farms.svg"
                text="Modify DAO"
                onClick={() => {
                  onClickCategory(2);
                }}
              />
            </li>
          </ul>
        </div>
        <div className="dash_content">{
          show_section_flag
            ? sections[section_num]
            : dash_sections[subcategory]
        }</div>
      </div>
      <div className="footer">
        <div>GigaDAO</div>
        <div>Socials</div>
      </div>
    </div>
  );
};

export default Layout;
