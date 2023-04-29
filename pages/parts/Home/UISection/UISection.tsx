import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { SectionContent } from "../../../Home";
import TextEditor from "./TextEditor";
import Title from "../Title";

type Props = {
    sectionContent: SectionContent,
    allSectionContent: SectionContent[],
    setSectionContent: React.Dispatch<React.SetStateAction<SectionContent[]>>
}

const UISection: FunctionComponent<Props> = (props) => {
    const [contentEditors, setContentEditors] = useState(props.allSectionContent.map(content => {
        return {
            isCollapsed: true,
            isHovering: false,
            isMoving: false,
            height: 0
        }
    }));

    const [isMoving, setIsMoving] = useState(false);

    useEffect(() => {
        getAllEditorHeights();
    }, [props.allSectionContent]);

    function getAllEditorHeights() {
        const editorEls = Array.from(document.getElementsByClassName('SectionContent')) as HTMLDivElement[];

        if(editorEls.length !== contentEditors.length) return;

        setContentEditors(oldContentEditors => {
            return [...oldContentEditors].map((editor, i) => {
                return {...editor,
                    height: editor.isCollapsed ? editorEls[i].children[0].clientHeight - 1 : editorEls[i].children[0].clientHeight + editorEls[i].children[1].clientHeight + 15
                }
            });
        });
    }
    
    function setContent(sectionContent:string, i: number) {
        props.setSectionContent(oldSectionData => {
            const deepClone:SectionContent[] = JSON.parse(JSON.stringify(oldSectionData))
            deepClone[i] = {...deepClone[i],
                content: sectionContent
            };
            return deepClone;
        });
    }

    useEffect(() => {
        console.log(contentEditors)
    }, [contentEditors])

    function moveSection() {
        const fromIndex = contentEditors.reduce((previousIndex, currentValue, index) => {
            if(currentValue.isMoving) return index;
            else return previousIndex;
        }, -1);

        const toIndex = contentEditors.reduce((previousIndex, currentValue, index) => {
            if(currentValue.isHovering) return index;
            else return previousIndex;
        }, -1);

        console.log(fromIndex, toIndex)

        if(fromIndex === -1 || toIndex === -1) return;

        setContentEditors((oldContentEditors) => {
            const newContentEditors = [...oldContentEditors];

            const temp = {...newContentEditors[fromIndex],
                isMoving: false
            };
            newContentEditors.splice(fromIndex, 1);
            newContentEditors.splice(toIndex, 0, temp);

            return newContentEditors;
        })
    }
    
    useEffect(() => {
        window.addEventListener('mouseup', moveSection);
    }, []);

    
    return <div id={props.sectionContent.name} className='Section'>
        <Title content={props.sectionContent.content}></Title>
        <div className="Example">
            {props.allSectionContent.map((sectionContent, i) => {
                return <Fragment key={i}>
                    <div className="MovingIndicator" style={contentEditors[i].isHovering && isMoving ? {
                        opacity: 1,
                        margin: '0em'
                    } : {
                        opacity: 0,
                        margin: '-1em 0'
                    }}></div>
                    <div className="SectionContent" style={{
                        height: contentEditors[i].height,
                        opacity: contentEditors[i].isMoving ? 0.5 : 1
                    }} onMouseOver={e => {
                        console.log((e.target as HTMLElement).classList)
                        if(!(e.target as HTMLElement).classList.contains('SectionContent')) return;
                        setContentEditors(oldContentEditors => {
                            const newContentEditors = [...oldContentEditors];
                            newContentEditors[i].isHovering = true;
                            return newContentEditors;
                        });
                    }} onMouseOut={e => {
                        console.log((e.target as HTMLElement).classList)
                        if(!(e.target as HTMLElement).classList.contains('SectionContent')) return;
                        setContentEditors(oldContentEditors => {
                            const newContentEditors = [...oldContentEditors];
                            newContentEditors[i].isHovering = false;
                            return newContentEditors;
                        });
                    }}>
                        <div className="ButtonWrapper">
                            <i className="Button fa-solid fa-arrows-up-down-left-right" onMouseDown={e => {
                                setContentEditors(oldContentEditors => {
                                    const newContentEditors = [...oldContentEditors];
                                    newContentEditors[i].isMoving = true;
                                    return newContentEditors;
                                });
                            }}></i>
                            <i className={`Button ${contentEditors[i].isCollapsed ? ' ' : 'Activated'} fa-solid fa-caret-right`} onClick={() => {
                                setContentEditors(oldContentEditors => {
                                    const newContentEditors = [...oldContentEditors];
                                    newContentEditors[i].isCollapsed = !newContentEditors[i].isCollapsed;
                                    return newContentEditors;
                                });
                                getAllEditorHeights();
                            }}></i>
                            <div className="InputWrapper">
                                <input placeholder=" " id={`${sectionContent.name}NavName`} value={sectionContent.navName} onChange={e => {
                                    props.setSectionContent(oldSectionData => {
                                        const deepClone:SectionContent[] = JSON.parse(JSON.stringify(oldSectionData))
                                        deepClone[i] = {...deepClone[i],
                                            navName: e.target.value
                                        };
                                        return deepClone;
                                    });
                                }}></input>
                                <label htmlFor={`${sectionContent.name}NavName`}>Name:</label>
                            </div>
                        </div>
                        <div className="ContentWrapper">
                            <div className="TextEditorWrapper">
                                <TextEditor content={sectionContent.content} setContent={setContent} index={i}></TextEditor>
                            </div>
                        </div>
                    </div>
                </Fragment>
            })}
        </div>
    </div>
}

export default UISection;