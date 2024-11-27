import { TabView, TabPanel } from "primereact/tabview";
import ArrivalTabView from "./TabView/ArrivalTabView";
import DepartmentTabView from "./TabView/DepartmentTabView";

import "./StationMasterTabView.scss";

const StationMasterTabView = () => {
  return (
    <TabView>
      <TabPanel header="Отправления">
        <DepartmentTabView />
      </TabPanel>
      <TabPanel header="Прибытия">
        <ArrivalTabView />
      </TabPanel>
    </TabView>
  );
};

export default StationMasterTabView;
