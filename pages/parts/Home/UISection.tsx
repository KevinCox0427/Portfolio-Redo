import React, { FunctionComponent } from "react";
import { SectionContent } from "../../Home";
import TextEditor from "./UISection/TextEditor";
import parse, { Element } from 'html-react-parser';

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
        {parse(props.sectionContent.content, {
            replace: (node) => {
                const validTags = ['DIV', 'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'A', 'SPAN', 'EM', 'STRONG', 'SMALL', 'IMAGE'];
                if(!(node instanceof Element)) return node;
                if(validTags.includes(node.tagName)) return node;
                return false;
            }
        })}
        <div className="Example">
            {props.allSectionContent.map((sectionContent, i) => {
                return <div key={i} className="SectionContent">
                    <div className="ButtonWrapper">
                        <i className={`Button Activated fa-solid fa-caret-right`}></i>
                        <i className="Button fa-solid fa-arrows-up-down-left-right"></i>
                    </div>
                    <div className="ContentWrapper">
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
                        <div className="TextEditorWrapper">
                            <label htmlFor={`Editor${i}`}>Description:</label>
                            <TextEditor content={sectionContent.content} setContent={setContent} index={i}></TextEditor>
                        </div>
                    </div>
                </div>
            })}
        </div>
    </div>
}

export default UISection;