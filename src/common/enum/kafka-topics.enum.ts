export enum KafkaTopics {
    USER_CREATED = 'user-created',
    USER_UPDATED = 'user-updated',
    USER_DELETED = 'user-deleted',
    USER_FILTERED = 'user-filtered',
    GET_USER = 'get-user',
    GET_USERS = 'get-users',
}

export enum kafkaMessageTypes {
    SUCCESS = 'success',
    ERROR = 'error',
}