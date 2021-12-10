/**
 * A very basic templating engine.
 */


/**
 * Takes a template name and replaces its script-call in html file
 * with the html source from the template file.
 * 
 * Template file must be at path ${root}/templates/*.html
 * Template names can not be arbitrary, only existing html tags are possible
 * (header, nav, ...)
 * 
 * @param {String} template 
 */

function replace(template) {
    fetch(`templates/${template}.html`)
    .then(res => res.text())
    .then(text => {
        let elemPrev = document.querySelector(`script#template_${template}`);
        let elemNew = document.createElement(template);
        elemNew.innerHTML = text;
        elemPrev.parentNode.replaceChild(elemNew,elemPrev);
    });
}