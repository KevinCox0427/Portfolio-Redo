import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { AllSectionContent, SectionContent } from "../../../Home";
import TextEditor from "./TextEditor";
import Title from "../Title";

type Props = {
    sectionContent: SectionContent,
    allSectionContent: AllSectionContent,
    setSectionContent: React.Dispatch<React.SetStateAction<AllSectionContent>>,
    style: React.CSSProperties
}

const UISection: FunctionComponent<Props> = (props) => {
    const [contentEditors, setContentEditors] = useState({
        data: {
            isCollapsed: true,
            isHovering: false,
            isMoving: false,
            height: 0
        },
        authentication: {
            isCollapsed: true,
            isHovering: false,
            isMoving: false,
            height: 0
        },
        integration: {
            isCollapsed: true,
            isHovering: false,
            isMoving: false,
            height: 0
        },
        analytics: {
            isCollapsed: true,
            isHovering: false,
            isMoving: false,
            height: 0
        },
        ui: {
            isCollapsed: true,
            isHovering: false,
            isMoving: false,
            height: 0
        },
        web: {
            isCollapsed: true,
            isHovering: false,
            isMoving: false,
            height: 0
        }
    });

    const [isMoving, setIsMoving] = useState(false);

    useEffect(() => {
        getAllEditorHeights();
    }, [props.allSectionContent]);

    function getAllEditorHeights() {
        Object.keys(contentEditors).forEach(sectionName => {
            setContentEditors(oldContentEditors => {
                const element = document.getElementById(`${sectionName}Editor`) as HTMLDivElement;

                return {...oldContentEditors,
                    [sectionName]: {...oldContentEditors[sectionName as keyof AllSectionContent],
                        height: element ? (oldContentEditors[sectionName as keyof AllSectionContent].isCollapsed ? element.children[0].clientHeight - 1 : element.children[0].clientHeight + element.children[1].clientHeight + 15) : 0
                    }
                }
            })
        });
    }
    
    function setContent(sectionContent: string, name: string) {
        props.setSectionContent(oldSectionData => {
            return {...oldSectionData,
                [name]: {...oldSectionData[name as keyof AllSectionContent],
                    content: sectionContent
                }
            };
        });
    }

    function moveSection() {
        const from = Object.keys(contentEditors).reduce((previousName, currentName) => {
            const editor = contentEditors[currentName as keyof AllSectionContent];

            if(editor.isMoving) return currentName;
            else return previousName;
        }, '');

        const to = Object.keys(contentEditors).reduce((previousName, currentName) => {
            const editor = contentEditors[currentName as keyof AllSectionContent];

            if(editor.isHovering) return currentName;
            else return previousName;
        }, '');

        resetMove();

        if(from === '' || to === '' || from === to) return;

        props.setSectionContent((oldSectionContent) => {
            let newSectionContent = {...oldSectionContent};

            Object.keys(oldSectionContent).map(sectionName => {
                const currentContent = newSectionContent[sectionName as keyof AllSectionContent];
                const toContent = oldSectionContent[to as keyof AllSectionContent];
                const fromCotent = oldSectionContent[from as keyof AllSectionContent];

                if(sectionName === from) newSectionContent = {...newSectionContent,
                    [sectionName]: {...currentContent,
                        order: toContent.order
                    }
                }
                if(fromCotent.order > toContent.order) {
                    if(currentContent.order >= toContent.order && currentContent.order < fromCotent.order) newSectionContent = {...newSectionContent,
                        [sectionName]: {...currentContent,
                            order: currentContent.order + 1
                        }
                    }
                }
                else {
                    if(currentContent.order <= toContent.order && currentContent.order > fromCotent.order) newSectionContent = {...newSectionContent,
                        [sectionName]: {...currentContent,
                            order: currentContent.order - 1
                        }
                    }
                }
            });

            return newSectionContent;
        })
    }

    function resetMove() {
        setIsMoving(false);
        setContentEditors(oldContentEditors => {
            return {
                data: {...oldContentEditors.data,
                    isHovering: false,
                    isMoving: false
                },
                authentication: {...oldContentEditors.authentication,
                    isHovering: false,
                    isMoving: false
                },
                integration: {...oldContentEditors.integration,
                    isHovering: false,
                    isMoving: false
                },
                analytics: {...oldContentEditors.analytics,
                    isHovering: false,
                    isMoving: false
                },
                ui: {...oldContentEditors.ui,
                    isHovering: false,
                    isMoving: false
                },
                web: {...oldContentEditors.web,
                    isHovering: false,
                    isMoving: false
                }
            }
        }) 
    }
    
    return <div id="ui" className='Section' onMouseUp={moveSection} onMouseLeave={resetMove} style={props.style}>
        <Title content={props.sectionContent.content}></Title>
        <div className="Example">
            {Object.keys(props.allSectionContent).map((sectionName, i) => {
                const editor = contentEditors[sectionName as keyof AllSectionContent];
                const content = props.allSectionContent[sectionName as keyof AllSectionContent]

                return <Fragment key={i}>
                    <div id={`${sectionName}Editor`} className="SectionContent" style={isMoving ? {
                        height: editor.height,
                        order: (content.order-1)*2,
                        opacity: editor.isMoving ? 0.5 : 1,
                        transform: editor.isHovering && !editor.isMoving ? 'translate(15px)' : ' ',
                        userSelect: 'none'
                    } : {
                        height: editor.height,
                        order: (content.order-1)*2
                    }} onMouseEnter={e => {
                        setContentEditors(oldContentEditors => {
                            return {...oldContentEditors,
                                [sectionName]: {...oldContentEditors[sectionName as keyof AllSectionContent],
                                    isHovering: true
                                }
                            }
                        });
                    }} onMouseLeave={e => {
                        setContentEditors(oldContentEditors => {
                            return {...oldContentEditors,
                                [sectionName]: {...oldContentEditors[sectionName as keyof AllSectionContent],
                                    isHovering: false
                                }
                            }
                        });
                    }}>
                        <div className="ButtonWrapper">
                            <i className="Button fa-solid fa-arrows-up-down-left-right" draggable={false} onMouseDown={e => {
                                setIsMoving(true);
                                setContentEditors(oldContentEditors => {
                                    return {...oldContentEditors,
                                        [sectionName]: {...oldContentEditors[sectionName as keyof AllSectionContent],
                                            isMoving: true
                                        }
                                    }
                                });
                            }}></i>
                            <i className={`Button ${editor.isCollapsed ? ' ' : 'Activated'} fa-solid fa-caret-right`} onClick={() => {
                                setContentEditors(oldContentEditors => {
                                    return {...oldContentEditors,
                                        [sectionName]: {...oldContentEditors[sectionName as keyof AllSectionContent],
                                            isCollapsed: !oldContentEditors[sectionName as keyof AllSectionContent].isCollapsed
                                        }
                                    }
                                });
                                getAllEditorHeights();
                            }}></i>
                            <div className="InputWrapper">
                                <input placeholder=" " id={`${sectionName}NavName`} value={content.navName} onChange={e => {
                                    props.setSectionContent(oldSectionData => {
                                        return {...oldSectionData,
                                            [sectionName]: {...oldSectionData[sectionName as keyof AllSectionContent],
                                                navName: e.target.value
                                            }
                                        }
                                    });
                                }}></input>
                                <label htmlFor={`${sectionName}NavName`}>Name:</label>
                            </div>
                        </div>
                        <div className="ContentWrapper">
                            <div className="TextEditorWrapper">
                                <TextEditor content={content.content} setContent={setContent} name={sectionName}></TextEditor>
                            </div>
                        </div>
                    </div>
                    <div className="MovingIndicator" style={{
                        opacity: editor.isHovering && !editor.isMoving ? 1 : 0,
                        height: editor.height + 15,
                        marginTop: -editor.height - 52,
                        order: (content.order-1)*2 + 1
                    }}></div>
                </Fragment>
            })}
        </div>
    </div>
}

export default UISection;