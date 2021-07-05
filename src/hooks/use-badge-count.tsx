import { useEffect, useState } from "react"
import { useGetAllQuery } from "../services/messages"
import { clearBadge, setBadge } from "../utilities/badgeApi"

export function useBadgeCount() {
    const { data: messages , isLoading } = useGetAllQuery("")
    const [freshData, setFreshData] = useState(true)

    useEffect(()=> {
        if (messages && freshData && !isLoading) {
            const errorCount = messages?.topicStatuses?.filter(t => t.status === "Error").length ?? 0
            if (errorCount > 0) {
                setBadge(errorCount)
            } else {
                clearBadge();
            }
            setFreshData(false)
        }
    }, [messages, freshData, isLoading])

    const handleClick = (e: any) => {
        clearBadge()
    };

    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
    }, []);

}
