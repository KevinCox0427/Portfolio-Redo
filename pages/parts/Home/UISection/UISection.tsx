import React, { FunctionComponent } from "react";
import { SectionContent } from "../../../Home";
import TextEditor from "./TextEditor";
import Title from "../Title";

type Props = {
    sectionContent: SectionContent,
    allSectionContent: SectionContent[],
    setSectionContent: React.Dispatch<React.SetStateAction<SectionContent[]>>
}

const UISection: FunctionComponent<Props> = (props) => {
    
    function setContent(sectionContent:string, i: number) {
        props.setSectionContent(oldSectionData => {
            const deepClone:SectionContent[] = JSON.parse(JSON.stringify(oldSectionData))
            deepClone[i] = {...deepClone[i],
                content: sectionContent
            };
            return deepClone;
        });
    }
    
    return <div id={props.sectionContent.name} className='Section'>
        <Title content={props.sectionContent.content}></Title>
        <div className="Example">
            {props.allSectionContent.map((sectionContent, i) => {
                return <div key={i} className="SectionContent">
                    <div className="ButtonWrapper">
                        <i className={`Button Activated fa-solid fa-caret-right`}></i>
                        <i className="Button fa-solid fa-arrows-up-down-left-right"></i>
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
            })}
        </div>
    </div>
}

export default UISection;