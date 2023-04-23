import React, { FunctionComponent } from "react";
import { SectionContent } from "../../Home";

type Props = {
    content: SectionContent,
    sectionContent: SectionContent[],
    setSectionContent: React.Dispatch<React.SetStateAction<SectionContent[]>>
}

const UISection: FunctionComponent<Props> = (props) => {
    
    return <div id={props.content.name} className='Section'>
        <h3 className='Title'>{props.content.title}</h3>
        <p className='Description'>
            {props.content.description}
            <span>{props.content.subDescription}</span>
        </p>
        <div className="Example">
            {props.sectionContent.map((content, i) => {
                return <div key={i} className="SectionContent">
                    <div className="ButtonWrapper">
                        <i className={`Button Activated fa-solid fa-caret-right`}></i>
                        <i className="Button fa-solid fa-arrows-up-down-left-right"></i>
                    </div>
                    <div className="ContentWrapper">
                        <div className="InputWrapper">
                            <input placeholder=" " id={`${content.name}NavName`} value={content.navName} onChange={e => {
                                props.setSectionContent(oldSectionData => {
                                    const deepClone:SectionContent[] = JSON.parse(JSON.stringify(oldSectionData))
                                    deepClone[i] = {...deepClone[i],
                                        navName: e.target.value
                                    };
                                    return deepClone;
                                });
                            }}></input>
                            <label htmlFor={`${content.name}NavName`}>Name:</label>
                        </div>
                        <div className="TextareaWrapper">
                            <textarea placeholder=" " id={`${content.name}Title`} value={content.title} onChange={e => {
                                props.setSectionContent(oldSectionData => {
                                    const deepClone:SectionContent[] = JSON.parse(JSON.stringify(oldSectionData))
                                    deepClone[i] = {...deepClone[i],
                                        title: e.target.value
                                    };
                                    return deepClone;
                                });
                            }}></textarea>
                            <label htmlFor={`${content.name}Title`}>Title:</label>
                        </div>
                        <div className="TextareaWrapper">
                            <textarea placeholder=" " id={`${content.name}Description`} value={content.description} onChange={e => {
                                props.setSectionContent(oldSectionData => {
                                    const deepClone:SectionContent[] = JSON.parse(JSON.stringify(oldSectionData))
                                    deepClone[i] = {...deepClone[i],
                                        description: e.target.value
                                    };
                                    return deepClone;
                                });
                            }}></textarea>
                            <label htmlFor={`${content.name}Description`}>Description:</label>
                        </div>
                        <div className="TextareaWrapper">
                            <textarea placeholder=" " id={`${content.name}SubDescription`} value={content.subDescription} onChange={e => {
                                props.setSectionContent(oldSectionData => {
                                    const deepClone:SectionContent[] = JSON.parse(JSON.stringify(oldSectionData))
                                    deepClone[i] = {...deepClone[i],
                                        subDescription: e.target.value
                                    };
                                    return deepClone;
                                });
                            }}></textarea>
                            <label htmlFor={`${content.name}SubDescription`}>Italic Text:</label>
                        </div>
                    </div>
                </div>
            })}
        </div>
    </div>
}

export default UISection;