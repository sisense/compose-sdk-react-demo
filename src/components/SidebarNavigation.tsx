import NavigationItem from "./NavigationItem";
import DashboardIcon from "./icons/DashboardIcon";
import Logo from "../assets/sisense-logo.svg";
import ComposeSDKLogo from "../assets/compose-sdk-logo.svg";

import {
  FunnelIcon,
  ChartBarIcon,
  ChartBarSquareIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
export default function SidebarNavigation() {
  return (
    <div className="w-64">
      <nav className=" overflow-auto flex flex-col bg-black  h-screen  tex-gray-900">
        <div className="flex flex-col items-center justify-center mt-8">
          <div className="w-1/2">
            <img src={Logo} className="mx-auto w-131 h32 rounded-full" />
          </div>
          <div className="mt-10 w-1/2">
            <img src={ComposeSDKLogo} className="mx-auto w-131 h32 rounded-full" />
          </div>
        </div>
        <div className="mt-10 mb-4">
          <ul>
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
              href="/dashboard"
              text="ECommerce Dashboard"
              icon={<DashboardIcon />}
            />
          </ul>
        </div>
      </nav>
    </div>
  );
}
