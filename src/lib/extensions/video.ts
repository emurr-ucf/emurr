import { mergeAttributes, Node, nodeInputRule } from "@tiptap/core";

export interface VideoOptions {
  inline: boolean;
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    video: {
      setVideo: (options: {
        src: string;
        alt?: string;
        name?: string;
      }) => ReturnType;
    };
  }
}

export const inputRegex =
  /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;

const video = Node.create<VideoOptions>({
  name: "video",

  addOptions() {
    return {
      inline: false,
      HTMLAttributes: {},
    };
  },

  inline() {
    return this.options.inline;
  },

  group() {
    return this.options.inline ? "inline" : "block";
  },

  draggable: false,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      name: {
        default: null,
      },
      controls: {
        default: true,
      },
      type: {
        default: "video/mp4",
      },
      disablePictureInPicture: {
        default: true,
      },
      style: {
        default: "display: block; margin: 0 auto;",
      },
      width: {
        default: "80%",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "video[src]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "video",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addCommands() {
    return {
      setVideo:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: (match) => {
          const [, , alt, src, name] = match;
          return { src, alt, name };
        },
      }),
    ];
  },
});

export default video;
