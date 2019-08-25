import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";
import Ekken from "../ekken";

export default function SubscribeStreamButton({onSubscribed}) {
    const [streamId, setStreamId] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const subscribeStream = async () => {
        await Ekken.createSubscribe(streamId);
        setStreamId('');
        setOpen(false);
        await onSubscribed();
    };

  return (
    <>
        <Button variant="contained" fullWidth onClick={() => setOpen(true)}>
            既存Streamの追加
        </Button>

        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Streamの新規作成</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Streamのtokenを入力してください。
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="token"
                    label="Token"
                    type="text"
                    fullWidth
                    value={streamId}
                    onChange={(event) => setStreamId(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>
                    キャンセル
                </Button>
                <Button onClick={subscribeStream} color="primary">
                    追加
                </Button>
            </DialogActions>
        </Dialog>
    </>
  );
}
