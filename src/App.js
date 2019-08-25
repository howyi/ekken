import React from 'react';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import {Container} from "@material-ui/core";
import Top from "./components/Top";

Amplify.configure(awsconfig);

function App() {
  return (
    <div>
      <Container maxWidth={"sm"}>
        <Top/>
      </Container>
    </div>
  );
}

export default withAuthenticator(App, true);
