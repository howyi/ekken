import React from 'react';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Ekken from "../ekken";
import CreateStreamButton from "./CreateStreamButton";
import SubscribeStreamButton from "./SubscribeStreamButton";
import SubscribeCard from "./SubscribeCard";
import {Auth} from "aws-amplify";

export default function Top() {
    const [state, setState] = React.useState(null);

    const reloadStreams = async () => {
        setState({
            user: ((await Auth.currentAuthenticatedUser({bypassCache: false })).attributes),
            subscribes: await Ekken.listSubscribes(),
        });
        console.log(state);
    };

    React.useEffect(() => {
        reloadStreams().then(() => {});
    },[]);

  return (
    <Grid container spacing={3}>
        <Grid item xs={12}>
        </Grid>
        {(state === null) &&
            <Grid item xs={12}>
                <LinearProgress />
            </Grid>
        }
        {state &&
        <>
            {state.subscribes.map((subscribe) => (
            <Grid item xs={12} key={subscribe.stream.id}>
                <SubscribeCard subscribe={subscribe} user={state.user} reloadStreams={reloadStreams}/>
            </Grid>
            ))}
        </>
        }
        <Grid item xs={12} sm={6}>
            <SubscribeStreamButton onSubscribed={reloadStreams} />
        </Grid>
        <Grid item xs={12} sm={6}>
            <CreateStreamButton onCreated={reloadStreams} />
        </Grid>
    </Grid>
  );
}
