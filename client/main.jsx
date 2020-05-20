import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';
import { Session } from 'meteor/session';
import '../imports/ui/lib/route';
Session.set('myCart', []);
Session.set('loginAsAdmin', false);
// Meteor.startup(() => {
//   render(<App/>, document.getElementById('react-root'));
// });
