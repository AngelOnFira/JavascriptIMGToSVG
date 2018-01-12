// Tag images with a class of svg
(function (global) {
	function svgConverter(globalCall){
		this.fetchedURL = {};
		this.interval;

		this.imgToSVG = function(){
			// Grab all the images with the svg tag
	        var matches = document.querySelectorAll('img.svg');

	        // Create a key for all image sources
	        fetchedURL = {};
	        for(var i = 0; i < matches.length; i++){
	        	if(matches[i].src && !fetchedURL[matches[i].src]){
	            	fetchedURL[matches[i].src] = true;
	            }
	        }

	        // Fetch the sources
	        var resKeys = Object.keys(fetchedURL);
	        for(var i = 0; i < resKeys.length; i++){
	        	var isLast = i === resKeys.length - 1;
	        	replaceImg(resKeys[i]);
	        }

	        this.interval = setInterval(waitTillEmpty.bind(null, fetchedURL), 1);

	        function waitTillEmpty(object){
	        	if(Object.keys(object).length === 0){
	        		// The last image has been loaded
	        		clearInterval(global.svgConverter.interval);
		            if(globalCall){
		            	globalCall();
		            }
	        	}
	        }


	        // Pass a callback to 
	        function replaceImg(svgURL){
	            fetch(svgURL).then(function(response) {
	                return response.text();
	            }).then(function(svg) {
	                delete this.fetchedURL[svgURL];

	                // Replace all 
	                var matches = document.querySelectorAll('img.svg');
	                for(var i = 0; i < matches.length; i++){
	                	if(matches[i].src.localeCompare(svgURL) === 0){
	                		$img = document.createElement('svg');
	                        $img.innerHTML = svg;
	                        var svgHTML = $img.getElementsByTagName('svg')[0];

	                		if(matches[i].className)
	                            svgHTML.className.baseVal = matches[i].className;

	                        if(matches[i].id)
	                            svgHTML.id = matches[i].id;


	                        // var clone = JSON.parse(JSON.stringify(svgHTML));
		                	matches[i].parentNode.replaceChild(svgHTML, matches[i]);
		                }
	                }

	                
	            });
	        }
		}
	}
	window.onload = function(){
	    if(!global.svgConverter) { global.svgConverter = new svgConverter(); };
		global.svgConverter.imgToSVG();
	}
})(this);