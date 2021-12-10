/**
 * Create a typewriter effect. Applies to element of id "typewriter".
 * HTML tags are skipped and injected back into dom iwth their original
 * properties.
 * 
 * @param {*} t 
 * @returns
 */
function setupTypewriter(t) {
    var HTML = t.innerHTML;
    t.innerHTML = "";

    var cursorPosition = 0,
        tag = "",
        output = "",
        writingTag = false,
        speedFactor = 40,
        speedCurrent = 0;

    var type = function() {
      
        // Set speed with a random factor to make it look organic.
        speedCurrent = (Math.random() * speedFactor) + 5;

        // Beginning of HTML tag.
        if (HTML[cursorPosition] == "<") {
            writingTag = true;
        }

        // TODO: dirty hack. ">" is used heavily, which caused &gt; to be typed
        // out. This increases the speed to make it less noticeable.
        if ([' ', '&', 'g', 't', ';'].includes(HTML[cursorPosition]) && (!writingTag)) {
            speedCurrent = 0;
        }


        if (writingTag) {
            // Set speed to max.
            speedCurrent = 0;
            tag += HTML[cursorPosition];
            
            // End of current HTML tag.
            if (HTML[cursorPosition] == ">") {
                writingTag = false
                output += tag;
                tag = "";
            }
        }
        else {
            // Only write tag to innerHTML when it is completed.
            // Otherwise the poor browser gets very confused. 
            output += HTML[cursorPosition];
            t.innerHTML = output
        }

        cursorPosition += 1;

        if (cursorPosition < HTML.length - 1) {
            setTimeout(type, speedCurrent);
        }
        else {
            t.innerHTML = output
        }
    };
    return {
        type: type
    };
}

var typer = document.getElementById('typewriter');
typewriter = setupTypewriter(typewriter);
typewriter.type();