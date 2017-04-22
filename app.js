var YT_Search_URL = 'https://www.googleapis.com/youtube/v3/search';
var YT_Video_Watch = 'https://www.youtube.com/watch?v='

function getYouTubeData (searchTerm, callback) {
	var request = {
		part:'snippet',
		key: 'AIzaSyC31FtR6W-c_9aUH3msfIfSmjsRwn3Ga_Q',
		q: searchTerm
		//a resource's snippet.thumbnails property is an object that identifies the thumbnail images available for that resource.
		//snippet.thumbnails.default should reveal the default thumbnail for the video
		//snippet.default.url should reveal the image's url. 
		//where do I put this info?
	}
	$.getJSON(YT_Search_URL, request, callback);
}

function displayYtData (data) {
	var resultElement = '';
	if (data.items) {
		data.items.forEach(function(item) {
			resultElement += 
			'<a href="' + YT_Video_Watch + item.id.videoId + '"' + 'target="_blank" >' + '<img src="' + item.snippet.thumbnails.default.url + '">' + 
			'<p>' + item.snippet.title + '</p>' + '</a>';
		}); //should I put the code in a variable and do an element.find? Also, am i calling the snippet correctly?
	}
	else {
		resultElement += '<p>No results</p>';
	}
	$('.js-search-results').html(resultElement);
}
function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var userSearchTerm = $(this).find('.js-query').val();
    getYouTubeData (userSearchTerm, displayYtData);
  });
}

$(function(){watchSubmit();});