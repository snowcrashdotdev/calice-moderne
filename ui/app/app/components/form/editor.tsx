import { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor"
import dynamic from "next/dynamic"
import { forwardRef } from "react"
import "@mdxeditor/editor/style.css"

const Editor = dynamic(() => import("./mdx-editor"), {
    // Make sure we turn SSR off
    ssr: false
})

// This is what is imported by other components. Pre-initialized with plugins, and ready
// to accept other props, including a ref.
const ForwardRefEditor = forwardRef<MDXEditorMethods, MDXEditorProps>((props, ref) => <Editor {...props} editorRef={ref} />)

// TS complains without the following line
ForwardRefEditor.displayName = "Editor"

export default ForwardRefEditor