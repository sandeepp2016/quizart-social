import React from 'react';
import MainAppBar from '../../components/MainAppBar';
import Dashboard from '../../components/dashboard';
import NavBar from '../../components/NavBar';
// import TabsMobile from '../../components/Tabs';
import MediaQuery from 'react-responsive';
import ChatDrawer from '../../components/Chat/ChatDrawer';
import SubTopicContainer from '../../components/SubTopics/SubTopicContainer';
import restUrl from '../../restUrl';

var baseurl='/';

export default class Topics extends React.Component {

  constructor(props){
    super(props);
    this.state={
      topics:[]
    }
  }

  handleCheck(_id,topic){
    var username = Cookie.load("username");
    var newtopics;
    console.log('handle check functi =----------------');
    var likedTopic = this.state.topics;
    var result = $.grep(likedTopic, function(e){ return e._id == topic._id; });
    if (result.length == 0) {
  // not found
    topic.topicFollowers = topic.topicFollowers+1;
    newtopics = likedTopic.concat([topic]);
    } else if (result.length == 1) {
  // access the foo property using result[0].foo
  var result = $.grep(likedTopic, function(e){ return e._id != topic._id; });
  newtopics = result;
  console.log('this topic u already liked');
    }
    this.state.incre=!this.state.incre;
    this.setState({topics:newtopics});
      var data1 = {
        incre: this.state.incre,
        id:_id,
        uName:username,
        t:topic
      }
      console.log('before ajax');
      $.ajax({
        type:'POST',
        data :JSON.stringify(data1),
        contentType : 'application/json',
        url:restUrl+'/api/check',
        success:(function(data){
          console.log('folowers increamented--------------now -----------'+data);
        }).bind(this),
        error:function(err){
          console.log(err);
          console.log('error ');
        }
      })
 }

    componentDidMount(){
      $.ajax({
        url: restUrl+'/topics',
        dataType:'json',
        success: function(data){
          console.log('got success---------------------');
          console.log(JSON.stringify(data));
          this.setState({topics:data})
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
                                    <SubTopicContainer topics ={this.state.topics} fun={this.handleCheck} />
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
