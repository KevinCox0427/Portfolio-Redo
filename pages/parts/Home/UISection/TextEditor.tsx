import React, { FunctionComponent, useEffect, useRef } from "react";
import QuillType from "quill";


type Props = {
    content: string,
    setContent: (content: string, name: string) => void,
    name: string,
    cacheHasLoaded: boolean,
    resetText: number
}

declare const Quill: any;

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
            if(source === 'user') props.setContent(editor.current!.children[0].innerHTML, props.name);
        });


    }, [editor]);

    useEffect(() => {
        editor.current!.children[0].innerHTML = `${props.content}`;
    }, [props.cacheHasLoaded, props.resetText]);
    
    return <>
        <div ref={editor} id={`${props.name}TextEditor`} className="TitleWrapper"></div>
    </>
}

export default TextEditor;