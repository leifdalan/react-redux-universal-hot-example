//import { tumblrClient } from '../../src/server';
//console.log('tumblClient', tumblClient);
import config from '../../src/config';
import tumblr from 'tumblr.js';
// console.log(config);
// const {
//   consumer_key,
//   consumer_secret,
//   token,
//   token_secret,
// } = config;
//
export const tumblrClient = tumblr.createClient({
  consumer_key: 'ZRXhhA32uzj1Y4aseoyXxZthXUQSsc8ZtjVbNpDChNZXqkvBuQ',
  consumer_secret: 'JRxEYuen4sEncJj7vipwbgUgXwfABPKO0aUUCznqe1W2MGBoWp',
  token: 'qQqbHc8trK5iJyTangmU1Ajlen0rBrcRkQFprFCISHtzAcI3e5',
  token_secret: 'mt8YHKLi9wGy4wM2DMJLhht2SZEidrZ1UI6BZ5ju4qObx1hctI',
});

export default function loadInfo() {
  return new Promise((resolve, reject) => {
    tumblrClient.blogPosts('vega-june.tumblr.com', {
      limit: 200,
    }, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
}
