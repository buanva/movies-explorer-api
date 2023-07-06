const urlRegex = /(https?:\/\/)(www\.)?([0-9a-z-]+(?:\.[a-z]+)+){1}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]+)*#?/i;
module.exports.urlRegex = urlRegex;
module.exports.validateUrl = (link) => urlRegex.test(link);
