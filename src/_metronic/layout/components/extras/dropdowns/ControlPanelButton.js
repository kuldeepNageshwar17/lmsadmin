import React from 'react'
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import {actions} from "../../../../../app/modules/Auth/_redux/authRedux"
function ControlPanelButton({changeStatus,controlPanel,isInstituteUser}) {
    let history = useHistory();
    var ActiveControlPanel=()=>{
        debugger;
        changeStatus(!controlPanel);
        history.push("/dashboard");
        // history.push("controlpanel/dashboard")
    }
    
    return (
        < >
            {controlPanel&&<button className="btn btn-primary mt-3 mb-3" onClick={ActiveControlPanel}> Dashboard</button>}             
            {isInstituteUser&&!controlPanel&&<button className="btn btn-primary mt-3 mb-3" onClick={ActiveControlPanel}>  Control Panel</button>} </>

            
          
    )
}
function mapStateToProps(state ){
    return {controlPanel:state.auth.controlPanelStatus,    isInstituteUser: state.auth.isInstituteUser
    }
  }
export default connect(mapStateToProps,{"changeStatus":actions.ChangeControlPanelStatus})(ControlPanelButton)