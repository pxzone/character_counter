// ==UserScript==
// @name     Character Counter
// @description     Count all post character in Bitcointalk topic thread
// @author  PX-Z
// @match  https://bitcointalk.org/index.php?topic=*
// @match  https://bitcointalk.org/index.php?action=profile;u=*
// @version  1
// @grant       none
// @run-at      document-end
// ==/UserScript==

(function() {
    'use strict';
	let topic_url = window.location.href;
    if( topic_url.indexOf("bitcointalk.org/index.php?topic=") > 0){
        var postDivs = document.querySelectorAll('div.post');
        var tdElements = document.querySelectorAll('td[align="right"][valign="bottom"].smalltext');
        console.log(tdElements)
        
        // Ensure the number of post divs matches the number of td elements
        if (postDivs.length === tdElements.length) {
            console.log('Character Counter Initialized')

            // Loop through each post div and corresponding td element using the same index
            postDivs.forEach(function(postDiv, index) {
                // Clone the postDiv to avoid modifying the original
                var postClone = postDiv.cloneNode(true);

                // Remove all elements with class "quote"
                var quotes = postClone.querySelectorAll('.quote');
                quotes.forEach(function(quote) {
                    quote.remove();
                });

                // Remove all elements with class "quoteheader"
                var quoteHeaders = postClone.querySelectorAll('.quoteheader');
                quoteHeaders.forEach(function(quoteheader) {
                    quoteheader.remove();
                });

                // Remove all <br> tags from the clone
                var brTags = postClone.querySelectorAll('br');
                brTags.forEach(function(br) {
                    br.remove();
                });

                // Get the remaining text content, excluding the word "Quote"
                var textContent = postClone.textContent || postClone.innerText;
                textContent = textContent.replace(/Quote/g, '');  // Remove all instances of the word "Quote"

                // Remove all special characters (anything that is not a letter or number)
                // textContent = textContent.replace(/[^a-zA-Z0-9\s]/g, '');  // Keep only letters, numbers, and spaces

                var charCount = textContent.length;
                var anchor = document.createElement('a');
                anchor.href = `#character_count_${index}`; 
                anchor.textContent = "Characters: " + charCount;  
                anchor.id = 'character_count_'+index;  
                tdElements[index].appendChild(anchor);
            });

        } else {
            console.log("The number of div.post and td.smalltext elements does not match.");
        }
    }

    let profile_url = window.location.href;
    if( profile_url.indexOf("sa=showPosts") > 0){
        var postDivs = document.querySelectorAll('div.post');
        var tdElements = document.querySelectorAll('td[colspan="3"][align="right"].windowbg2');
        // Ensure the number of post divs matches the number of td elements
        if (postDivs.length === tdElements.length) {
            console.log('Character Counter Initialized')
            // Loop through each post div and corresponding td element using the same index
            postDivs.forEach(function(postDiv, index) {
                // Clone the postDiv to avoid modifying the original
                var postClone = postDiv.cloneNode(true);

                // Remove all elements with class "quote"
                var quotes = postClone.querySelectorAll('.quote');
                quotes.forEach(function(quote) {
                    quote.remove();
                });

                // Remove all elements with class "quoteheader"
                var quoteHeaders = postClone.querySelectorAll('.quoteheader');
                quoteHeaders.forEach(function(quoteheader) {
                    quoteheader.remove();
                });

                // Remove all <br> tags from the clone
                var brTags = postClone.querySelectorAll('br');
                brTags.forEach(function(br) {
                    br.remove();
                });

                // Get the remaining text content, excluding the word "Quote"
                var textContent = postClone.textContent || postClone.innerText;
                textContent = textContent.replace(/Quote/g, '');  // Remove all instances of the word "Quote"

                // Remove all special characters (anything that is not a letter or number)
                // textContent = textContent.replace(/[^a-zA-Z0-9\s]/g, '');  // Keep only letters, numbers, and spaces

                var charCount = textContent.length;
                var middleTextSpan = tdElements[index].querySelector('span.middletext');
                // If a span.middletext exists, create the second anchor tag and append it after the first anchor
                if (middleTextSpan) {
                    var anchor = document.createElement('a');
                    anchor.href = `#character_count_${index}`; 
                    anchor.textContent = "Characters: " + charCount;  
                    anchor.id = 'character_count_'+index;  
                    anchor.style = 'font-weight:bold;';  
                    middleTextSpan.appendChild(anchor);
                }
                else{
                    console.log('No middletext span');
                }
            });
        } else {
            console.log("The number of div.post and td.windowbg elements does not match.");
        }
    }
})();
