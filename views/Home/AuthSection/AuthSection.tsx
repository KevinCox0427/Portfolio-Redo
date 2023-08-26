import React, { FunctionComponent } from "react";
import Register from "./Register";
import Login from "./Login";
import Title from "../components/Title";
import { useSelector } from "../../store/store";

/**
 * A component that renders the authentication section on the homepage.
 * @param windowCache The utility class that saves state variables into local storage upon state change.
 * @param sectionContent The title and description for this section. Can be changed.
 */
const AuthSection:FunctionComponent = () => {
    const sectionContent = useSelector(state => state.sectionContent.authentication);
    // The length of time a session lasts for in minutes.
    const sessionCounterAmount = 20;

    return <div id="authentication" className="Section"  style={{
        order: sectionContent.order,
        zIndex: 6 - sectionContent.order
    }}>
        <Title
            content={sectionContent.content}
        ></Title>
        <div className='Example'>
            <Register></Register>
            <div className="Divider"></div>
            <Login
                sessionCounterAmount={sessionCounterAmount}
            ></Login>
        </div>
    </div>
}

export default AuthSection;