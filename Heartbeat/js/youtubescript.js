    var video_obj=null;
    var video_length=0;
    var video_name='Movie name ' + new Date().getTime();
  
  
    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;
    function onYouTubeIframeAPIReady() 
    {
        console.log('*** iFrame embed onYouTubeIframeAPIReady');
  
        player = new YT.Player("player1", {
           
          events: {
           
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }});
          };
        
    
  
    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        // event.target.playVideo();
        console.log('*** iFrame embed onPlayerReady ', player);
    }
  
    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = false;
    function onPlayerStateChange(event) {
        console.log('*** iFrame embed onPlayerStateChange ' + event.data + ' --- YT Player state ' + YT.PlayerState.PLAYING, player.getCurrentTime(), player);
        /*
        if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 6000);
            done = true;
        }
        */
        video_name = player.getVideoData();
        video_name = video_name.title;
        video_length = player.getDuration();
  
        // if(event.data === YT.PlayerState.PLAYING && (event.data === 1 || event.data < 0)){
        if((event.data === 1 || event.data < 0) && YT.PlayerState.PLAYING === 1){
                //*-* PLAY
                console.log("*-* Player is on play mode " + event.data + ' ' + player.getCurrentTime(), s);
                if(player.getCurrentTime() === 0) {
                    s.Media.open(video_name, video_length, 'Youtube Object Embed');
                    s.Media.play(video_name, player.getCurrentTime());
                } else {
                    s.Media.play(video_name, player.getCurrentTime());
                }
            }else if(event.data === 2){
                //*-* PAUSE --- CAN USE THIS FOR ENDING TOO =-- check on time -5 sec!!
                console.log("*-* Player is on pause mode " + event.data+' '+player.getCurrentTime());
                s.Media.stop(video_name, player.getCurrentTime());//this will cause the monitor to have media.event='STOP'
            }else if(event.data === 3){
                //*-* SKIPPING
                console.log("*-* Player is on skipping mode " + event.data);
                s.Media.stop(video_name, player.getCurrentTime());//this will cause the monitor to have media.event='STOP'
            }else if(event.data === 0){
                //*-* Completed
                console.log("*-* Player has been completed " + event.data);
                s.Media.stop(video_name, player.getCurrentTime());
                s.Media.close(video_name);
            }
    }
   
        function onYouTubePlayerReady(playerId) {
            video_obj=document.getElementById(playerId);//playerId
  
            video_obj.addEventListener("onStateChange", "onytplayerStateChange");
  
            video_length= video_obj.getDuration();
  
            console.log('*-* Youtube Video Ready - in call back function --- ' + playerId, 'video duration= ' + video_obj.getDuration(), 'video current time= ' + video_obj.getCurrentTime());
        }
  
  
        function onytplayerStateChange(newState) {
            console.log("*-* Player's new state: " + newState);
            //-1 --> <0 is not started
            if(newState===1){
                //*-* PLAY
                console.log("*-* Player is on play mode " + newState + ' ' + video_obj.getCurrentTime(), s);
                if(video_obj.getCurrentTime() === 0) {
                    s.Media.open(video_name, video_length, 'Youtube Object Embed');
                    s.Media.play(video_name, video_obj.getCurrentTime());
  
                    // s.Media.play(video_name, video_obj.getCurrentTime(),5,'a segment name', 30);
                } else {
                    s.Media.play(video_name, video_obj.getCurrentTime());
                }
            }else if(newState===2){
                //*-* PAUSE --- CAN USE THIS FOR ENDING TOO =-- check on time -5 sec!!
                console.log("*-* Player is on pause mode " + newState+' '+video_obj.getCurrentTime());
                s.Media.stop(video_name, video_obj.getCurrentTime());//this will cause the monitor to have media.event='STOP'
  
                // s.Media.stop(video_name, video_obj.getCurrentTime());//this will cause the monitor to have media.event='STOP'
                //*-*if not used (ie. not pausing) then CLOSE will kick in when the video completes otherwise video completes will also send 'STOP'
            }else if(newState===3){
                //*-* SKIPPING
                console.log("*-* Player is on skipping mode " + newState);
                s.Media.stop(video_name, video_obj.getCurrentTime());//this will cause the monitor to have media.event='STOP'
            }else if(newState===0){
                //*-* Completed
                console.log("*-* Player has been completed " + newState);
                s.Media.stop(video_name, video_obj.getCurrentTime());
                s.Media.close(video_name);
            }
        }
  
  
    s.loadModule("Media");
  
s.Media.onLoad = function() {
    console.log('**** MEDIA module loaded');
    /*Configure Media Module Functions */
  
    s.Media.autoTrack= false;
    s.Media.trackWhilePlaying=false;
    // s.Media.trackSecond=0; // set to 30 if milestone in seconds
        console.log('**** MEDIA module loaded1');
    s.Media.completeByCloseOffset = true; //*** Enabled if you want to allow the video to be completed a few seconds before the actual end of the video
    s.Media.completeCloseOffsetThreshold = 10; 
     
    s.Media.trackVars="prop7,eVar7,eVar8,eVar9";
    s.Media.trackEvents="event7,event8,event9,event10,event11,event12,event23";
    s.Media.trackMilestones="15,45,95";
    s.Media.playerName="My TEst You tube video tracking";
    s.Media.segmentByMilestones = true;
    s.Media.trackUsingContextData = true;
      console.log('**** MEDIA module loaded2');
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
      console.log('**** MEDIA module loaded3');
    /*
    * can use the below IF wanna pass additional data --- Need to update s.Media.trackVars --- BUT we could potential set it on above var and avoid using the below
    */
    s.Media.monitor =function(s, media){
  console.log('**** MEDIA module loaded4');
    console.log(media);
        //https://marketing.adobe.com/resources/help/en_US/sc/appmeasurement/video/video_mediamonitor.html
        console.log('in the video monitor, can help add additional evar, prop or events', media);
        if(media.event == "OPEN") {
            s.contextData = s.Media.contextDataMapping
            s.Media.track(media.name);
        } else if(media.event == "MILESTONE") {
            s.contextData = s.Media.contextDataMapping
            s.Media.track(media.name);
        } else if(media.event == "CLOSE") {
            s.contextData = s.Media.contextDataMapping
            s.Media.track(media.name);
        }
    }
  
  
}