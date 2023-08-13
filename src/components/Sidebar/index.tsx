import {useState, useEffect, useContext} from 'react'
import { useLocation } from 'react-router-dom'

import { links, linksSection } from '../../utils/ItemsMenu'

import {
  Container,
  ContainerLink,
  StyledLink,
  LogOut,
  //SidebarButton
} from './styles'

import { MdDashboard } from "react-icons/md";
import { SlLogout } from "react-icons/sl";
import { RiUserSettingsLine } from "react-icons/ri";
import { FaUsers, FaPiggyBank, FaTags, FaTruck } from "react-icons/fa";
import logo from '../../assets/logo.png'
import { defaultTheme } from '../../styles/themes'

import { AuthContext } from '../../contexts/auth'

export function Sidebar() {
  const { signOutUser } = useContext(AuthContext)

  const [currentRoute, setCurrentRoute] = useState('')
  const location = useLocation()
  
  //const [isOpen, setIsOpen] = useState(false);

  /*
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  */

  useEffect(() => {

    setCurrentRoute(location.pathname)
  },[location])

  function renderIcon(iconName : string) {
    switch (iconName) {
      case 'MdDashboard':
        return <MdDashboard size={24} color={defaultTheme.blue} />;
      
      case 'FaUsers':
        return <FaUsers size={24} color={defaultTheme['orange-dark']}/>;

      case 'FaPiggyBank':
        return <FaPiggyBank size={24} color={defaultTheme['green-bank']} />;

      case 'FaTags':
        return <FaTags size={24} color={defaultTheme['green-bank']}/>;

      case 'FaTruck':
        return <FaTruck size={24} color={defaultTheme.title}/>;
      
      default:
        return null;
    }
  }

  function renderIconLinkSection(iconLinkSection : string){
    switch (iconLinkSection) {
      case 'RiUserSettingsLine':
        return <RiUserSettingsLine size={24} color={defaultTheme.title} />

      case 'FaUsers':
          return <FaUsers size={24}/>

        case 'FaPiggyBank':
        return <FaPiggyBank size={24}/>
    
      default:
        return null;
    }
  }
  
  return (
    <>
      <Container >
        {/* 
        <SidebarButton onClick={toggleSidebar} >
          { isOpen ? 'Fechar' : 'Abrir' }
        </SidebarButton>
        */}

        <ContainerLink>
          <img src={logo} alt='Logo' />
          <h2>Menu</h2>

          <ul>
            {links.map((link) => (
              <div
                key={link.id} 
                className={currentRoute === link.path ? "active" : ""}
              >
                <li key={link.id}>
                  <StyledLink
                    to={link.path}  
                    className={currentRoute === link.path ? "active" : ""}            
                  >
                    {renderIcon(link.icon)}
                    {link.text}

                  </StyledLink>
                </li>

              </div>
            ))}
          </ul>
        </ContainerLink>

        <ContainerLink>
          <ul>
            {linksSection.map((link) => (
              <div
                key={link.id} 
                className={currentRoute === link.path ? "active" : ""}
              >
                <li key={link.id}>
                  <StyledLink
                    to={link.path}  
                    className={currentRoute === link.path ? "active" : ""}            
                  >
                    {renderIconLinkSection(link.icon)}
                    {link.text}

                  </StyledLink>
                </li>

              </div>
            ))}
          </ul>
        </ContainerLink>

        <LogOut>
          <div>
            <SlLogout size={24} />
          </div>
          <button onClick={() => signOutUser()}>
            <span>Sair</span> 
          </button>
        </LogOut>

      </Container>
    
    </>
    
  );
}

