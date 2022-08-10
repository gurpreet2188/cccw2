import { useEffect, useState } from "react"

export default function Crpyto() {
    const [data, SetData] = useState()

    useEffect(() => {
        const f = async () => {
            const res = await fetch('')
            const d = await res.json()
            SetData(d)
        }
        f()
    }, [])

    return data
}
