import React, { FunctionComponent, useEffect, useRef } from "react";
import type Quill from "quill";


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

        editor.current!.innerHTML = props.content;
    }, [editor]);
    
    return <>
        <div ref={editor} id={`Editor${props.index}`}></div>
    </>
}

export default TextEditor;