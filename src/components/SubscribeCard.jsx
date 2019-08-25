import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CodeSampleButton from "./CodeSampleButton";
import DeleteSubscribeButton from "./DeleteSubscribeButton";
import Grid from '@material-ui/core/Grid';
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import Ekken from "../ekken";
import TestAlertButton from "./TestAlertButton";

export default function SubscribeCard({subscribe, reloadStreams, user}) {

    console.log(subscribe);
    const [input, setInput] = React.useState({
       phone: (subscribe.phone !== null),
       email: (subscribe.email !== null),
    });

    const handleChange = name => async (event) => {
        const newInput = { ...input, [name]: event.target.checked };
        setInput(newInput);
        await Ekken.updateSubscribe(
            subscribe.id,
            subscribe.streamId,
            newInput.phone ? user.phone_number : null,
            newInput.email ? user.email : null,
        );
        reloadStreams();
    };

  return (
      <Card>
          <CardContent>
              <Typography color="textSecondary" gutterBottom>
                  Token: {subscribe.stream.id}
              </Typography>
              <Typography variant="h5" component="h2">
                  {subscribe.stream.name}
              </Typography>
              <Typography color="textSecondary">
                  last event: 11h ago
              </Typography>
              <Divider />
              <Grid container spacing={3}>
                  <Grid item xs={4}>
                      <FormControlLabel
                          control={
                              <Switch
                                  checked={input.phone}
                                  onChange={handleChange('phone')}
                                  color="primary"
                                  label="電話"
                              />
                          }
                          label="電話"
                      />
                  </Grid>
                  <Grid item xs={8}>
                      <TextField
                          margin="dense"
                          label="電話番号"
                          type="text"
                          value={user.phone_number}
                          fullWidth
                          disabled
                      />
                  </Grid>
                  <Grid item xs={4}>
                      <FormControlLabel
                          control={
                              <Switch
                                  checked={input.email}
                                  onChange={handleChange('email')}
                                  color="primary"
                                  label="メール"
                              />
                          }
                          label="メール"
                      />
                  </Grid>
                  <Grid item xs={8}>
                      <TextField
                          margin="dense"
                          label="メールアドレス"
                          type="text"
                          value={user.email}
                          fullWidth
                          disabled
                      />
                  </Grid>
              </Grid>
          </CardContent>
          <CardActions>
              <CodeSampleButton subscribe={subscribe} />
              <DeleteSubscribeButton subscribe={subscribe} reloadStreams={reloadStreams} />
              <TestAlertButton subscribe={subscribe} />
          </CardActions>
      </Card>
  );
}
