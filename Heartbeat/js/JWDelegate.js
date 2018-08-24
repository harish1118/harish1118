/*Heartbeat Variable Values*/
aaPluginConfig.channel = "Video Analytics";
ahPluginConfig.ovp = "JWPlayer6.12";
ahPluginConfig.sdk = "VHB 1.7.2";

/*JW Player API*/
function trackHeartbeat(){

//get current video title   
function mediaName(){
var current = jwplayer(0).getPlaylistItem();
return(current.title);
}   
    
function mediaID(){
var current = jwplayer(0).getPlaylistItem();
return(current.mediaid);
}      
    
 //Media Heartbeat initialization
var mediaConfig = new MediaHeartbeatConfig();
mediaConfig.trackingServer = "cardgagecorp.hb.omtrdc.net";
mediaConfig.playerName = "JW pLayer iFrame";
mediaConfig.channel = "Video Channel";
mediaConfig.debugLogging = true;
mediaConfig.appVersion = "2.0";
mediaConfig.ssl = false;
mediaConfig.ovp = "JW Player";

//Media Heartbeat Delegate
var mediaDelegate = new MediaHeartbeatDelegate();

  /*Set custom context data*/
    var contextData = {
        pageURL: "jw.test.com",
        tagName: "jw player",
        programmer : "Harish Kumar"
        
        };

        
     
jwplayer(0).onPlay( function(event){
/* Check for start of video */
if(jwplayer(0).getPosition()==0){
console.log('JWPlayer-> start -> playhead: ' + jwplayer(0).getPosition());  
//Video Start
CustomVideoPlayerPluginDelegate.prototype.getVideoInfo = function() {
var videoInfo = new VideoInfo();
videoInfo.streamType = AssetType.ASSET_TYPE_VOD;
videoInfo.playerName = "JWPlayer6.12";
videoInfo.id = mediaID(); 
videoInfo.name = mediaName(); 
videoInfo.length = jwplayer(0).getDuration(); 
videoInfo.playhead = jwplayer(0).getPosition(); 
return videoInfo;
};   
aaPlugin.setVideoMetadata({ 
});    

   var mediaInfo = MediaHeartbeat.createMediaObject(
        mediaName(), 
        mediaID(), 
        jwplayer(0).getDuration(),
        AssetType.ASSET_TYPE_VOD);
        
/*Set standard video metadata*/    
    var standardVideoMetadata = {};
        standardVideoMetadata[MediaHeartbeat.VideoMetadataKeys.EPISODE] = "Episode V";
        standardVideoMetadata[MediaHeartbeat.VideoMetadataKeys.SHOW] = "Online";
        standardVideoMetadata[MediaHeartbeat.VideoMetadataKeys.STREAM_FORMAT] = "Jw Player";
        standardVideoMetadata[MediaHeartbeat.VideoMetadataKeys.SEASON] ="7";
        standardVideoMetadata[MediaHeartbeat.VideoMetadataKeys.ASSET_ID]="test123";
        standardVideoMetadata[MediaHeartbeat.VideoMetadataKeys.GENRE]="no idea"; 
    mediaInfo.setValue(MediaHeartbeat.MediaObjectKey.StandardVideoMetadata, standardVideoMetadata);
//Create media Heartbeat instance    
this.mediaHeartbeat = new MediaHeartbeat(mediaDelegate, mediaConfig, s);        
this.mediaHeartbeat.trackSessionStart(mediaInfo, contextData);    
//vpPlugin.trackVideoLoad();
console.log("***HB Play");
this.mediaHeartbeat.trackPlay(); 
//vpPlugin.trackPlay(contextData);    
}else{
console.log('JWPlayer-> resume -> playhead: ' + jwplayer(0).getPosition());   
//Video Continue Playback    
CustomVideoPlayerPluginDelegate.prototype.getVideoInfo = function() {
var videoInfo = new VideoInfo();
videoInfo.streamType = AssetType.ASSET_TYPE_VOD;
videoInfo.playerName = "JWPlayer6.12";
videoInfo.id = mediaID(); 
videoInfo.name = mediaName(); 
videoInfo.length = jwplayer(0).getDuration(); 
videoInfo.playhead = jwplayer(0).getPosition();  
return videoInfo;
};   
this.mediaHeartbeat.trackPlay(); 
//vpPlugin.trackPlay();
}
})

jwplayer(0).onComplete( function(event) {
console.log('JWPlayer-> complete by onStop -> playhead: ' + jwplayer(0).getPosition());  
//Video Complete
CustomVideoPlayerPluginDelegate.prototype.getVideoInfo = function() {
var videoInfo = new VideoInfo();
videoInfo.playhead = jwplayer(0).getPosition(); 
return videoInfo;
};  
aaPlugin.setVideoMetadata(null); 
vpPlugin.trackComplete();
vpPlugin.trackVideoUnload();
})

jwplayer(0).onPause( function(event){
console.log('JWPlayer-> pause begin -> playhead: ' + jwplayer(0).getPosition());  
//Video Pause
CustomVideoPlayerPluginDelegate.prototype.getVideoInfo = function() {
var videoInfo = new VideoInfo();
videoInfo.playhead = jwplayer(0).getPosition(); 
return videoInfo;
};  
vpPlugin.trackPause();
})
                    
jwplayer(0).onBuffer( function(event){
console.log('JWPlayer-> pause begin -> playhead: ' + jwplayer(0).getPosition());  
//Video Pause
CustomVideoPlayerPluginDelegate.prototype.getVideoInfo = function() {
var videoInfo = new VideoInfo();
videoInfo.playhead = jwplayer(0).getPosition(); 
return videoInfo;
};  
vpPlugin.trackBufferStart();
vpPlugin.trackBufferComplete();
})                    

jwplayer(0).onSeek( function(event){
console.log('JWPLayer -> seek -> playhead: ' + jwplayer(0).getPosition());  
//Video Complete
CustomVideoPlayerPluginDelegate.prototype.getVideoInfo = function() {
var videoInfo = new VideoInfo();
videoInfo.playhead = jwplayer(0).getPosition(); 
return videoInfo;
}; 
vpPlugin.trackSeekStart();
vpPlugin.trackSeekComplete();
})
    
}



    