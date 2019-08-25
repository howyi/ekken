/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStream = `query GetStream($id: ID!) {
  getStream(id: $id) {
    id
    name
    createdUser
    subscribes {
      items {
        id
        streamId
        phone
        email
      }
      nextToken
    }
    events {
      items {
        id
        title
        description
        detail
      }
      nextToken
    }
  }
}
`;
export const listStreams = `query ListStreams(
  $filter: ModelStreamFilterInput
  $limit: Int
  $nextToken: String
) {
  listStreams(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      createdUser
      subscribes {
        nextToken
      }
      events {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getEvent = `query GetEvent($id: ID!) {
  getEvent(id: $id) {
    id
    stream {
      id
      name
      createdUser
      subscribes {
        nextToken
      }
      events {
        nextToken
      }
    }
    title
    description
    detail
  }
}
`;
export const listEvents = `query ListEvents(
  $filter: ModelEventFilterInput
  $limit: Int
  $nextToken: String
) {
  listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      stream {
        id
        name
        createdUser
      }
      title
      description
      detail
    }
    nextToken
  }
}
`;
export const getSubscribe = `query GetSubscribe($id: ID!, $streamId: ID!) {
  getSubscribe(id: $id, streamId: $streamId) {
    id
    stream {
      id
      name
      createdUser
      subscribes {
        nextToken
      }
      events {
        nextToken
      }
    }
    streamId
    phone
    email
  }
}
`;
export const listSubscribes = `query ListSubscribes(
  $id: ID
  $streamId: ModelIDKeyConditionInput
  $filter: ModelSubscribeFilterInput
  $limit: Int
  $nextToken: String
) {
  listSubscribes(
    id: $id
    streamId: $streamId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      stream {
        id
        name
        createdUser
      }
      streamId
      phone
      email
    }
    nextToken
  }
}
`;
