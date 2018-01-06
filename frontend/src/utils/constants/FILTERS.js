export const FILTERS = [
  {
    label: 'Most voted',
    value: 'high',
    apiValue: '-voteScore',
  },
  {
    label: 'Less voted',
    value: 'less',
    apiValue: 'voteScore',
  },
  {
    label: 'Most Recent',
    value: 'recent',
    apiValue: '-timestamp',
  },
];

export default FILTERS;
