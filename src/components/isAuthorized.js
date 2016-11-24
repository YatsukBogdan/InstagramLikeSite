import $ from 'jquery';

function isAuthorized(component) {
  $.post(
    '/isauthorized',
    {},
    (res) => {
      component.setState({isAuthorized: res.isAuthorized});
    }
  );
}

export default isAuthorized;
