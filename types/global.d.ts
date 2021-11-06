import {
    Application,
    Request,
    Response
} from "express"
import Global = NodeJS.Global
import { Pool, RowDataPacket } from "mysql2"

declare global {
    /**
     * NPM Module Types
     * 
     * @NOTE Types and interfaces that alias
     *       NPM modules are prefixed with "_"
     */
    type _Application = Application
    type _Request = Request
    type _Response = Response
    type _Router = Router
    type _Pool = Pool
    type _RowDataPacket = RowDataPacket

    interface db_connection extends Global {
        _writeTestError: Function,
        db_connectionRuntimeErrors: Array<Error | string>,
        db_connectionOpts: Object,
        db_connectionUncaughtExceptionTriggered: boolean
    }
    declare var db_connection: Global 


    /**
     * Application Types
     * 
     * @NOTE Application specific types are all
     *       capitalized and snake cased
     */

     interface CHANNEL {
        id: number
        channel_id: number
        channel_name: string
        server_id: number
        server_name: string
        user_id: number
        user_name: string
        created_date: string
        type: string
        is_selected: number
    }

    interface CHANNELS {
        text: Array<CHANNEL>
        voice: Array<CHANNEL>
    }

    interface CHANNEL_MESSAGES {
        id: number
        channel_id: number
        server_id: number
        user_id: number
        user_name: string
        message: string
        created_date: string
    }


    interface CHANNEL_USER {
        id: number
        user_name: string
        first_name: string
        last_name: string
        email: string
        status: number
    }
    
    //<Login_Route>
            interface USER {
                id: number
                first_name: string
                last_name: string
                user_name: string
                email: string
                passwrd: string
                status: number
                created_date: string
                selected_server_id: number
                selected_server_name: string
            }

            interface SERVER {
                server_id: number
                server_name: string
                created_by_user_id: number
            }

            interface SELECTED_SERVER {
                server_id: number | null
                server_name: string
                selected_channel_id: number | null
                selected_channel_name: string
                channels: Object<CHANNELS>
            }

            interface LOGIN_ROUTE_PAYLOAD {
                user: USER
                servers: Array<SERVER>
                selected_server: SELECTED_SERVER
            }

            interface LOGIN_ROUTE_BODY {
                email: string
                password: string
            }

            /**
             * Types
             */

            type GET_USER = Promise
            
            /**
             * PromiseRejectionResult Type
             */
            type STATUS_CODE = number
    //</Login_Route>

    //<Register_Route>
            interface REGISTER_ROUTE_REQUEST_BODY {
                first_name: string
                last_name: string
                user_name: string
                email: string
                password: string
            }

            interface PARSE_REJECT_RESOLVE {
                resolve: Promise.resolve
                reject: Promise.reject
            }

            interface REGISTER_ROUTE_PAYLOAD {
                id: number
                first_name: string
                last_name: string
                user_name: string
                email: string
                passwrd: string
                status: number
                created_date: string
                selected_server_name: string
                create_date: string
            }
    //</Register_Route>

    //<Channels_Route>
            interface SAVE_MESSAGE_CONTEXT {
                channel_id: number
                server_id: number
                user_id: number
                user_name: string
                message: string
            }

            interface SAVE_SELECTED_CHANNEL_REQUEST_BODY {
                user_id: number
                selected_server_id: number
                channel_id: number
            }

            interface _CHANNELS extends CHANNELS {
                selected_channel_id: number | null
                selected_channel_name: string
            }

            interface SAVE_SELECTED_CHANNEL_PAYLOAD {
                channels: _CHANNELS
                payload: Object<{ messages: CHANNEL_MESSAGES }>
            }
    //</Channels_Route>

    //<Servers_Route>
            interface SAVE_SELECTED_SERVER_REQUEST_BODY {
                user_id: number
                server_id: number
                server_name: string
            }

            interface CREATE_SERVER_REQUEST_BODY {
                
            }
    //</Servers_Route>
}