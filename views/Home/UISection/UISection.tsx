import React, { FunctionComponent, useEffect, useState } from "react";
import TextEditor from "./TextEditor";
import Title from "../components/Title";

type Props = {
    sectionContent: SectionContent,
    allSectionContent: AllSectionContent,
    setSectionContent: React.Dispatch<React.SetStateAction<AllSectionContent>>,
    defaultSectionContent: AllSectionContent,
    cacheHasLoaded: boolean
}

/**
 * A component that renders the UI seciton for the homepage.
 * @param sectionContent The title and description for this section.
 * @param allSectionContent A state variable representing the titles and descriptions for all sections.
 * @param setSectionContent The set state function to change any of the section's content.
 * @param defaultSectionContent The defaulted titles and descriptions to be able to reset.
 * @param cacheHasLoaded A state variable represnting whether the windowCache utility class has finished loading content from local storage.
 */
const UISection: FunctionComponent<Props> = (props) => {
    // State variable to force a re-render in the text editor.
    // This is mostly to update the text editor's content when the page loads or a user resets to default.
    const [resetText, setResetText] = useState(0); 

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

    /**
     * Event handler to update the name of a section
     * @param sectionName The section whose name is being overwritten.
     */
    function handleNameChange(e:React.ChangeEvent<HTMLInputElement>, sectionName:string) {
        props.setSectionContent(oldSectionData => {
            return {...oldSectionData,
                [sectionName]: {...oldSectionData[sectionName as keyof AllSectionContent],
                    navName: e.target.value
                }
            }
        });
    }

    /**
     * Event handler to reset a section to its default values.
     * @param sectionName The section whose being reset.
     */
    function handleResetSection(sectionName:string) {
        props.setSectionContent(oldSectionContent => {
            return {...oldSectionContent,
                [sectionName]: props.defaultSectionContent[sectionName as keyof AllSectionContent]
            }
        });
        setResetText(resetText+1);
    }

    // A callback function to edit the height of the text editors when a user changes its content.
    useEffect(() => {
        getAllEditorHeights();
    }, [props.allSectionContent]);

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
    
    /**
     * A function to set the content of a given section.
     * @param sectionContent The content as an HTML string.
     * @param name The section being editted.
     */
    function setContent(sectionContent: string, name: string) {
        props.setSectionContent(oldSectionData => {
            return {...oldSectionData,
                [name]: {...oldSectionData[name as keyof AllSectionContent],
                    content: sectionContent
                }
            };
        });
    }

    // A state variable to toggle whether the user is moving a certain section's order.
    const [moving, setMoving] = useState<string | null>(null);

    /**
     * A function to move the currently toggled section to a desired position. (Stored in state variable "moving")
     * @param to The section that the toggled one will be moving to.
     */
    function moveSection(to: string) {
        if(!moving) return;

        props.setSectionContent((oldSectionContent) => {
            // Setting references for the from & to sections' data.
            const toSection = oldSectionContent[to as keyof AllSectionContent];
            const fromSection = oldSectionContent[moving as keyof AllSectionContent];
            let newSectionContent = {...oldSectionContent};

            // Looping through each section and overwritting it's "order" value to reflect the movement.
            Object.keys(oldSectionContent).map(sectionName => {
                // Referencing the current section in the loop.
                const currentSection = newSectionContent[sectionName as keyof AllSectionContent];

                // If this is the section we're moving, just set the order to the one specified in the parameter.
                if(sectionName === moving) {
                    newSectionContent = {...newSectionContent,
                        [sectionName]: {...currentSection,
                            order: toSection.order
                        }
                    }
                }

                // If the section is being moved upwards, then the sections inbetween the from and to sections must move down 1.
                if(fromSection.order > toSection.order) {
                    if(currentSection.order >= toSection.order && currentSection.order < fromSection.order) {
                        newSectionContent = {...newSectionContent,
                            [sectionName]: {...currentSection,
                                order: currentSection.order + 1
                            }
                        }
                    }
                }
                // If the section is being moved downwards, then the sections inbetween the from and to sections must move up 1.
                else {
                    if(currentSection.order <= toSection.order && currentSection.order > fromSection.order) {
                        newSectionContent = {...newSectionContent,
                            [sectionName]: {...currentSection,
                                order: currentSection.order - 1
                            }
                        }
                    }
                }
            });

            return newSectionContent;
        });

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
    function handleStartMove(sectionName:string) {
        setMoving(sectionName);
        document.body.addEventListener('click', cancelMove);
    }

    /**
     * An event handler to cancel the movement if the user clicks.
     */
    function cancelMove(e:MouseEvent) {
        // Ascending the document tree to make sure that the user isn't clicking a valid target (A section editor).
        let target = e.target as HTMLElement;
        while(target.id !== 'root') {
            target = target.parentElement as HTMLElement;
            if(target.classList.contains('SectionEditorWrapper')) return;
        }

        setMoving(null);
        document.body.removeEventListener('click', cancelMove);
    }
    
    return <div id="ui" className='Section' style={{
        order: props.sectionContent.order,
        zIndex: 6 - props.sectionContent.order
    }}>
        <Title
            content={props.sectionContent.content}
        ></Title>
        <div className="Example">
            {Object.keys(props.allSectionContent).map((sectionName, i) => {
                const editor = editorHeights[sectionName as keyof AllSectionContent];
                const content = props.allSectionContent[sectionName as keyof AllSectionContent];

                return <div className={`SectionEditorWrapper ${moving && moving !== sectionName ? 'Activated' : ' '}`} key={i} style={{
                    order: content.order
                }} onClick={() => {if(moving) moveSection(sectionName)}}>
                    <div className="MovingIndicator"></div>
                    <div id={`${sectionName}Editor`} className="SectionContent" style={{
                        height: editor.isCollapsed ? '3.75em' : editor.expandedHeight
                    }}>
                        <div className="ButtonWrapper">
                            <i className="Button fa-solid fa-arrows-up-down-left-right" draggable={false} onClick={e => {handleStartMove(sectionName)}}></i>
                            <i className={`Button ${editor.isCollapsed ? ' ' : 'Activated'} fa-solid fa-caret-right`} onClick={e => {handleDropDown(sectionName)}}></i>
                            <div className="InputWrapper">
                                <input placeholder=" " id={`${sectionName}NavName`} value={content.navName} onChange={e => {handleNameChange(e, sectionName)}}></input>
                                <label htmlFor={`${sectionName}NavName`}>Name:</label>
                            </div>
                            <i className="Button fa-solid fa-arrow-rotate-left" onClick={() => {handleResetSection(sectionName)}}></i>
                        </div>
                        <div className="ContentWrapper">
                            <div className="TextEditorWrapper">
                                <TextEditor
                                    content={content.content}
                                    setContent={setContent}
                                    name={sectionName}
                                    cacheHasLoaded={props.cacheHasLoaded}
                                    resetText={resetText}
                                ></TextEditor>
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </div>
    </div>
}

export default UISection;