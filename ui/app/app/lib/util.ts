export const at = (datetime: string) => ((new Date(datetime)).toLocaleTimeString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
}))

export const past = (datetime: string) => Date.now() >= Date.parse(datetime)