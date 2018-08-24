function myHandler(e) {
	var video = document.getElementsByTagName('video')[0];
	var mediaName=document.getElementsByTagName('video')[0].getAttribute("name");
	var mediaLength = video.duration;
	var mediaPlayerName = "HTML5 Basic Player";
	//Define video offset
	if (video.currentTime > 0) {
		mediaOffset = Math.floor(video.currentTime);
	} else {
		mediaOffset = 0;
	};

	switch(e.type) {
	case "play":
		//Call on video start
		if (mediaOffset ==0) {
			s.Media.open(mediaName,mediaLength,mediaPlayerName);
			s.Media.play(mediaName,0);
		} else {
			s.Media.play(mediaName,mediaOffset);
		}
		break;
	case "seeking":
		//Call on scrub start
		s.Media.stop(mediaName,mediaOffset);
		break;
	case "seeked":
		//Call on scrub stop
		s.Media.play(mediaName,mediaOffset);
		break;
	case "pause":
		//Call on pause
		s.Media.stop(mediaName,mediaOffset);
		break;
	case "ended":
		//Call on video complete
		s.Media.stop(mediaName,mediaOffset);
		s.Media.close(mediaName);
		mediaOffset = 0;
		break;
	default:
		break;
	}

};

/* Auto Track is false */
 s.loadModule("Media")
s.Media.onLoad = function(s,m) {
    s.Media.autoTrack= false;
    s.Media.trackVars="prop7,eVar7,eVar8,eVar9";
    s.Media.trackEvents="event7,event8,event9,event10,event11,event12,event23";
    s.Media.trackMilestones="15,45,95";
    s.Media.playerName="My Media Player";
    s.Media.segmentByMilestones = true;
    s.Media.trackUsingContextData = true;
    
    //Specify the custom events to be sent with Media calls
    
  
    // Map the custom events to the % milestones
   
    s.Media.contextDataMapping = {
        "a.media.name":"eVar7,prop7",
        "a.media.segment":"eVar8",
        "a.contentType":"eVar9",
        "a.media.timePlayed":"event9",
        "a.media.view":"event10",
        "a.media.segmentView":"event11",
        "a.media.complete":"event12",
        "a.media.milestones":{
            15:"event7",
            45:"event8",
            95:"event23"
        }
    }
};




/* Auto Track set to true 
s.loadModule("Media")
s.Media.onLoad = function(s,m) {
	s.Media.autoTrack= true;
	//Track Milestone 10%, 25%, 50%, 75%, 95%
	// Delete unwanted milestone if necessary
	
	s.Media.trackMilestones="10,25,50,75,95";
	s.Media.playerName= dataLayer.videoDetails.player;
	s.Media.segmentByMilestones = true;
	s.Media.trackUsingContextData = true;
	// Add reserved context data variables as needed to populate default metrics
	//   a.media.progress10, a.media.progress25, a.media.progress50 ,a.media.progress75, a.media.progress95
	//	a.media.friendlyname --> to populate Video Name report
	
	s.Media.trackVars="contextData.a.media.progress10,contextData.a.media.progress25,contextData.a.media.progress50,contextData.a.media.progress75,contextData.a.media.progress95,contextData.a.media.friendlyname";
};

//
// USE MEDIA MONITOR TO SEND THE ADDITIONAL a.media.progressXX variables: needed as no processing rules are created by default to handle media.milestone
//

s.Media.monitor = function (s,media){
	
		
	//Reset Variables
	s.contextData['a.media.progress10'] = s.contextData['a.media.progress25'] = s.contextData['a.media.progress50'] = s.contextData['a.media.progress75'] = s.contextData['a.media.progress95'] = s.contextData['a.media.friendlyname'] =  '';
	
	s.contextData['a.media.friendlyname'] = '' //assign custom friendly name if needed
	//if no custom friendly name
	if(!s.contextData['a.media.friendlyname']){
		//default to media.name
		s.contextData['a.media.friendlyname'] = media.name;
	}
	
	//If MILESTONE EVENT
	if(media.event=="MILESTONE") {
		//Check which milestone has been reached: media.milestone
		switch (media.milestone) {
			//When the 10% milestone is reached add a.media.progress10 to the Adobe Analytics request
			case 10:
				s.contextData['a.media.progress10'] = true;
				s.Media.track(media.name);
				break;
			//When the 25% milestone is reached add a.media.progress25 to the Adobe Analytics request
			case 25:
				s.contextData['a.media.progress25'] = true;
				s.Media.track(media.name);
				break;
			//When the 50% milestone is reached add a.media.progress50 to the Adobe Analytics request
			case 50:
				s.contextData['a.media.progress50'] = true;
				s.Media.track(media.name);
				break;
			//When the 75% milestone is reached add a.media.progress75 to the Adobe Analytics request
			case 75:
				s.contextData['a.media.progress75'] = true;
				s.Media.track(media.name);
				break;
			//When the 95% milestone is reached add a.media.progress95 to the Adobe Analytics request
			case 95:
				s.contextData['a.media.progress95'] = true;
				s.Media.track(media.name);
				break;
			//When any other % milestone is reached do nothing
			default:
				break;
		}
	}
} */
/***** MEDIA MODULE CONFIGURATION FOR MILESTONE TRACKING END*****/




 