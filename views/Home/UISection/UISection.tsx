import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import Title from "../components/Title";
import { useDispatch, useSelector } from "../../store/store";
import { changeSectionContent, changeSectionName, moveSection, resetSection, sectionDefaults } from "../../store/sectionContent";

// Because the @types/Quill package was throwing syntax errors.
declare const Quill: any;

/**
 * A component that renders the UI seciton for the homepage.
 */
const UISection: FunctionComponent = () => {
    const dispatch = useDispatch();
    const sectionContent = useSelector(state => state.sectionContent.ui);
    const allSections = useSelector(state => state.sectionContent);
    const hasLoadedFromCache = useSelector(state => state.metaData.hasLoadedFromCache);

    // A state variable that keeps track of the styling to open and close each section's UI module to edit its contents.
    const [textEditorHeights, setTextEditorHeights] = useState({
        data: {
            isCollapsed: true,
            expandedHeight: 0
        },
        authentication: {
            isCollapsed: true,
            expandedHeight: 0
        },
        integration: {
            isCollapsed: true,
            expandedHeight: 0
        },
        analytics: {
            isCollapsed: true,
            expandedHeight: 0
        },
        ui: {
            isCollapsed: true,
            expandedHeight: 0
        },
        web: {
            isCollapsed: true,
            expandedHeight: 0
        }
    });

    // A callback function to edit the height of the text editors when a user changes its content.
    useEffect(() => {
        getAllQuillHeights();
    }, [allSections]);

    /**
     * A function to set heights on all the text editors to wrap its text.
     */
    function getAllQuillHeights() {
        const newTextEditorHeights = {...textEditorHeights};

        Object.keys(newTextEditorHeights).forEach(sectionName => {
            // Referencing the wrapper div.
            const element = document.getElementById(`${sectionName}Editor`) as HTMLDivElement;
            if(!element) return;

            // Getting the total height of its children.
            const expandedHeight = Array.from(element.children).reduce((total, element) => {
                return total + element.clientHeight;
            }, 0);

            newTextEditorHeights[sectionName as keyof typeof newTextEditorHeights].expandedHeight = expandedHeight;
        });


        setTextEditorHeights(newTextEditorHeights);
    }

    /**
     * Event handler to open and close the section editor.
     * @param sectionName The section to open and close.
     */
    function handleDropDown(sectionName: keyof Store["sectionContent"]) {
        const newTextEditorHeights = {...textEditorHeights};
        newTextEditorHeights[sectionName].isCollapsed = !newTextEditorHeights[sectionName].isCollapsed;
        setTextEditorHeights(newTextEditorHeights);
        getAllQuillHeights();
    }

    // A state variable to toggle whether the user is moving a certain section's order.
    const [moving, setMoving] = useState<keyof Store["sectionContent"] | null>(null);

    /**
     * Event handler to start the move section UI.
     * @param sectionName The sectionName to move from.
     */
    function handleStartMove(sectionName: keyof Store["sectionContent"]) {
        setMoving(sectionName);
        document.body.addEventListener('click', cancelMove);
    }

    /**
     * An event listener to cancel the movement if the user clicks elsewhere.
     */
    function cancelMove(e:MouseEvent) {
        // Ascending the document tree to make sure that the user isn't clicking a valid target (A section editor).
        let target = e.target as HTMLElement;
        while(target.id !== 'root') {
            target = target.parentElement as HTMLElement;
            if(target.classList.contains('SectionEditorWrapper')) return;
        }

        // Cancelling and removing this event listener from the body
        setMoving(null);
        document.body.removeEventListener('click', cancelMove);
    }

    /**
     * A function to move the currently toggled section to a desired position. (Stored in state variable "moving")
     * @param to The section that the toggled one will be moving to.
     */
    function moveToSection(to: keyof Store["sectionContent"]) {
        if(!moving) return;
        dispatch(moveSection({ from: moving, to: to }));

        // Now we can say the movement has finished, and scroll back to the UI section if it has been moved.
        setMoving(null);
        setTimeout(() => {
            const boundingClient = document.getElementById(`${to}Editor`)!.getBoundingClientRect();
            if(boundingClient.top > 0 && boundingClient.bottom < window.innerHeight) return;
            document.body.parentElement!.scrollTo({
                top: boundingClient.top + document.documentElement.scrollTop - window.innerHeight/2,
                left: 0
            });
        }, 100);
    }

    const textEditors = useMemo(() => Object.keys(allSections).map(sectionName => <div id={`${sectionName}TextEditor`} className="TitleWrapper"></div>), []);

    useEffect(() => {
        Object.keys(allSections).forEach(sectionName => {
            const el = document.getElementById(`${sectionName}TextEditor`)!;

            const colorArray = [false, "yellow", "green", "lightRed", "lightPurple", "blue", "grey"];
            const Color = Quill.import('attributors/class/color');
            Color.whitelist = colorArray;
            Quill.register(Color, true);

            // @ts-ignore
            const quill = new Quill(el, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ header: [false, 3] }],
                        [{ color: colorArray }],
                        ["bold", "italic", "underline", "strike", {script: "sub"}, {script: "super"}],
                        [{ indent: "-1" }, { indent: "+1" }],
                        [{align: ""}, {align: "center"}, {align: "right"}],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["image", "video", "blockquote", "link"]
                    ]
                }
            });

            // Setting the inital content as the default.
            setEditorContent(sectionName as keyof Store["sectionContent"], sectionDefaults[sectionName as keyof typeof sectionDefaults].content);

            // Creating an event listener to set the state variable when a user types.
            setTimeout(() => {quill.on('text-change', (_:any, __:any, source:string) => {
                if(source === 'user') {
                    dispatch(changeSectionContent({ content: el.children[0].innerHTML, section: sectionName as keyof Store["sectionContent"] }));
                }
            }), 50});
        });
    }, [textEditors]);

    function setEditorContent(sectionName: keyof Store["sectionContent"], content: string) {
        const el = document.getElementById(`${sectionName}TextEditor`)!;
        el.children[0].innerHTML = content;
    }

    useEffect(() => {
        Object.keys(allSections).forEach(sectionName => setEditorContent(sectionName as keyof Store["sectionContent"], allSections[sectionName as keyof typeof allSections].content));
    }, [hasLoadedFromCache]);

    /**
     * An event handler that resets the section's content and the quill editor.
     * @param sectionName The section that's being reset.
     */
    function handleResetSection(sectionName: keyof Store["sectionContent"]) {
        dispatch(resetSection(sectionName));

        setEditorContent(sectionName, sectionDefaults[sectionName].content);

        // Making sure the editor is the correct height and the current editor is focused.
        getAllQuillHeights();
        setTimeout(() => {
            const boundingClient = document.getElementById(`${sectionName}Editor`)!.getBoundingClientRect();
            if(boundingClient.top > 0 && boundingClient.bottom < window.innerHeight) return;
            document.body.parentElement!.scrollTo({
                top: boundingClient.top + document.documentElement.scrollTop - window.innerHeight/2,
                left: 0
            });
        }, 100);
    }
    
    return <div id="ui" className='Section' style={{
        order: sectionContent.order,
        zIndex: 6 - sectionContent.order
    }}>
        <Title
            content={sectionContent.content}
        ></Title>
        <div className="Example">
            {Object.keys(allSections).map((sectionName, i) => {
                const editor = textEditorHeights[sectionName as keyof typeof textEditorHeights];
                const section = allSections[sectionName as keyof typeof allSections];

                return <div className={`SectionEditorWrapper ${moving && moving !== sectionName ? 'Activated' : ' '}`} key={i} style={{
                    order: section.order
                }} onClick={() => {if(moving) moveToSection(sectionName as keyof Store["sectionContent"])}}>
                    <div className="MovingIndicator"></div>
                    <div id={`${sectionName}Editor`} className="SectionContent" style={{
                        height: editor.isCollapsed ? '3.75em' : editor.expandedHeight
                    }}>
                        <div className="ButtonWrapper">
                            <i
                                className={`Button fa-solid ${ !moving ? 'fa-arrows-up-down' : moving === sectionName ? 'fa-x' : 'fa-check'}`}
                                draggable={false}
                                onClick={e => {handleStartMove(sectionName as keyof Store["sectionContent"])}}
                            ></i>
                            <i
                                className={`Button ${editor.isCollapsed ? ' ' : 'Activated'} fa-solid fa-caret-right`}
                                onClick={e => {handleDropDown(sectionName as keyof Store["sectionContent"])}}
                            ></i>
                            <div className="InputWrapper">
                                <input
                                    placeholder=" "
                                    id={`${sectionName}NavName`}
                                    value={section.navName}
                                    onChange={e => dispatch(changeSectionName({ name: e.target.value, section: sectionName as keyof Store["sectionContent"]}))}
                                ></input>
                                <label htmlFor={`${sectionName}NavName`}>Name:</label>
                            </div>
                            <i
                                className="Button fa-solid fa-arrow-rotate-left"
                                onClick={() => handleResetSection(sectionName as keyof Store["sectionContent"])}
                            ></i>
                        </div>
                        <div className="ContentWrapper">
                            <div className="TextEditorWrapper">
                                {textEditors[i]}
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </div>
    </div>
}

export default UISection;   