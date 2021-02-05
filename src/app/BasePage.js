import React, {Suspense, lazy} from "react";
import {Redirect, Switch, Route} from "react-router-dom";
import {LayoutSplashScreen, ContentRoute} from "../_metronic/layout";
import {BuilderPage} from "./pages/BuilderPage";
import {MyPage} from "./pages/MyPage";
import {DashboardPage} from "./pages/DashboardPage";
import {
  PermissionContenxt,
  PermissionsProvider
} from './modules/permissionManager/permissionContext'
// import {ControlePaneDahsBoard} from "./pages/ControlePaneDahsBoard";
import { Layout } from '../_metronic/layout'
// const GoogleMaterialPage = lazy(() =>
//   import("./modules/GoogleMaterialExamples/GoogleMaterialPage")
// );

const ECourse = lazy(() =>
  import("./modules/ECourse")
);

const Settings = lazy(() =>
  import("./modules/Setting")
);
const User = lazy(() =>
  import("./modules/Usermanagement")
);

const Student = lazy(() =>
  import("./modules/student")
);

const Exams = lazy(() =>
  import("./modules/Examination")
);

const Tests = lazy(() =>
  import("./modules/Test")
);

const Permission = lazy(() =>
  import("./modules/permissionManager")
);

const Notifications = lazy(() =>
  import("./modules/Notifications")
);
const FeeManagementIndex = lazy(() =>
  import("./modules/FeeManagement")
);

export default function BasePage() {
    // useEffect(() => {
    //   console.log('Base page');
    // }, []) // [] - is required if you need only one call
    // https://reactjs.org/docs/hooks-reference.html#useeffect

    return (
        <Suspense fallback={<LayoutSplashScreen/>}>
           <PermissionsProvider >
        
          <Layout>
            <Switch>
                {
                    /* Redirect from root URL to /dashboard. */
                    <Redirect exact from="/" to="/dashboard"/>
                }
                <ContentRoute path="/dashboard" component={DashboardPage}/>
                {/* <ContentRoute path="/controlPanel" component={"ControlePaneDahsBoard"}/> */}
                <ContentRoute path="/builder" component={BuilderPage}/>
                <ContentRoute path="/my-page" component={MyPage}/>   
                <ContentRoute path="/ecourse" component={ECourse}/>        
                <ContentRoute path="/setting" component={Settings}/>    
                <ContentRoute path="/user" component={User}/>   
                <ContentRoute path="/Student" component={Student}/>    
                <ContentRoute path="/Exams" component={Exams}/>    
                <ContentRoute path="/Test" component={Tests}/>    
                <ContentRoute path="/permission" component={Permission}/>  
                <ContentRoute path="/Notifications" component={Notifications}/>   
                <ContentRoute path="/fee" component={FeeManagementIndex}/>   
                
                {/* <Redirect to="/error/error-v1"/> */}
            </Switch>
            </Layout>
            </PermissionsProvider>
        </Suspense>
    );
}
