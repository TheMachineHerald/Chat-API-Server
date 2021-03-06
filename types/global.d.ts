import Global = NodeJS.Global
import {
    Application,
    Request,
    Response
} from "express"
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
    type _reject = Promise.reject<T>
    type _resolve = Promise.resolve<T>
    
    interface db_connection extends Global {
        _writeTestError: Function,
        db_connectionRuntimeErrors: Array<Error | string>,
        db_connectionOpts: Object,
        db_connectionUncaughtExceptionTriggered: boolean
    }

    declare var db_connection: Global 
    /** ---------------------------------------------------------------------- */
    /**
     * Application Types
     * 
     * @NOTE Application specific types are all
     *       capitalized and snake cased
     */

        interface USER {
            id: number
            first_name: string
            last_name: string
            user_name: string
            email: string
            passwrd: string
            status: number
            home_selected: number | boolean
            selected_friend_id: number
            selected_friend_user_name: string
            selected_server_id: number
            selected_server_name: string
            created_date: string
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
    /** ---------------------------------------------------------------------- */
    /**
     * [Login Route]
     */
            interface LOGIN_ROUTE_RESPONSE {
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
    /** ---------------------------------------------------------------------- */
    /**
     * [Register Route]
     */
            interface REGISTER_ROUTE_REQUEST_BODY {
                first_name: string
                last_name: string
                user_name: string
                email: string
                password: string
            }

            interface PARSE_REJECT_RESOLVE {
                resolve: _resolve<void>
                reject: _reject<number>
            }

            interface REGISTER_ROUTE_RESPONSE {
                user: USER
                servers: Array<Servers>
                selected_server: SELECTED_SERVER
            }
    /** ---------------------------------------------------------------------- */
    /**
     * [Channels Route]
     */
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

            interface SAVE_SELECTED_CHANNEL_RESPONSE {
                channels: _CHANNELS
                payload: Object<{ messages: CHANNEL_MESSAGES }>
            }
    /** ---------------------------------------------------------------------- */
    /**
     * [Servers Route]
     */
            interface SAVE_SELECTED_SERVER_REQUEST_BODY {
                user_id: number
                server_id: number
                server_name: string
            }

            interface CREATE_SERVER_REQUEST_BODY {
                
            }
    /** ---------------------------------------------------------------------- */
    /**
     * [Friends Route]
     */
            interface FRIENDS_RESPONSE {
                id: number
                user_name: string
                first_name: string
                last_name: string
                email: string
            }
    /** ---------------------------------------------------------------------- */
    /**
     * [User Route]
     */

            interface SAVE_USER_MESSAGE_REQUEST {
                user_id: number
                user_name: string
                friend_id: number
                friend_user_name: string
                message: string
            }

            interface SAVE_SELECTED_FRIEND_REQUEST {
                user_id: number
                friend_id: number
                friend_user_name: string
            }
    /** ---------------------------------------------------------------------- */
}