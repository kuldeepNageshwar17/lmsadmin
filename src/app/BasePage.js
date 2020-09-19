import React, {Suspense, lazy} from "react";
import {Redirect, Switch, Route} from "react-router-dom";
import {LayoutSplashScreen, ContentRoute} from "../_metronic/layout";
import {BuilderPage} from "./pages/BuilderPage";
import {MyPage} from "./pages/MyPage";
import {DashboardPage} from "./pages/DashboardPage";
// import {ControlePaneDahsBoard} from "./pages/ControlePaneDahsBoard";

// const GoogleMaterialPage = lazy(() =>
//   import("./modules/GoogleMaterialExamples/GoogleMaterialPage")
// );

const ECourse = lazy(() =>
  import("./modules/ECourse")
);

const Settings = lazy(() =>
  import("./modules/Setting")
);


export default function BasePage() {
    // useEffect(() => {
    //   console.log('Base page');
    // }, []) // [] - is required if you need only one call
    // https://reactjs.org/docs/hooks-reference.html#useeffect

    return (
        <Suspense fallback={<LayoutSplashScreen/>}>
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
                <Redirect to="/error/error-v1"/>
            </Switch>
        </Suspense>
    );
}
