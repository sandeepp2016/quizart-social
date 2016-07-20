import MainAppBar from '../../components/MainAppBar';
import MediaQuery from 'react-responsive';
import ChatDrawer from '../../components/Chat/ChatDrawer';
import React from 'react';
import TournamentsSubContainer from '../../components/SubTournaments/TournamentsSubContainer';
import restUrl from '../../restUrl';
import TabsMobile from '../../components/Tabs';

var baseurl='/';

export default class Topics extends React.Component {

  constructor(props){
    super(props);
    this.state={
      tournamentData:[]
    }
  }


    componentDidMount(){
      $.ajax({
        url: restUrl+'/tournaments',
        dataType:'json',
        success: function(data){
          console.log('got success---------------------');
          console.log(JSON.stringify(data));
          this.setState({tournamentData:data})
          console.log('------------------------'+data+'----------------------');
        }.bind(this),
        error:function(err){
          console.log(err);
          console.log('error');
        }
      })
    }
    render() {

          var style = {
            paddingRight:0,
          };

          var bodyContainer = {
            padding: "16px",
            paddingTop: "80px",

          }
      return (
            <div>
              <MainAppBar/>
              <MediaQuery query='(max-device-width: 800px)'>
                <MediaQuery query='(max-width: 800px)'>
                  <TabsMobile page="Tournament" tournament ={this.state.tournamentData}/>
                </MediaQuery>
              </MediaQuery>

              <MediaQuery query='(min-device-width: 800px)'>
                <MediaQuery query='(min-width: 800px)'>
                  <div className="container-fluid" >
                    <div className="row" >
                      <div style={{width: "100%"}} >
                        <div className="row" >
                          <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12" style={bodyContainer}>
                            <div className="row">
                                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-lg-offset-1" >
                                <TournamentsSubContainer tournament ={this.state.tournamentData} />
                                </div>
                                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1"  style={{paddingTop:20}}>
                                  <ChatDrawer/>
                                </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </MediaQuery>
              </MediaQuery>
              </div>
          );
}
};
