// Extract hashtags from text
export const extractHashtags = (text) => {
  const hashtagRegex = /#[\w\u0590-\u05ff]+/g;
  const matches = text.match(hashtagRegex);
  return matches ? matches.map(tag => tag.toLowerCase()) : [];
};

// Extract mentions from text
export const extractMentions = (text) => {
  const mentionRegex = /@[\w]+/g;
  const matches = text.match(mentionRegex);
  return matches ? matches.map(mention => mention.substring(1)) : [];
};

// Convert hashtags to clickable links
export const formatTextWithHashtags = (text) => {
  const hashtagRegex = /#[\w\u0590-\u05ff]+/g;
  return text.replace(hashtagRegex, (match) => {
    const hashtag = match.substring(1);
    return `<a href="/hashtag/${hashtag}" class="text-blue-500 hover:underline">${match}</a>`;
  });
};

// Convert mentions to clickable links
export const formatTextWithMentions = (text) => {
  const mentionRegex = /@[\w]+/g;
  return text.replace(mentionRegex, (match) => {
    const username = match.substring(1);
    return `<a href="/${username}" class="text-blue-500 hover:underline">${match}</a>`;
  });
};
