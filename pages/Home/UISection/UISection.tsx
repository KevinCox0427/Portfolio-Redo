import React, { FunctionComponent, useEffect, useState } from "react";
import TextEditor from "./TextEditor";
import Title from "../components/Title";

type Props = {
    sectionContent: SectionContent,
    allSectionContent: AllSectionContent,
    defaultSectionContent: AllSectionContent,
    setSectionContent: React.Dispatch<React.SetStateAction<AllSectionContent>>,
    style: React.CSSProperties,
    cacheHasLoaded: boolean
}

const UISection: FunctionComponent<Props> = (props) => {
    const [editorHeights, setEditorHeights] = useState({
        data: {
            isCollapsed: true,
            height: 0
        },
        authentication: {
            isCollapsed: true,
            height: 0
        },
        integration: {
            isCollapsed: true,
            height: 0
        },
        analytics: {
            isCollapsed: true,
            height: 0
        },
        ui: {
            isCollapsed: true,
            height: 0
        },
        web: {
            isCollapsed: true,
            height: 0
        }
    });

    const [moving, setMoving] = useState<string | null>(null);

    useEffect(() => {
        getAllEditorHeights();
    }, [props.allSectionContent]);

    function getAllEditorHeights() {
        Object.keys(editorHeights).forEach(sectionName => {
            setEditorHeights(oldEditorHeights => {
                const element = document.getElementById(`${sectionName}Editor`) as HTMLDivElement;

                return {...oldEditorHeights,
                    [sectionName]: {...oldEditorHeights[sectionName as keyof AllSectionContent],
                        height: element ? (oldEditorHeights[sectionName as keyof AllSectionContent].isCollapsed ? element.children[0].clientHeight - 1 : element.children[0].clientHeight + element.children[1].clientHeight) : 0
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

    function moveSection(to: string) {
        if(!moving) return;

        props.setSectionContent((oldSectionContent) => {
            let newSectionContent = {...oldSectionContent};

            Object.keys(oldSectionContent).map(sectionName => {
                const currentContent = newSectionContent[sectionName as keyof AllSectionContent];
                const toContent = oldSectionContent[to as keyof AllSectionContent];
                const fromCotent = oldSectionContent[moving as keyof AllSectionContent];

                if(sectionName === moving) newSectionContent = {...newSectionContent,
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
        });

        setMoving(null);

        setTimeout(() => {
            document.body.parentElement!.scrollTo({
                top: document.getElementById('ui')!.getBoundingClientRect().top + document.documentElement.scrollTop,
                left: 0,
                behavior: 'auto'
            });
        }, 100);
    }

    function cancelMove(e:MouseEvent) {
        let target = e.target as HTMLElement;
        while(target.id !== 'root') {
            target = target.parentElement as HTMLElement;
            if(target.classList.contains('SectionEditorWrapper')) return;
        }

        setMoving(null);
        document.body.removeEventListener('click', cancelMove);
    }

    const [resetText, setResetText] = useState(0); 
    
    return <div id="ui" className='Section' style={props.style}>
        <Title content={props.sectionContent.content}></Title>
        <div className="Example">
            {Object.keys(props.allSectionContent).map((sectionName, i) => {
                const editor = editorHeights[sectionName as keyof AllSectionContent];
                const content = props.allSectionContent[sectionName as keyof AllSectionContent];

                return <div className={`SectionEditorWrapper ${moving && moving !== sectionName ? 'Activated' : ' '}`} key={i} style={{
                    order: content.order
                }} onClick={() => {
                    if(moving) moveSection(sectionName);
                }}>
                    <div className="MovingIndicator"></div>
                    <div id={`${sectionName}Editor`} className="SectionContent" style={{
                        height: editor.height
                    }}>
                        <div className="ButtonWrapper">
                            <i className="Button fa-solid fa-arrows-up-down-left-right" draggable={false} onClick={e => {
                                setMoving(sectionName);
                                document.body.addEventListener('click', cancelMove);
                            }}></i>
                            <i className={`Button ${editor.isCollapsed ? ' ' : 'Activated'} fa-solid fa-caret-right`} onClick={() => {
                                setEditorHeights(oldEditorHeights => {
                                    return {...oldEditorHeights,
                                        [sectionName]: {...oldEditorHeights[sectionName as keyof typeof oldEditorHeights],
                                            isCollapsed: !oldEditorHeights[sectionName as keyof typeof oldEditorHeights].isCollapsed
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
                            <i className="Button fa-solid fa-arrow-rotate-left" onClick={() => {
                                props.setSectionContent(oldSectionContent => {
                                    return {...oldSectionContent,
                                        [sectionName]: props.defaultSectionContent[sectionName as keyof AllSectionContent]
                                    }
                                });
                                setResetText(resetText+1);
                            }}></i>
                        </div>
                        <div className="ContentWrapper">
                            <div className="TextEditorWrapper">
                                <TextEditor content={content.content} setContent={setContent} name={sectionName} cacheHasLoaded={props.cacheHasLoaded} resetText={resetText}></TextEditor>
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </div>
    </div>
}

export default UISection;