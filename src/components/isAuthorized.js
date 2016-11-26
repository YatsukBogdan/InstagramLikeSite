import $ from 'jquery';

function isAuthorized(component) {
  $.post(
    '/isauthorized',
    {},
    (res) => {
      component.setState({isAuthorized: res.isAuthorized});
      component.setState({username: res.username});
      component.setState({restriction: res.restriction});
    }
  );
}

export default isAuthorized;
