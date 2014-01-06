/**
 * @jsx React.DOM
 */

var Application = React.createClass({
  render: function() {
    var elapsed = Math.round(this.props.elapsed  / 100);
    var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' );
    var message =
      'React has been successfully running for ' + seconds + ' seconds.';

    return <p>{message}</p>;
  }
});

var start = new Date().getTime();

setInterval(function() {
  React.renderComponent(
    <Application elapsed={new Date().getTime() - start} />,
    document.getElementById('container')
  );
}, 50);
