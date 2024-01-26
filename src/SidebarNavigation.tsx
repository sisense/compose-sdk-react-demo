import NavigationItem from './components/NavigationItem';
import DashboardIcon from './components/icons/DashboardIcon';
import Logo from './assets/sisense-logo.svg';
import ComposeSDKLogo from './assets/compose-sdk-logo.svg';
import MoveDownIcon from '@mui/icons-material/MoveDown';

import {
  FunnelIcon,
  ChartBarIcon,
  ChartBarSquareIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/solid';
import HamburgerIcon from './components/icons/Hamburger';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SidebarNavigation(props: Props) {
  const { isOpen } = props;

  const handleNavigationOnClick: React.MouseEventHandler<HTMLUListElement> = () => {
    props.onClose();
  };
  return (
    <div className={`fixed top-0 z-10 md:static   ${isOpen ? 'w-full' : 'w-0'} md:w-64`}>
      <div onClick={props.onClose} className="md:hidden absolute top-4 right-5 cursor-pointer">
        <HamburgerIcon />
      </div>
      <nav className=" overflow-auto flex flex-col bg-black  h-screen  tex-gray-900">
        <div className="flex flex-col items-center justify-center mt-8">
          <div className="mt-4 w-1/2">
            <img src={ComposeSDKLogo} className="mx-auto w-131 h32" />
          </div>
          <div className="w-1/2">
            <img src={Logo} className="mx-auto w-131 h32" />
          </div>
        </div>
        <div className="mt-10 mb-4 flex justify-center md:block md:justify-start">
          <ul onClick={handleNavigationOnClick}>
            <NavigationItem
              href="/"
              text="Getting Started"
              icon={<QuestionMarkCircleIcon width={20} height={24} />}
            />
            <NavigationItem
              href="/charts"
              text="Chart Components"
              icon={<ChartBarIcon width={20} height={24} />}
            />
            <NavigationItem
              href="/charts-connected"
              text="Connected Chart Components"
              icon={<ChartBarSquareIcon width={20} height={24} />}
            />
            <NavigationItem
              href="/filters"
              text="Filter Components"
              icon={<FunnelIcon width={20} height={24} />}
            />
            <NavigationItem
              href="/extensions"
              text="Third Party Add-ons"
              icon={<ShoppingBagIcon width={20} height={24} />}
            />
            <NavigationItem href="/dashboard" text="ECommerce Dashboard" icon={<DashboardIcon />} />
            <NavigationItem
              href="/drilldown"
              text="Drilldown"
              icon={<MoveDownIcon fontSize="small" />}
            />
          </ul>
        </div>
      </nav>
    </div>
  );
}
