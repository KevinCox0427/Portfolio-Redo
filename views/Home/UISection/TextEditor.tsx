import React, { FunctionComponent, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "../../store/store";
import { changeSectionContent } from "../../store/sectionContent";

type Props = {
    name: keyof Store["sectionContent"],
    initialValue: string
}

// Because the @types/Quill package was throwing syntax errors.
declare const Quill: any;

/**
 * A component to render a stateful Quill.js textbox.
 * @param name a unique ID for the wrapper div
 */
const TextEditor: FunctionComponent<Props> = (props) => {
    const dispatch = useDispatch();
    const hasLoadedFromCache = useSelector(state => state.metaData.hasLoadedFromCache);

    // References to the wrapper div and the Quill class.
    const editor = useRef<HTMLDivElement>(null);
    const quill = useRef<any>(null);

    // When the reference to the wrapper div has loaded, then we'll intialize the Quill class with desired settings.
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

        // Creating an event listener to set the state variable when a user types.
        quill.current!.on('text-change', (_:any, __:any, source:string) => {
            console.log(source === 'user', hasLoadedFromCache)
            if(source === 'user' && hasLoadedFromCache) {
                console.log(editor.current!.children[0].innerHTML)
                dispatch(changeSectionContent({ content: editor.current!.children[0].innerHTML, section: props.name }));
            }
        });
    }, [editor]);

    // A callback function to set the starting text. Also fires on a forced re-render.
    useEffect(() => {
        if(editor.current) editor.current.children[0].innerHTML = `${props.initialValue}`;
    }, [props.initialValue]);

    console.log('render')
    return <div ref={editor} id={`${props.name}TextEditor`} className="TitleWrapper"></div>;
}

export default TextEditor;