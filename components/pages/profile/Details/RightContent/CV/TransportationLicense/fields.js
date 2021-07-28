const fields = (t) => [
  {
    key: 'issueCountry',
    type: 'text',
    label: t('profile:right-content.cv.sections.licenses.accordion.country'),
  },
  {
    key: 'licence',
    type: 'textSmall',
    label: t('profile:right-content.cv.sections.licenses.accordion.category'),
  },
  {
    key: 'yearExpierience',
    type: 'select',
    label: t(
      'profile:right-content.cv.sections.licenses.accordion.expierience.label'
    ),
    options: [
      {
        value: 'uptoOne',
        label: t(
          'profile:right-content.cv.sections.licenses.accordion.expierience.uptoOne'
        ),
        id: 'yearExpierience',
      },
      {
        value: 'oneToThree',
        label: t(
          'profile:right-content.cv.sections.licenses.accordion.expierience.oneToThree'
        ),
        id: 'expierienceGathered',
      },
      {
        value: 'threeToFive',
        label: t(
          'profile:right-content.cv.sections.licenses.accordion.expierience.threeToFive'
        ),
        id: 'yearExpierience',
      },
      {
        value: 'fiveToTen',
        label: t(
          'profile:right-content.cv.sections.licenses.accordion.expierience.fiveToTen'
        ),
        id: 'yearExpierience',
      },
      {
        value: 'tenToFifteen',
        label: t(
          'profile:right-content.cv.sections.licenses.accordion.expierience.tenToFifteen'
        ),
        id: 'yearExpierience',
      },
      {
        value: 'moreThanFifteen',
        label: t(
          'profile:right-content.cv.sections.licenses.accordion.expierience.moreThanFifteen'
        ),
        id: 'yearExpierience',
      },
    ],
  },

  {
    key: 'deleteButton',
    type: 'deleteButton',
  },
];

export default fields;
