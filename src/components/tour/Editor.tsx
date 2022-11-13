/* 
  This file is a work in progess.
  It will be used to create a tour editor.
*/

import {
  Editor as EditorType,
  EditorContent,
  getAttributes,
  useEditor,
} from "@tiptap/react";

// The below extensions are included on StarterKit
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlock from "@tiptap/extension-code-block";
import Document from "@tiptap/extension-document";
import HardBreak from "@tiptap/extension-hard-break";
import Heading from "@tiptap/extension-heading";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Code from "@tiptap/extension-code";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
// End of StarterKit extensions
// Additional Extensions
import CharacterCount from "@tiptap/extension-character-count";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import History from "@tiptap/extension-history";
import Image from "@tiptap/extension-image";
import Video from "../../lib/extensions/video";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
// End of Additional Extensions
import { STATUS } from "../../pages/tours/[id]";
import { TourSiteImageType } from "./EditorMenu";
import { useEffect } from "react";

interface EditorProps {
  pageId: React.MutableRefObject<string>;
  savingTour: React.MutableRefObject<STATUS>;
  tourImages: React.MutableRefObject<TourSiteImageType[]>;
  unsavedPages: React.MutableRefObject<Map<string, string>>;
  setHeading: React.Dispatch<React.SetStateAction<string>>;
  setFontFamily: React.Dispatch<React.SetStateAction<string>>;
  editor: EditorType | null;
  setEditor: React.Dispatch<React.SetStateAction<EditorType | null>>;
}

export const Editor = ({
  pageId,
  savingTour,
  tourImages,
  unsavedPages,
  setHeading,
  setFontFamily,
  editor,
  setEditor,
}: EditorProps) => {
  const editorRef = useEditor({
    extensions: [
      Blockquote.configure({
        HTMLAttributes: {
          style:
            "background: #F6F2EE; border-left: 0.25rem solid #ccc; padding: 0 0.5rem;",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          style: "list-style: disc; margin-left: 1rem;",
        },
      }), // tag: ul
      CodeBlock,
      Document,
      HardBreak,
      Heading.configure({
        HTMLAttributes: {
          style: "font-weight: bolder;",
        },
      }),
      HorizontalRule,
      ListItem,
      OrderedList.configure({
        HTMLAttributes: {
          style: "list-style: decimal; margin-left: 1rem;",
        },
      }), // tag: ol
      Paragraph,
      Text,
      Bold,
      Code.configure({
        HTMLAttributes: {
          style: "color: inherit",
        },
      }),
      Italic,
      Strike,
      CharacterCount,
      Underline,
      TextStyle,
      FontFamily,
      Subscript,
      Superscript,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      History,
      // tag: table
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          style:
            "border-collapse: collapse; margin: 0; overflow: hidden; table-layout: fixed; width: 100%;",
        },
      }),
      // tag: tr
      TableRow,
      // tag: th
      TableHeader.configure({
        HTMLAttributes: {
          style:
            "background-color: #f1f3f5; font-weight: bold; text-align: left; border: 1px solid; box-sizing: border-box; min-width: 1em; padding: 3px 5px; position: relative; vertical-align: top;",
        },
      }),
      // tag: td
      TableCell.configure({
        HTMLAttributes: {
          style:
            "border: 1px solid; box-sizing: border-box; min-width: 1em; padding: 3px 5px; position: relative; vertical-align: top;",
        },
      }),
      Image.extend({
        renderHTML({ HTMLAttributes }) {
          if (savingTour.current === STATUS.SAVING) {
            HTMLAttributes.src = HTMLAttributes.alt;
            return ["img", HTMLAttributes];
          } else {
            tourImages.current.forEach((image) => {
              if (image.name === HTMLAttributes.name) {
                HTMLAttributes.src = image.bloburl;
              }
            });
            return ["img", HTMLAttributes];
          }
        },
        addAttributes() {
          return {
            ...this.parent?.(),
            name: {
              renderHTML: (attributes) => {
                if (attributes.src) {
                  const src = /([a-zA-Z0-9\s_\\.\-\(\):])+$/.exec(
                    attributes.alt
                  );
                  if (src) {
                    const name = src[0];
                    return {
                      name,
                    };
                  }
                }
              },
            },
          };
        },
      }),
      Video.extend({
        renderHTML({ HTMLAttributes }) {
          if (savingTour.current === STATUS.SAVING) {
            HTMLAttributes.src = HTMLAttributes.alt;
            return ["video", HTMLAttributes];
          } else {
            tourImages.current.forEach((image) => {
              if (image.name === HTMLAttributes.name) {
                HTMLAttributes.src = image.bloburl;
              }
            });
            return ["video", HTMLAttributes];
          }
        },
        addAttributes() {
          return {
            ...this.parent?.(),
            name: {
              renderHTML: (attributes) => {
                if (attributes.src) {
                  const src = /([a-zA-Z0-9\s_\\.\-\(\):])+$/.exec(
                    attributes.alt
                  );
                  if (src) {
                    const name = src[0];
                    return {
                      name,
                    };
                  }
                }
              },
            },
          };
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-base sm:prose lg:prose-lg xl:prose-2xl p-5 focus:outline-none",
      },
    },
    autofocus: "start",
    onUpdate: () => {
      // mark page as unsaved
      if (
        !unsavedPages.current.has(pageId.current) &&
        pageId.current !== "" &&
        savingTour.current === STATUS.DONE
      )
        unsavedPages.current.set(pageId.current, "");
    },
    onSelectionUpdate: ({ editor }) => {
      if (editor.isActive("paragraph")) setHeading("Paragraph");
      else if (editor.isActive("heading", { level: 1 }))
        setHeading("Heading 1");
      else if (editor.isActive("heading", { level: 2 }))
        setHeading("Heading 2");
      else if (editor.isActive("heading", { level: 3 }))
        setHeading("Heading 3");
      else if (editor.isActive("heading", { level: 4 }))
        setHeading("Heading 4");
      else if (editor.isActive("heading", { level: 5 }))
        setHeading("Heading 5");
      else if (editor.isActive("heading", { level: 6 }))
        setHeading("Heading 6");
      else setHeading("");

      if (
        editor.isActive("textStyle", {
          fontFamily:
            "ui-serif, Georgia, Cambria, Times New Roman, Times, serif",
        })
      )
        setFontFamily("Times");
      else if (editor.isActive("textStyle", { fontFamily: "Arial" }))
        setFontFamily("Arial");
      else if (editor.isActive("textStyle", { fontFamily: "Courier New" }))
        setFontFamily("Courier New");
      else setFontFamily("");
    },
  });

  // useEffect(() => {
  //   if (pageId.current) console.log("test");
  // }, [pageId]);

  return <EditorContent editor={editorRef} />;
};
