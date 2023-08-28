import React, { FunctionComponent, useEffect, useRef } from "react";
import { useDispatch } from "../store/store";
import { incrementPageView } from "../store/pageViews";

/**
 * React Component that will increment the page count for the current page.
 */
const AddPageView: FunctionComponent = () => {
    const dispatch = useDispatch();
    const hasAdded = useRef(false);

    useEffect(() => {
        if(hasAdded.current) return;

        // Getting the current page to increment it.
        const domain = window.location.href.split('/');
        domain.shift();
        const page = domain.join('/');

        dispatch(incrementPageView(page));
        hasAdded.current = true;
    }, []);

    return <></>;
}

export default AddPageView;