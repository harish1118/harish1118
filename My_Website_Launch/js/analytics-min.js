for(var pageTitle,pagePath,templateName,tags,metas=document.getElementsByTagName("meta"),i=0;i<metas.length;i++)"title"==metas[i].getAttribute("name")&&(pageTitle=metas[i].getAttribute("content")),"path"==metas[i].getAttribute("name")&&(pagePath=metas[i].getAttribute("content")),"template"==metas[i].getAttribute("name")&&(templateName=metas[i].getAttribute("content").toLowerCase()),"tags"==metas[i].getAttribute("name")&&null!=metas[i].getAttribute("content")&&(tags=metas[i].getAttribute("content").toLowerCase());
pageTitle=pageTitle.toLowerCase();pagePath=pagePath.substr(16);var pathArray=pagePath.split("/"),siteSection=pathArray[0];1<pathArray.length&&("services"==pathArray[1]||"technologies"==pathArray[1]||"products"==pathArray[1]||"platforms"==pathArray[1])&&pathArray.splice(1,1);var siteSectionLevel1;siteSectionLevel1=1<pathArray.length?pathArray[1]:siteSection;var siteSectionLevel2;2<pathArray.length&&(siteSectionLevel2=pathArray[2]);
var pageName=pathArray.toString().replace(/,/g,":"),digitalData={},page={},pageInfo={pageName:pageName,siteSection:siteSection,contentType:templateName};void 0!=siteSectionLevel1&&(pageInfo.siteSectionLevel1=siteSectionLevel1);void 0!=siteSectionLevel2&&(pageInfo.siteSectionLevel2=siteSectionLevel1+":"+siteSectionLevel2);
pageInfo.contentUnit="Products"!=siteSection&&"About"!=siteSection&&"FAQs"!=siteSection&&"Contact"!=siteSection&&"test"!=siteSection&&"test1"!=siteSection&&"home"!=siteSection||void 0==siteSectionLevel1?"other":void 0!=siteSectionLevel2&&void 0!=tags?tags:siteSectionLevel1;page.pageInfo=pageInfo;digitalData.page=page;for(var videos=document.getElementsByTagName("video"),x=0;x<videos.length;x++)"video-view"==videos[x].className&&eventFunction(videos[x]);
function eventFunction(a){var f=a.currentSrc.split("/");f[f.length-1].replace(/%20/g," ");var b=!1,c=!1,d=!1,e=!0;a.addEventListener("play",function(){var a=this.currentSrc.split("/").pop().replace(/%20/g," ");e&&(_satellite.setVar("videoName",a),_satellite.track("videoStart"),e=!1,pause=!0,d=c=b=!1)});a.addEventListener("pause",function(){pause&&_satellite.track("videoPause")});a.addEventListener("ended",function(){_satellite.track("videoCompleted")});a.addEventListener("timeupdate",function(){a.currentTime>=
a.duration/4&&0==b&&(_satellite.track("video25"),b=!0);a.currentTime>=a.duration/2&&0==c&&(_satellite.track("video50"),c=!0);a.currentTime>=.75*a.duration&&0==d&&(_satellite.track("video75"),d=!0);a.currentTime>=.995*a.duration&&(e=!0,pause=!1)})};

