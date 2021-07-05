import { CircularProgress, Link, makeStyles, Tooltip } from "@material-ui/core"
import { DataGrid, GridColDef, GridColumns } from '@material-ui/data-grid'
import  {red, green, yellow, orange } from '@material-ui/core/colors';
import { Update, Email, ImportExport, Report, FiberManualRecord } from '@material-ui/icons';
import { SubscriptionStatus, TopicStatus } from '../types/messages'
import { nameof, toTitleCase } from "../utilities/utils"
import { useGetAllQuery } from "../services/messages";

const rootURL = "https://portal.azure.com/#@dealerpolicy.com/resource/subscriptions/5a9a2845-93e5-4701-9778-bf4abaa57ada/resourceGroups/Production_Messaging/providers/Microsoft.ServiceBus/namespaces/production8dp8messaging/topics"

interface IRow {
    id: string;
    topicName: string;
    subscriptionName: string;
    topicDisplayName: string;
    subscriptionDisplayName: string;
    status: string;
    messageCount: number;
    activeMessageCount: number;
    deadLetterMessageCount: number;
    scheduledMessageCount: number;
}

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%"
    },
    error: {
        backgroundColor: red[100],
        "&.MuiDataGrid-row:hover": {
            backgroundColor: red[50]
        },
    },
    warning: {
        backgroundColor: yellow[100],
        "&.MuiDataGrid-row:hover": {
            backgroundColor: yellow[50]
        },
    },
    ok: {
        backgroundColor: green[100],
        "&.MuiDataGrid-row:hover": {
            backgroundColor: green[50]
        },
    },
    grid: {
        fontSize: 16,
        height: "100%",
        "& .MuiDataGrid-columnHeaderWrapper": {
            background: "white"
        }
    },
}))

function ServiceBus() {
    const classes = useStyles();
    const { data: messages, isLoading } = useGetAllQuery("")


    const allColumns: Partial<GridColDef> = {
        hideSortIcons: true,
    }

    const iconColumn: Partial<GridColDef> = {
        type: 'number',
        align: "center",
        headerAlign: "center",
        width: 64,
        ...allColumns
    }

    const textColumn: Partial<GridColDef> = {
        flex: 1,
        ...allColumns
    }

    const cols: GridColumns = [
        {
            field: nameof<IRow>("id"),
            headerName: "ID",
            hide: true
        },
        {
            field: nameof<IRow>("topicDisplayName"),
            headerName: 'Topic',
            renderCell: (params) => {
                const data = params.row as IRow;
                return <Link
                            href={`${rootURL}/${data.topicName}/`}
                            target="_blank"
                            rel="noreferrer"
                        >
                    {data.topicDisplayName}
                </Link>
            },
            ...textColumn
        },
        {
            field: nameof<IRow>("subscriptionDisplayName"),
            headerName: 'Subscription',
            renderCell: (params) => {
                const data = params.row as IRow;
                return <Link
                            href={`${rootURL}/${data.topicName}/subscriptions/${data.subscriptionName}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                    {data.subscriptionDisplayName}
                </Link>
            },
            ...textColumn
        },
        {
            field: nameof<IRow>("status"),
            headerName: 'Status',
            renderHeader: () => <Tooltip title="Status" ><FiberManualRecord /></Tooltip>,
            renderCell: (params) => {
                const value = params.getValue(params.id, params.field)?.toString() ?? ""
                const colorMap: Record<string, string> = {
                    "OK": green[500],
                    "Warning": orange[500],
                    "Error": red[500]
                }
                return <Tooltip title={value} ><FiberManualRecord htmlColor={colorMap[value]} /></Tooltip>
            },
            ...iconColumn
        },
        {
            field: nameof<IRow>("messageCount"),
            headerName: 'Messages',
            renderHeader: () => <Tooltip title="Message Count" ><Email /></Tooltip>,
            ...iconColumn

        },
        {
            field: nameof<IRow>("activeMessageCount"),
            headerName: 'Active Messages',
            type: 'number',
            renderHeader: () => <Tooltip title="Active Messages" ><ImportExport /></Tooltip>,
            ...iconColumn
        },
        {
            field: nameof<IRow>("deadLetterMessageCount"),
            headerName: 'Dead Letter Messages',
            renderHeader: () => <Tooltip title="Dead Letter Messages" ><Report /></Tooltip>,
            ...iconColumn
        },
        {
            field: nameof<IRow>("scheduledMessageCount"),
            headerName: 'Schedule Messages',
            renderHeader: () => <Tooltip title="Schedule Messages" ><Update /></Tooltip>,
            ...iconColumn
        }
    ]

    const rows = messages?.topicStatuses?.flatMap((topic: TopicStatus) => {
        return topic?.subscriptionStatuses?.map((sub: SubscriptionStatus) => {
            const { status, messageCount, activeMessageCount, deadLetterMessageCount, scheduledMessageCount } = sub
            const topicDisplayName = toTitleCase(topic.topicPath.replaceAll("-", " "))
            const subscriptionDisplayName = toTitleCase(sub.subscriptionName.replaceAll(".", " ")).replace("DealerPolicy ", "").replace(" App", "").replace(/ \d+/, "").trim()
            const row: IRow = {
                id: `${topic.topicPath}-${sub.subscriptionName}`.replaceAll(" ", "-"),
                topicName: topic.topicPath,
                subscriptionName: sub.subscriptionName,
                topicDisplayName,
                subscriptionDisplayName,
                status,
                messageCount,
                activeMessageCount,
                deadLetterMessageCount,
                scheduledMessageCount
            }
            return row;
        }) ?? []
    }) ?? []


    const sortedRows = rows.sort((rowA, rowB) => {
        return rowB.deadLetterMessageCount - rowA.deadLetterMessageCount
    })

    return (
        <div className={`pull-requests ${classes.root}`}>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <DataGrid
                    className={classes.grid}
                    columns={cols}
                    rows={sortedRows}
                    pagination={undefined}
                    hideFooter={true}
                    density={"standard"}
                    disableColumnMenu={true}
                    getRowClassName={(params) => {
                        const status = (params.row as IRow).status
                        switch (status) {
                            case "OK": return classes.ok
                            case "Error": return classes.error
                            case "Warning": return classes.warning
                            default: return ""
                        }

                    }}
                />

            )}
        </div>
    )
}

export default ServiceBus
