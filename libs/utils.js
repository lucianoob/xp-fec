const package = require(__dirname + '/../package.json');

module.exports = exports = {
  logToConsole: (title, object) => {
    console.log(package.name+'['+package.version+'] | '+title+': ', object);
  },
  slugify: (str, separator) => {
	const _SEPARATOR_ = '-';

    var o = {
      regex: new RegExp(/\W/g),
      lowercase: true,
      separator: _SEPARATOR_
    };

  	if (typeof str != 'string') throw new Error('str must be a string');
  	(o.lowercase) ? str = str.toLowerCase() : str.toUpperCase();

  
  	var pattern = ['a', 'e', 'i', 'o', 'u', 'c', ''];
  	['áâàã', 'éêèẽ', 'íîìĩ', 'óôòõ', 'úûùũ', 'ç', '()'].map(function (el, i) {
    	el = (o.lowercase) ? el.toLowerCase() : el.toUpperCase();
    	str = str.replace(new RegExp('[' + el + ']', 'g'), pattern[i]).trim();
  	});

  	if (!separator) separator = o.separator;
  	str = str.replace(/\s?[\W]\s?/g, '-');

  	return str.replace(o.regex, separator);
  }
};