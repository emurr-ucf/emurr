import { useEditor } from "@tiptap/react";

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
import Video from "./extensions/video";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import React from "react";

import { TourSiteImageType } from "../components/tour/EditorMenu";

interface Parameters {
  savingTour: React.MutableRefObject<STATUS>;
  tourImages: React.MutableRefObject<TourSiteImageType[]>;
  pageId: React.MutableRefObject<string>;
  unsavedPages: React.MutableRefObject<Map<string, string>>;
}

export enum STATUS {
  DONE = 0,
  SAVING = 1,
  SETTING = 2,
}

export const useEditorHook = ({
  savingTour,
  tourImages,
  pageId,
  unsavedPages,
}: Parameters) => {
  return useEditor({
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
      Color,
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
          "font-serif prose prose-base sm:prose lg:prose-lg xl:prose-2xl p-5 focus:outline-none",
      },
    },
    autofocus: "start",
    onUpdate: ({ editor }) => {
      // mark page as unsaved
      if (
        !unsavedPages.current.has(pageId.current) &&
        pageId.current !== "" &&
        savingTour.current === STATUS.DONE
      )
        unsavedPages.current.set(pageId.current, "");
    },
  });
};
