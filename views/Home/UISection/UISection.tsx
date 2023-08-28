import React, { FunctionComponent, useEffect, useState } from "react";
import Title from "../components/Title";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "../../store/store";
import { changeSectionContent, changeSectionName, moveSection, resetSection } from "../../store/sectionContent";

/**
 * A component that renders the UI seciton for the homepage.
 */
const UISection: FunctionComponent = () => {
    const dispatch = useDispatch();
    const sectionContent = useSelector(state => state.sectionContent.ui);
    const allSections = useSelector(state => state.sectionContent);

    // A state variable that keeps track of the styling to open and close each section's UI module to edit its contents.
    const [editorHeights, setEditorHeights] = useState({
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
        getAllEditorHeights();
    }, [allSections]);

    /**
     * A function to set heights on all the text editors to wrap its text.
     */
    function getAllEditorHeights() {
        setEditorHeights(oldEditorHeights => {
            let newEditorHeights = {...oldEditorHeights};
            
            Object.keys(editorHeights).forEach(sectionName => {
                // Referencing the wrapper div.
                const element = document.getElementById(`${sectionName}Editor`) as HTMLDivElement;
                if(!element) return;

                // Getting the total height of its children.
                const sectionData = newEditorHeights[sectionName as keyof AllSectionContent];
                const expandedHeight = Array.from(element.children).reduce((total, element) => {
                    return total + element.clientHeight;
                }, 0);

                // Inserting the new height into the object.
                newEditorHeights = {...newEditorHeights,
                    [sectionName]: {...sectionData,
                        expandedHeight: expandedHeight
                    }
                }
            });
            
            return newEditorHeights;
        });
    }

    /**
     * Event handler to open and close the section editor.
     * @param sectionName The section to open and close.
     */
    function handleDropDown(sectionName: string) {
        setEditorHeights(oldEditorHeights => {
            return {...oldEditorHeights,
                [sectionName]: {...oldEditorHeights[sectionName as keyof typeof oldEditorHeights],
                    isCollapsed: !oldEditorHeights[sectionName as keyof typeof oldEditorHeights].isCollapsed
                }
            }
        });
        getAllEditorHeights();
    }

    // A state variable to toggle whether the user is moving a certain section's order.
    const [moving, setMoving] = useState<keyof AllSectionContent | null>(null);

    /**
     * A function to move the currently toggled section to a desired position. (Stored in state variable "moving")
     * @param to The section that the toggled one will be moving to.
     */
    function moveToSection(to: keyof AllSectionContent) {
        if(!moving) return;
        dispatch(moveSection({ from: moving, to: to }));

        // Now we can say the movement has finished, and scroll back to the UI section if it has been moved.
        setMoving(null);
        setTimeout(() => {
            document.body.parentElement!.scrollTo({
                top: document.getElementById('ui')!.getBoundingClientRect().top + document.documentElement.scrollTop,
                left: 0,
                behavior: 'auto'
            });
        }, 100);
    }

    /**
     * Event handler to start the move section UI.
     * @param sectionName The sectionName to move from.
     */
    function handleStartMove(sectionName: keyof AllSectionContent) {
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

    console.log(typeof document);
    
    return <div id="ui" className='Section' style={{
        order: sectionContent.order,
        zIndex: 6 - sectionContent.order
    }}>
        <Title
            content={sectionContent.content}
        ></Title>
        <div className="Example">
            {Object.keys(allSections).map((sectionName, i) => {
                const editor = editorHeights[sectionName as keyof AllSectionContent];
                const content = allSections[sectionName as keyof AllSectionContent];

                return <div className={`SectionEditorWrapper ${moving && moving !== sectionName ? 'Activated' : ' '}`} key={i} style={{
                    order: content.order
                }} onClick={() => {if(moving) moveToSection(sectionName as keyof AllSectionContent)}}>
                    <div className="MovingIndicator"></div>
                    <div id={`${sectionName}Editor`} className="SectionContent" style={{
                        height: editor.isCollapsed ? '3.75em' : editor.expandedHeight
                    }}>
                        <div className="ButtonWrapper">
                            <i
                                className={`Button fa-solid ${ !moving ? 'fa-arrows-up-down' : moving === sectionName ? 'fa-x' : 'fa-check'}`}
                                draggable={false}
                                onClick={e => {handleStartMove(sectionName as keyof AllSectionContent)}}
                            ></i>
                            <i
                                className={`Button ${editor.isCollapsed ? ' ' : 'Activated'} fa-solid fa-caret-right`}
                                onClick={e => {handleDropDown(sectionName)}}
                            ></i>
                            <div className="InputWrapper">
                                <input
                                    placeholder=" "
                                    id={`${sectionName}NavName`}
                                    value={content.navName}
                                    onChange={e => dispatch(changeSectionName({ name: e.target.value, section: sectionName }))}
                                ></input>
                                <label htmlFor={`${sectionName}NavName`}>Name:</label>
                            </div>
                            <i
                                className="Button fa-solid fa-arrow-rotate-left"
                                onClick={() => dispatch(resetSection(sectionName))}
                            ></i>
                        </div>
                        <div className="ContentWrapper">
                            <div className="TextEditorWrapper">
                                {/* {typeof document !== 'undefined'
                                    ? <ReactQuill
                                        id={`${sectionName}TextEditor`}
                                        value={allSections[sectionName].content}
                                        modules={{
                                            toolbar: [
                                                [{ header: [false, 3] }],
                                                [{ color: [false, "yellow", "green", "lightRed", "lightPurple", "blue", "grey"] }],
                                                ["bold", "italic", "underline", "strike", {script: "sub"}, {script: "super"}],
                                                [{ indent: "-1" }, { indent: "+1" }],
                                                [{align: ""}, {align: "center"}, {align: "right"}],
                                                [{ list: "ordered" }, { list: "bullet" }],
                                                ["image", "video", "blockquote", "link"]
                                            ]
                                        }}
                                        onChange={text => dispatch(changeSectionContent({ content: text, section: sectionName }))}
                                    ></ReactQuill>
                                    : <></>
                                } */}
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </div>
    </div>
}

export default UISection;   