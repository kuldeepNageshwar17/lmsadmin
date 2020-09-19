import React from 'react'
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import {actions} from "../../../../../app/modules/Auth/_redux/authRedux"
function ControlPanelButton({changeStatus,controlPanel}) {
    let history = useHistory();
    var ActiveControlPanel=()=>{
        debugger;
        changeStatus(!controlPanel);
        // history.push("controlpanel/dashboard")
    }
    
    return (
        < >
            {controlPanel&&<button className="btn btn-primary" onClick={ActiveControlPanel}> Dashboard</button>} 
            
            {!controlPanel&&<button className="btn btn-primary" onClick={ActiveControlPanel}>  Control Panel</button>} </>

            
          
    )
}
function mapStateToProps(state ){
    return {controlPanel:state.auth.controlPanelStatus}
  }
export default connect(mapStateToProps,{"changeStatus":actions.ChangeControlPanelStatus})(ControlPanelButton)