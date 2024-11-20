"use client"

import { type DialogHTMLAttributes, useRef } from "react";

export function Dialog({ open, onClose, onCancel, children, className }: DialogHTMLAttributes<HTMLDialogElement>) {
    const dialogRef = useRef<HTMLDialogElement>(null)

    if (open) dialogRef.current?.showModal()

    return (
        <dialog ref={dialogRef} onClose={onClose} onCancel={onCancel} className={`p-4 rounded ${className ?? ""}`.trim()}>
            <button type="button" onClick={() => dialogRef.current?.close()}>Close</button>
            {children}
        </dialog>
    )
}