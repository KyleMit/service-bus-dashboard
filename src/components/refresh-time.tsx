import { Box, IconButton } from "@material-ui/core"
import { Refresh } from "@material-ui/icons"
import { useState } from "react"
import { useInterval } from "../hooks/use-interval"
import { useGetAllQuery } from "../services/messages"

export function RefreshTime() {
    const [lastRefreshTime, setLastRefreshTime] = useState<Date>(new Date())
    const { refetch } = useGetAllQuery("")

    const refreshData = () => {
        setLastRefreshTime(new Date())
        refetch()
    }

    useInterval(refreshData, 60 * 1000)

    const formatTime = (dt: Date): string => {
        const hrs = dt.getHours();
        const min = dt.getMinutes();
        const hrs12 = hrs > 12 ? hrs - 12 : hrs
        return `${hrs12}:${min.toString().padStart(2, '0')}`
    }

    return <Box display="flex" alignItems="center" justifyContent="flex-end">
        Last Refreshed: {formatTime(lastRefreshTime)}
        <IconButton aria-label="refresh data" size="small">
            <Refresh />
        </IconButton>
    </Box>
}
