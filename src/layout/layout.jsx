import { Outlet } from "react-router-dom";
import PageHeader from "../components/PageHeader";
// import "./Layout.scss";

const OutletWrapper = () => <Outlet />;

export default function Layout() {
  return (
    <div>
      <div className="sidebar">
        <PageHeader />
      </div>
      <div className="main">
        <OutletWrapper>
          <Outlet />
        </OutletWrapper>
      </div>
    </div>
  );
}
