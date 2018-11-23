import moment from 'moment';

const sumVotes = votes => {
	if (!votes.length) return 0;
	return votes.reduce((accum, vote) => {
		return accum + vote.value;
	}, 0)
}

const countVotes = votes => {
	const vals = { up: 0, down: 0, score: 0 };
	return votes.reduce((accumulator, vote) => {
		accumulator.up += vote.value === 1 && 1;
		accumulator.down += vote.value === -1 && 1;
		accumulator.score = accumulator.score + vote.value;
		return accumulator;
	}, vals);
};

const countVotesWithUser = (votes, id) => {
	const vals = { up: 0, down: 0, user: 0 };
	return votes.reduce((accumulator, vote) => {
		accumulator.up += vote.value === 1 && 1;
		accumulator.down += vote.value === -1 && 1;
		accumulator.user += vote._user === id ? vote.value : 0;
		return accumulator;
	}, vals);
};

const sortMethods = {
  'none': (a, b) => 0,
  
	'byMostRecent': (a, b) => moment(a.createdAt).isBefore(moment(b.createdAt)) ? 1 : -1,
	'byLeastRecent': (a, b) => moment(a.createdAt).isBefore(moment(b.createdAt)) ? -1 : 1,

	'byScoreDescending': (a, b) => sumVotes(a._votes) > sumVotes(b._votes) ? -1 : 1,
	'byScoreAscending': (a, b) => sumVotes(a._votes) < sumVotes(b._votes) ? 1 : -1,

	'byCommentsDescending': (a, b) => countChildren(a._comments) > countChildren(b._comments) ? -1 : 1,
	'byCommentsAscending': (a, b) => countChildren(a._comments) > countChildren(b._comments) ? 1 : -1,

	'byLikesDescending': (a,b) => countVotes(a._votes).up > countVotes(b._votes).up ? -1 : 1
};

const countChildren = root => {
	if (!root) return 0;
  let total = root.length;
  total += root.reduce((a, n) => a + countChildren(n._comments), 0);
  return total;
};

export {
	sumVotes,
	countVotes,
	sortMethods,
	countChildren,
	countVotesWithUser
};