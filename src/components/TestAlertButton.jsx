import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { API } from 'aws-amplify';
import TextField from "@material-ui/core/TextField";

export default function TestAlertButton({subscribe}) {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const alert = async () => {
        const response = await API.post('ekkenRest', '/alert', {
            queryStringParameters: {
                'token': subscribe.stream.id
            },
            body: {
                level: "CRITICAL",
                message,

            }
        });

        console.log(response);

        setOpen(false);
    };
    
  return (
    <>
        <Button size="small" color="secondary" onClick={() => setOpen(true)}>テスト発報</Button>

        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title" maxWidth={'lg'}>
            <DialogTitle id="form-dialog-title">テスト発報</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    アラートを実行します
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="token"
                    label="メッセージ"
                    type="text"
                    fullWidth
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>
                    キャンセル
                </Button>
                <Button onClick={alert} color="secondary">
                    実行
                </Button>
            </DialogActions>
        </Dialog>

    </>
  );
}
