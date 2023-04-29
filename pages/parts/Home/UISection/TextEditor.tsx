import React, { FunctionComponent, useEffect, useRef } from "react";
import QuillType from "quill";


type Props = {
    content: string,
    setContent: (content: string, i:number) => void,
    index: number
}

declare const Quill: any

const TextEditor: FunctionComponent<Props> = (props) => {
    const editor = useRef<HTMLDivElement>(null);
    const quill = useRef<QuillType | null>(null);

    useEffect(() => {
        const colorArray = [false, "yellow", "green", "lightRed", "lightPurple", "blue", "grey"];
        const Color = Quill.import('attributors/class/color');
        Color.whitelist = colorArray;
        Quill.register(Color, true);

        // @ts-ignore
        quill.current = new Quill(editor.current, {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ header: [false, 3] }],
                    [{ color: colorArray }],
                    ["bold", "italic", "underline", "strike", {script: "sub"}, {script: "super"}],
                    [{ indent: "-1" }, { indent: "+1" }],
                    [{align: ""}, {align: "center"}, {align: "right"}],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["image", "video", "blockquote", "link"]
                ]
            }
        });

        quill.current!.on('text-change', (delta, delta2, source) => {
            if(source === 'user') props.setContent(editor.current!.children[0].innerHTML, props.index);
        });
    }, [editor]);

    const initHasLoaded = useRef<boolean | null>(null);

    useEffect(() => {
        if(initHasLoaded.current === true) return;
        if(initHasLoaded.current === false) initHasLoaded.current = true;
        if(initHasLoaded.current === null) initHasLoaded.current = false;
        editor.current!.children[0].innerHTML = `${props.content}`;
    }, [props.content]);
    
    return <>
        <div ref={editor} id={`Editor${props.index}`} className="TitleWrapper"></div>
    </>
}

export default TextEditor;