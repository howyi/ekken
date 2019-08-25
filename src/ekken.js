import {API, graphqlOperation} from 'aws-amplify';
import {listSubscribes} from "./graphql/queries";
import {createStream, createSubscribe, deleteSubscribe, updateSubscribe} from "./graphql/mutations";

export default class Ekken {
    static async listSubscribes() {
        const response = await API.graphql(
            graphqlOperation(
                listSubscribes,
                { },
            ),
        );
        return response.data.listSubscribes.items;
    }

    static async updateSubscribe(id, streamId, phone, email) {
        const input = {
            id,
            streamId,
            phone,
            email
        };
        const response = await API.graphql(
            graphqlOperation(
                updateSubscribe,
                { input },
            ),
        );
        return response.data.updateSubscribe;
    }

    static async createStream(name) {
        const input = {
            name,
        };
        const streamResponse = await API.graphql(
            graphqlOperation(
                createStream,
                { input },
            ),
        );
        const stream = streamResponse.data.createStream;
        const subscribe = await Ekken.createSubscribe(stream.id);
        return {stream, subscribe};
    }

    static async createSubscribe(streamId) {
        const input = {
            streamId,
        };
        const response = await API.graphql(
            graphqlOperation(
                createSubscribe,
                { input },
            ),
        );
        return response.data.createSubscribe;
    }

    static async deleteSubscribe(id, streamId) {
        const input = {
            id,
            streamId,
        };
        const response = await API.graphql(
            graphqlOperation(
                deleteSubscribe,
                { input },
            ),
        );
        return response.data.createSubscribe;
    }
}
