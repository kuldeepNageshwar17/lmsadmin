import React, {useMemo} from "react";
import {AsideMenuList} from "./AsideMenuList";
import {AsideMenuListControlPanel} from "./AsideMenuListControlPanel";
import {useHtmlClassService} from "../../../_core/MetronicLayout";
import { connect } from 'react-redux'


function AsideMenu({disableScroll,controlPanel}) {
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      layoutConfig: uiService.config,
      asideMenuAttr: uiService.getAttributes("aside_menu"),
      ulClasses: uiService.getClasses("aside_menu_nav", true),
      asideClassesFromConfig: uiService.getClasses("aside_menu", true)
    };
  }, [uiService]);

  return (
    <>
      {/* begin::Menu Container */}
      <div
        id="kt_aside_menu"
        data-menu-vertical="1"
        className={`aside-menu my-4 ${layoutProps.asideClassesFromConfig}`}
        {...layoutProps.asideMenuAttr}
      >
          {!controlPanel &&<AsideMenuList layoutProps={layoutProps} />}
          {controlPanel &&<AsideMenuListControlPanel layoutProps={layoutProps} /> }

      </div>
      {/* end::Menu Container */}
    </>
  );
}
function mapStateToProps(state ){
  return {controlPanel:state.auth.controlPanelStatus}
}
export default connect(mapStateToProps)(AsideMenu);

