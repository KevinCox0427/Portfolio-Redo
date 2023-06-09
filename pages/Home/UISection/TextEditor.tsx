import React, { FunctionComponent, useEffect, useRef } from "react";

type Props = {
    content: string,
    setContent: (content: string, name: string) => void,
    name: string,
    cacheHasLoaded: boolean,
    resetText: any
}

/**
 * Because the @types/Quill package was throwing syntax errors.
 */
declare const Quill: any;

/**
 * A component to render a stateful Quill.js textbox.
 * 
 * @param content The state variable containing the content.
 * @param setContent The function to set the state variable.
 * @param name a unique ID for the wrapper div,
 * @param cacheHasLoaded A state variable represnting whether the windowCache utility class has finished loading content from local storage.
 * @param resetText A way to force a re-render by changing state. Can be whatever value you want.
 */
const TextEditor: FunctionComponent<Props> = (props) => {
    /**
     * References to the wrapper div and the Quill class.
     */
    const editor = useRef<HTMLDivElement>(null);
    const quill = useRef<any>(null);

    /**
     * When the reference to the wrapper div has loaded, then we'll intialize the Quill class with desired settings.
     */
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

        /**
         * Creating an event listener to set the state variable when a user types.
         */
        quill.current!.on('text-change', (_:any, __:any, source:string) => {
            if(source === 'user') {
                props.setContent(editor.current!.children[0].innerHTML, props.name);
            }
        });
    }, [editor]);

    /**
     * A callback function to set the starting text. Also fires on a forced re-render.
     */
    useEffect(() => {
        if(editor.current) editor.current.children[0].innerHTML = `${props.content}`;
    }, [props.cacheHasLoaded, props.resetText]);
    
    return <div ref={editor} id={`${props.name}TextEditor`} className="TitleWrapper"></div>
}

export default TextEditor;