import {FetchBaseQueryError} from "@reduxjs/toolkit/query";

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error
}

function isErrorWithMessage(error: unknown): error is { message: string } {
        return (
            typeof error === 'object' &&
            error != null &&
            'message' in error &&
            typeof (error as any).message === 'string'
        )
}

export const queryErrorHandler = (error: unknown) => {
    if (isFetchBaseQueryError(error)) {
        // you can access all properties of `FetchBaseQueryError` here
        const errorObj = 'error' in error ? error.error : JSON.stringify(error.data)
        return JSON.parse(errorObj).error
    } else if (isErrorWithMessage(error)) {
        console.warn('error', error.message)
        // you can access a string 'message' property here
    }
}