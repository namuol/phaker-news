import 'babel/polyfill';

function item (props) {
  let {
    num,
    title,
    url,
    points,
    user,
    formatted_time,
    comment_count
  } = props;

  return `
<tr class="athing">
  <td align="right" valign="top" class="title">
    <span class="rank">
      ${num}.
    </span>
  </td>
  <td>
    <center>
      <a href="#">
        <div class="votearrow" title="upvote"></div>
      </a>
    </center>
  </td>
  <td class="title">
    <span class="deadmark"></span><a href="#">${title}</a><span class="sitebit comhead"> (${url})</span>
  </td>
</tr>
<tr>
  <td colspan="2"></td>
  <td class="subtext">
    <span class="score" >${points} points</span> by <a href="#">${user}</a> <a href="#">${formatted_time} ago</a> | <a href="#">flag</a> | <a href="#">${comment_count} comments</a> </td>
</tr>
<tr class="spacer" style="height:5px"></tr>
`;

}

import moment from 'moment';
import titlegen from 'titlegen';
import titleJSON from './titles.json';

let titles = titleJSON.results.collection1.map(function (item) {
  return item.title.text;
});

titlegen.config.max_word_count = 10;
titlegen.config.max_attempts = 100;

titlegen.feed(titles);

let html = [];

for (let i=1; i <= 30; i += 1) {
  let timeAgo = 1000*60*(10 + (60 * 10) * Math.random());
  html.push(item({
    title: titlegen(),
    url: 'blah.com',
    num: i,
    formatted_time: moment(Date.now() - timeAgo).fromNow(),
    points: Math.floor(Math.random() * 100 * (timeAgo/(1000*60*60*5))),
    comment_count: Math.floor(Math.random() * 100 * (timeAgo/(1000*60*60*5))),
  }));
};

html.push(`
<tr class="morespace" style="height:10px"></tr>
<tr>
  <td colspan="2"></td>
  <td class="title"><a href="#" rel="nofollow">More</a></td>
</tr>
`);

document.getElementById('content').innerHTML = html.join('');
document.getElementsByTagName('body')[0].className = "";

new Array(...document.querySelectorAll('a[href]')).forEach((el) => {
  el.href = 'https://github.com/namuol/phaker-news';
});
