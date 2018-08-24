//Create a local reference to the MediaHeartbeat classes
var MediaHeartbeat = ADB.va.MediaHeartbeat;
var MediaHeartbeatConfig = ADB.va.MediaHeartbeatConfig;
var MediaHeartbeatDelegate = ADB.va.MediaHeartbeatDelegate;

//Media Heartbeat initialization
var mediaConfig = new MediaHeartbeatConfig();
mediaConfig.trackingServer = "cardgagecorp.hb.omtrdc.net";
mediaConfig.playerName = "HTML 5 Player";
mediaConfig.channel = "Local Video No Channel";
mediaConfig.network = "Australia";
mediaConfig.debugLogging = false;
mediaConfig.appVersion = "2.2";
mediaConfig.ssl = false;
mediaConfig.ovp = "HTML5";

// Implement the MediaHeartbeatDelegate protocol.
var mediaDelegate = new MediaHeartbeatDelegate();

// Initiate 	
var appMeasurement = new AppMeasurement();
appMeasurement.visitor = visitor;
appMeasurement.trackingServer = "cardgagecorp.d1.sc.omtrdc.net";
appMeasurement.account = "lscstestingharish";
appMeasurement.pageName = dataLayer.pagename;
appMeasurement.charSet = "UTF8";

var contextData = {
        pageURL: document.URL,
        isUserLoggedIn: "false",
        tvStation: "My Station",
        programmer: "Harish Kumar",
        tagName: $("#movie").tagName,
        videoURL: $("#movie").src
        };
		
   
    
var mediaInfo;
var videoPlayer;
var videostarted = false;
var metaDataLoaded = false;

jQuery(document).ready(function($) {

    // Create the VideoPlayer.
    videoPlayer = document.getElementById('movie');
	videoPlayer.addEventListener('error',handlePlayerEvents,true);
	videoPlayer.addEventListener('loadeddata',handlePlayerEvents,true);
	videoPlayer.addEventListener('play',handlePlayerEvents,true);
	videoPlayer.addEventListener('ended',handlePlayerEvents,true);
	videoPlayer.addEventListener('seeking',handlePlayerEvents,true);
	videoPlayer.addEventListener('pause',handlePlayerEvents,true);
	videoPlayer.addEventListener('loadedmetadata',handlePlayerEvents,true);
	videoPlayer.addEventListener('ratechange',handlePlayerEvents,true);
	
        
    
        
	function handlePlayerEvents(e){
		console.log("Event Type: "+e.type);
		
		switch(e.type){
			case 'error': 		console.log("***HB Error");
								console.log("Error: "+e.data);
								MediaHeartbeat.trackError("videoErrorId");;
								break;
			case 'loadeddata': 	console.log("***HB Loaded Data");
								metaDataLoaded = true;
								mediaDelegate.getCurrentPlaybackTime = function() {
										   return videoPlayer.currentTime;
										};
										
								mediaInfo = MediaHeartbeat.createMediaObject("HTML 5 PLAYER", "movie",  e.target.duration, MediaHeartbeat.StreamType.VOD);  
                                                                    /*Set standard video metadata*/    
                                                                var standardVideoMetadata = {};
                                                                    standardVideoMetadata[MediaHeartbeat.VideoMetadataKeys.EPISODE] = "Episode 0";
				 standardVideoMetadata[MediaHeartbeat.VideoMetadataKeys.NETWORK] = "Australia";
                                                                    standardVideoMetadata[MediaHeartbeat.VideoMetadataKeys.SHOW] = "Local Hosted video";
                                                                    standardVideoMetadata[MediaHeartbeat.VideoMetadataKeys.STREAM_FORMAT] = "HTML 5 Video";
                                                                    standardVideoMetadata[MediaHeartbeat.VideoMetadataKeys.SEASON] ="2";
                                                                    standardVideoMetadata[MediaHeartbeat.VideoMetadataKeys.ASSET_ID]="movie";
                                                                    standardVideoMetadata[MediaHeartbeat.VideoMetadataKeys.GENRE]="Comedy"; 
                                                                mediaInfo.setValue(MediaHeartbeat.MediaObjectKey.StandardVideoMetadata, standardVideoMetadata);
								MediaHeartbeat = new MediaHeartbeat(mediaDelegate, mediaConfig, appMeasurement);
								videoPlayer.play();
								break;
			case 'play': 		if(metaDataLoaded){
									if (Math.floor(videoPlayer.currentTime ) == 0) {
											console.log("***HB Start");
											MediaHeartbeat.trackSessionStart(mediaInfo, contextData); 
											   
											MediaHeartbeat.trackPlay();  
											videostarted = true;                
									} else {
											console.log("***HB Play");
											MediaHeartbeat.trackPlay(); 
									};
								}
								break;
			case 'ended': 		MediaHeartbeat.trackComplete();
								console.log("***HB Ended");
								break;
			case 'seeking': 	console.log("***HB Buffering");
								break;
			case 'pause': 		console.log("***HB Pause");
								MediaHeartbeat.trackPause();
								break;
			case 'ratechange':	console.log("***HB Pause");
								
								break;
			
		}
	}

	
});
