//create local references to the heartbeat classes
var MediaHeartbeat = ADB.va.MediaHeartbeat;
var MediaHeartbeatConfig = ADB.va.MediaHeartbeatConfig;
var MediaHeartbeatDelegate = ADB.va.MediaHeartbeatDelegate;

//Media Heartbeat initialization
var mediaConfig = new MediaHeartbeatConfig();
mediaConfig.trackingServer = "cardgagecorp.hb.omtrdc.net";
mediaConfig.playerName = "YouTube iFrame";
mediaConfig.channel = "Video Channel";
mediaConfig.debugLogging = true;
mediaConfig.appVersion = "2.0";
mediaConfig.ssl = false;
mediaConfig.ovp = "HTML5";

//Media Heartbeat Delegate
var mediaDelegate = new MediaHeartbeatDelegate();

/* Loads IFrame Player API Code asynchronously */
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// YouTube Player Mapping for single embedded video (https://developers.google.com/youtube/iframe_api_reference) 
window.onYouTubeIframeAPIReady = function() {
    var player = new YT.Player('player', {
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}



function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
            if (Math.floor(event.target.getCurrentTime()) == 0) {
				console.log("***HB Start");
    /*Set mediaDelegate Current Playbacktime */    
    mediaDelegate.getCurrentPlaybackTime = function() {
   return Math.floor(event.target.getCurrentTime());
    }; 
    /*Set media info */    
    /* MediaHeartbeat.createMediaObject(<VIDEO_NAME>, <VIDEO_ID>, <VIDEO_LENGTH>,MediaHeartbeat.StreamType.VOD);*/
    var mediaInfo = MediaHeartbeat.createMediaObject(
        event.target.getVideoData().title, 
        event.target.getVideoData().video_id, 
        Math.floor(event.target.getDuration()),
        MediaHeartbeat.StreamType.VOD);
     /*Set custom context data*/
    var contextData = {
        //pageURL: player.baseURI,
        //playerHeigh: player.width, 
        //playerWidth: player.height,
        //tagName: player.tagName,
        //videoURL: player.src
        };
/*Set standard video metadata*/    
    //var standardVideoMetadata = {};
        //standardVideoMetadata[MediaHeartbeat.VideoMetadataKeys.EPISODE] = "Sample Episode";
        //standardVideoMetadata[MediaHeartbeat.VideoMetadataKeys.SHOW] = "Sample Show";
    //mediaInfo.setValue(MediaHeartbeat.MediaObjectKey.StandardVideoMetadata, standardVideoMetadata);
//Create media Heartbeat instance    
this.mediaHeartbeat = new MediaHeartbeat(mediaDelegate, mediaConfig, s);        
this.mediaHeartbeat.trackSessionStart(mediaInfo, contextData);    
this.mediaHeartbeat.trackPlay();  
var videostarted = true;                
				} 
				else {
				console.log("***HB Play");
				this.mediaHeartbeat.trackPlay(); 
				};
}

    if (event.data == YT.PlayerState.PAUSED) {
        console.log("***HB Pause");
	this.mediaHeartbeat.trackPause();
    }
	
   if (event.data == YT.PlayerState.BUFFERING) {
		console.log("***HB Buffering");
       if (videostarted){
			this._mediaHeartbeat.trackEvent(MediaHeartbeat.Event.BufferStart);
       }
    }

    if (event.data == YT.PlayerState.ENDED) {
		console.log("***HB Ended");
        this.mediaHeartbeat.trackComplete();
        this.mediaHeartbeat.trackSessionEnd();
        var videostarted = false;
		}		
}