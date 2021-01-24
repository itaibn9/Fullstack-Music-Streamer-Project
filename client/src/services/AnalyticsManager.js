import Mixpanel from 'mixpanel';
var mixpanel = Mixpanel.init('4986ca8a3df26daf6d96c39c85382ebf');

let actions = {
    identify: (id) => {
      mixpanel.identify(id);
    },
    alias: (id) => {
      mixpanel.alias(id);
    },
    track: (name, props) => {
      mixpanel.track(name, props);
    },
    people: {
      set: (props) => {
        mixpanel.people.set(props);
      },
    },
  };
  
  export let Mix = actions;