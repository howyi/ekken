import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Ekken from "../ekken";

export default function DeleteSubscribeButton({subscribe, reloadStreams}) {
    const [open, setOpen] = React.useState(false);

    const dialogOpen = () => {
        setOpen(true)
    };

    const deleteSubscribe = async () => {
        await Ekken.deleteSubscribe(subscribe.id, subscribe.streamId);
        setOpen(false);
        reloadStreams();
    };

  return (
    <>
        <Button size="small" color="primary" onClick={dialogOpen}>解除</Button>

        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">解除</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    このユーザから{subscribe.stream.name}のStreamを解除しますか？
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>
                    キャンセル
                </Button>
                <Button onClick={deleteSubscribe} color="secondary">
                    解除
                </Button>
            </DialogActions>
        </Dialog>

    </>
  );
}
