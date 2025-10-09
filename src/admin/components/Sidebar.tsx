import LogoBox from './wrapper/LogoBox';
import SimplebarReactClient from './wrapper/SimplebarReactClient';
import AppMenu from './AppMenu';
import { MENU_ITEMS } from '../data/menu-items';

export const Sidebar = () => {
  const menuItems = MENU_ITEMS;
  
  return (
    <div className="app-sidebar">
      <LogoBox />
      <SimplebarReactClient className="scrollbar" data-simplebar id="leftside-menu-container">
        <AppMenu menuItems={menuItems} />
      </SimplebarReactClient>
    </div>
  );
};
