
var React = require('react');
var ReactDOM = require('react-dom');
require('./main.scss');
//to run script remember to use webpack-dev-server --progress --colors --host $IP --port $PORT
var CamperList = React.createClass({
  propTypes: {
    campers: React.PropTypes.array.isRequired,
    sortedByRecent: React.PropTypes.array.isRequired,
    sortedByAllTime: React.PropTypes.array.isRequired
  },
  getInitialState: function() {
    return {selectedOrder: this.props.sortedByRecent(this.props.campers)}
  },
  setToAllTime: function() {
    this.setState({selectedOrder: this.props.sortedByAllTime(this.props.campers) });
  },
  setToRecent: function() {
    this.setState({selectedOrder: this.props.sortedByRecent(this.props.campers) });
  },
  componentDidMount: function() {
    //Toggle down-arrow
    $('#all-time').on('click', function() {
      $('#recent i').removeClass('fa-caret-down');
      $('#all-time i').addClass('fa fa-caret-down');
    });
    $('#recent').on('click', function() {
      $('#all-time i').removeClass('fa-caret-down');
      $('#recent i').addClass('fa fa-caret-down');

    });
  },
  render() {
  
    return (
      <table>
         <tr>
          <th>#{this.state.text}</th>
          <th>
            <h4>Camper Name</h4></th>
          <th id='recent' className='table-title' onClick={this.setToRecent}>
            <h4 className='text-center'>Points in past 30 days
              <i className="fa fa-caret-down" aria-hidden="true"></i>
            </h4>
          </th>
          <th id='all-time' className='table-title' onClick={this.setToAllTime}>
            <h4 className='text-center'>
              All time points
              <i></i>
            </h4>
          </th>
        </tr>
          {this.state.selectedOrder.map(function(user, index) {
        
            return (
              <tr>
                <td>{index+1}</td>
                <td className='user-info'>
                  <a href={'https://www.freecodecamp.com/' + user.username} target='blank'><img src={user.img} /> {user.username}</a></td>
                <td><h4 className='text-center'>{user.recentPoints}</h4></td>
                <td><h4 className='text-center'>{user.allTimePoints}</h4></td>
              </tr>);
            })
         }
        
          </table>
    );

  }
});

$.getJSON('https://fcctop100.herokuapp.com/api/fccusers/top/recent', function(data) {

  var camperData = data.map((user) => {
    return {
      img: user.img,
      username: user.username,
      recentPoints: user.recent,
      allTimePoints: user.alltime,
    };

  });
  console.log(camperData[0]);
  var SortedList = React.createClass({
    sortByRecent: function(array) {
      return array.sort(function(a, b) {
        return b.recentPoints-a.recentPoints;
        });
    },
    sortByAllTime: function(array) {
      return array.sort(function(a, b) {
        return b.allTimePoints-a.allTimePoints;
        
      });
    },
    render() {
      return <CamperList campers={camperData} sortedByRecent={this.sortByRecent} sortedByAllTime={this.sortByAllTime} />;
    }
  });
  ReactDOM.render(<SortedList />, document.getElementById('leaderboard'));
});