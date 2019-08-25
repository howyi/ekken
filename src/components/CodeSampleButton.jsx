import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import awsconfig from "../aws-exports";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default function CodeSampleButton({subscribe}) {

    const [open, setOpen] = React.useState(false);

    const [value, setValue] = React.useState(0);


    const codes = {
        bash : `curl -X POST \\
  '${awsconfig.aws_cloud_logic_custom[0].endpoint}/alert?token=${subscribe.stream.id}' \\
  -H \'Accept: */*' \\
  -H \'Cache-Control: no-cache' \\
  -H \'Connection: keep-alive' \\
  -H \'Content-Type: application/json' \\
  -H \'accept-encoding: gzip, deflate' \\
  -H \'cache-control: no-cache' \\
  -H \'content-length: 73' \\
  -d '{
    "level": "CRITICAL",
    "message": "アラートを検知しました
  }'`,
        go: `package main

import (
  "fmt"
  "strings"
  "net/http"
  "io/ioutil"
)

func main() {

  url := "${awsconfig.aws_cloud_logic_custom[0].endpoint}alert?token=${subscribe.stream.id}"

  payload := strings.NewReader("{\\n\\t\\"level\\": \\"CRITICAL\\",\\n\\t\\"message\\": \\"アラートを検知しました\\"\\n}")

  req, _ := http.NewRequest("POST", url, payload)

  req.Header.Add("Content-Type", "application/json")
  req.Header.Add("cache-control", "no-cache")

  res, _ := http.DefaultClient.Do(req)

  defer res.Body.Close()
  body, _ := ioutil.ReadAll(res.Body)

  fmt.Println(res)
  fmt.Println(string(body))
}
        `,
        php: `
<?php

$request = new HttpRequest();
$request->setUrl('${awsconfig.aws_cloud_logic_custom[0].endpoint}alert');
$request->setMethod(HTTP_METH_POST);

$request->setQueryData(array(
  'token' => '${subscribe.stream.id}'
));

$request->setHeaders(array(
  'cache-control' => 'no-cache',
  'Content-Type' => 'application/json',
));

$request->setBody('{
  "level": "CRITICAL",
  "message": "アラートを検知しました"
}');

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}
        `
    }

    function handleChange(event, newValue) {
        setValue(newValue);
    }

  return (
    <>
        <Button size="small" onClick={() => setOpen(true)}>コードサンプル</Button>

        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title" maxWidth={'lg'}>
            <DialogTitle id="form-dialog-title">コードサンプル</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    endpoint: {awsconfig.aws_cloud_logic_custom[0].endpoint}
                </DialogContentText>
                <DialogContentText>
                    token: {subscribe.stream.id}
                </DialogContentText>

                <AppBar position="static" color="default">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="bash"/>
                        <Tab label="go"/>
                        <Tab label="php"/>
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <SyntaxHighlighter language='bash' style={docco}>
                        {codes.bash}
                    </SyntaxHighlighter>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <SyntaxHighlighter language='go' style={docco}>
                        {codes.go}
                    </SyntaxHighlighter>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <SyntaxHighlighter language='php' style={docco}>
                        {codes.php}
                    </SyntaxHighlighter>
                </TabPanel>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>
                    閉じる
                </Button>
            </DialogActions>
        </Dialog>

    </>
  );
}
