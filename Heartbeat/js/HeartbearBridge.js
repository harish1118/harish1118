//initialize heartbeat variables
var Heartbeat = ADB.va.Heartbeat;
var HeartbeatConfig = ADB.va.HeartbeatConfig;
 
var VideoPlayerPlugin = ADB.va.plugins.videoplayer.VideoPlayerPlugin;
var VideoPlayerPluginConfig = ADB.va.plugins.videoplayer.VideoPlayerPluginConfig;
 
var AdobeAnalyticsPlugin = ADB.va.plugins.aa.AdobeAnalyticsPlugin;
var AdobeAnalyticsPluginConfig = ADB.va.plugins.aa.AdobeAnalyticsPluginConfig;

//test context data
var MediaHeartbeat = ADB.va.MediaHeartbeat;
var MediaHeartbeatConfig = ADB.va.MediaHeartbeatConfig;
var MediaHeartbeatDelegate = ADB.va.MediaHeartbeatDelegate;

//Custom Adobe Heartbeat Plugin Delegate
var AdobeHeartbeatPluginDelegate = ADB.va.plugins.ah.AdobeHeartbeatPluginDelegate;
$.extend(CustomAdobeHeartbeatPluginDelegate.prototype, AdobeHeartbeatPluginDelegate.prototype);
function CustomAdobeHeartbeatPluginDelegate() {}
CustomAdobeHeartbeatPluginDelegate.prototype.onError = function(errorInfo) {
    console.log("AdobeHeartbeatPlugin error: " + errorInfo.getMessage() + " | " + errorInfo.getDetails());
};


//Custom Adobe Analytics Delegate
var AdobeAnalyticsPluginDelegate = ADB.va.plugins.aa.AdobeAnalyticsPluginDelegate;
$.extend(CustomAdobeAnalyticsPluginDelegate.prototype, AdobeAnalyticsPluginDelegate.prototype); 
var AdobeHeartbeatPlugin = ADB.va.plugins.ah.AdobeHeartbeatPlugin;
var AdobeHeartbeatPluginConfig = ADB.va.plugins.ah.AdobeHeartbeatPluginConfig;
 
var VideoInfo = ADB.va.plugins.videoplayer.VideoInfo;
var AssetType = ADB.va.plugins.videoplayer.AssetType;

//Custom Heartbeat Delegate
var HeartbeatDelegate = ADB.va.HeartbeatDelegate;
$.extend(CustomHeartbeatDelegate.prototype, HeartbeatDelegate.prototype);
function CustomHeartbeatDelegate() {} 
CustomHeartbeatDelegate.prototype.onError = function(errorInfo) {
    console.log("Heartbeat error: " + errorInfo.getMessage() + " | " + errorInfo.getDetails());
};
function CustomAdobeAnalyticsPluginDelegate() {}
CustomAdobeAnalyticsPluginDelegate.prototype.onError = function(errorInfo) {
    console.log("AdobeAnalyticsPlugin error: " + errorInfo.getMessage() + " | " + errorInfo.getDetails());
};

//Custom Video Player Delegate
var VideoPlayerPluginDelegate = ADB.va.plugins.videoplayer.VideoPlayerPluginDelegate;
$.extend(CustomVideoPlayerPluginDelegate.prototype, VideoPlayerPluginDelegate.prototype);
function CustomVideoPlayerPluginDelegate(player) {}
CustomVideoPlayerPluginDelegate.prototype.getVideoInfo = function() {
var videoInfo = new VideoInfo();
videoInfo.streamType;
videoInfo.playerName;
videoInfo.id; 
videoInfo.name; 
videoInfo.length; 
videoInfo.playhead; 
videoInfo.programmer;
return videoInfo;
};  
  
// Video Player plugin
var vpPluginDelegate = new CustomVideoPlayerPluginDelegate();
var vpPlugin = new VideoPlayerPlugin(vpPluginDelegate);
var vpPluginConfig = new VideoPlayerPluginConfig();
vpPluginConfig.debugLogging = true; // set this to false for production apps.
vpPlugin.configure(vpPluginConfig);


// Adobe Analytics plugin
var aaPluginDelegate = new CustomAdobeAnalyticsPluginDelegate();
var aaPlugin = new AdobeAnalyticsPlugin(s, aaPluginDelegate); //appMeasurement needs to have the same object name as in the AppMeasurement.js file
var aaPluginConfig = new AdobeAnalyticsPluginConfig();
aaPluginConfig.channel; 
aaPluginConfig.debugLogging = true; // set this to false for production apps.
aaPlugin.configure(aaPluginConfig);


// Adobe Heartbeat plugin
var ahPluginDelegate = new CustomAdobeHeartbeatPluginDelegate();
var ahPlugin = new AdobeHeartbeatPlugin(ahPluginDelegate);
var ahPluginConfig = new AdobeHeartbeatPluginConfig("cardgagecorp.hb.omtrdc.net", s.visitor.marketingCloudOrgID);
ahPluginConfig.ovp;
ahPluginConfig.sdk;
ahPluginConfig.debugLogging = true; // set this to false for production apps.
ahPlugin.configure(ahPluginConfig);


// Heartbeat
var plugins = [vpPlugin, aaPlugin, ahPlugin];
var heartbeatDelegate = new CustomHeartbeatDelegate();
var heartbeat = new Heartbeat(heartbeatDelegate, plugins);
var heartbeatConfig = new HeartbeatConfig();
heartbeatConfig.debugLogging = true; // set this to false for production apps.
heartbeat.configure(heartbeatConfig);



    