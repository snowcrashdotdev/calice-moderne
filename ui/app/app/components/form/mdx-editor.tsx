"use client"

import type { ForwardedRef } from "react"
import {
    BlockTypeSelect,
    BoldItalicUnderlineToggles,
    CreateLink,
    headingsPlugin,
    listsPlugin,
    ListsToggle,
    linkPlugin,
    linkDialogPlugin,
    markdownShortcutPlugin,
    MDXEditor,
    Separator,
    toolbarPlugin,
    type MDXEditorMethods,
    type MDXEditorProps
} from "@mdxeditor/editor"

export default function InitializedMDXEditor({
    editorRef,
    ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
    return (
        <MDXEditor
            contentEditableClassName="prose"
            plugins={[
                linkPlugin(),
                linkDialogPlugin(),
                headingsPlugin(),
                listsPlugin(),
                markdownShortcutPlugin(),
                toolbarPlugin({
                    toolbarContents: () => (
                        <>
                            <BoldItalicUnderlineToggles />
                            <Separator />
                            <ListsToggle />
                            <Separator />
                            <CreateLink />
                            <Separator />
                            <BlockTypeSelect />
                        </>
                    )
                })
            ]}
            {...props}
            ref={editorRef}
        />
    )
}