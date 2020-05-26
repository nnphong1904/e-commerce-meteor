import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';
import { Session } from 'meteor/session';
import '../imports/ui/lib/route';
Session.set('myCart', []);
console.log('start')
// if (window.history.state !== null){
//   if (window.history.state.path.split('/')[1] === 'admin'){
//     Session.set('loginAsAdmin', true);
//   }
//   else {
//     Session.set('loginAsAdmin', false);
//   }
// }
// else {
//   Session.set('loginAsAdmin', true);
// }
// Meteor.startup(() => {
//   render(<App/>, document.getElementById('react-root'));
// });
