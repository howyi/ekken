/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createStream = `mutation CreateStream($input: CreateStreamInput!) {
  createStream(input: $input) {
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
export const updateStream = `mutation UpdateStream($input: UpdateStreamInput!) {
  updateStream(input: $input) {
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
export const deleteStream = `mutation DeleteStream($input: DeleteStreamInput!) {
  deleteStream(input: $input) {
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
export const createEvent = `mutation CreateEvent($input: CreateEventInput!) {
  createEvent(input: $input) {
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
export const updateEvent = `mutation UpdateEvent($input: UpdateEventInput!) {
  updateEvent(input: $input) {
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
export const deleteEvent = `mutation DeleteEvent($input: DeleteEventInput!) {
  deleteEvent(input: $input) {
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
export const createSubscribe = `mutation CreateSubscribe($input: CreateSubscribeInput!) {
  createSubscribe(input: $input) {
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
export const updateSubscribe = `mutation UpdateSubscribe($input: UpdateSubscribeInput!) {
  updateSubscribe(input: $input) {
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
export const deleteSubscribe = `mutation DeleteSubscribe($input: DeleteSubscribeInput!) {
  deleteSubscribe(input: $input) {
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
