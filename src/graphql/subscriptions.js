/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateStream = `subscription OnCreateStream {
  onCreateStream {
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
export const onUpdateStream = `subscription OnUpdateStream {
  onUpdateStream {
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
export const onDeleteStream = `subscription OnDeleteStream {
  onDeleteStream {
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
export const onCreateEvent = `subscription OnCreateEvent {
  onCreateEvent {
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
export const onUpdateEvent = `subscription OnUpdateEvent {
  onUpdateEvent {
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
export const onDeleteEvent = `subscription OnDeleteEvent {
  onDeleteEvent {
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
export const onCreateSubscribe = `subscription OnCreateSubscribe {
  onCreateSubscribe {
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
export const onUpdateSubscribe = `subscription OnUpdateSubscribe {
  onUpdateSubscribe {
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
export const onDeleteSubscribe = `subscription OnDeleteSubscribe {
  onDeleteSubscribe {
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
