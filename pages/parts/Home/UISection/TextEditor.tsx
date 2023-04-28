import React, { FunctionComponent, useEffect, useRef } from "react";
import type Quill from "quill";
import parse from 'html-react-parser';


type Props = {
    content: string,
    setContent: (content: string, i:number) => void,
    index: number
}

const TextEditor: FunctionComponent<Props> = (props) => {
    const editor = useRef<HTMLDivElement>(null);
    const quill = useRef<Quill | null>(null);

    useEffect(() => {
        // @ts-ignore
        quill.current = new Quill(editor.current, {
            theme: 'snow'
        });

        editor.current!.children[0].innerHTML = `${props.content}`;
    }, [editor]);
    
    return <>
        <div ref={editor} id={`Editor${props.index}`} className="TitleWrapper"></div>
    </>
}

export default TextEditor;