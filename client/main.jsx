import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';
import { Session } from 'meteor/session';
import '../imports/ui/lib/route';
Session.set('myCart', []);
console.log('start')

// else {
//   Session.set('loginAsAdmin', true);
// }
// Meteor.startup(() => {
//   render(<App/>, document.getElementById('react-root'));
// });
