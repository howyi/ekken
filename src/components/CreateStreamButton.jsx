import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";
import Ekken from "../ekken";

export default function CreateStreamButton({onCreated}) {
    const [name, setName] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const createStream = async () => {
        await Ekken.createStream(name);
        setName('');
        setOpen(false);
        await onCreated();
    };

  return (
    <>
        <Button variant="contained" fullWidth color="primary" onClick={() => setOpen(true)}>
            Streamの新規作成
        </Button>

        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Streamの新規作成</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Streamの名前を入力してください。
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="token"
                    label="name"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>
                    キャンセル
                </Button>
                <Button onClick={createStream} color="primary">
                    作成
                </Button>
            </DialogActions>
        </Dialog>

    </>
  );
}
