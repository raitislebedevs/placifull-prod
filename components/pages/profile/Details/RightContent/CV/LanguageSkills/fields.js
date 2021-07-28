const fields = (t) => [
  {
    key: 'languageName',
    type: 'smallText',
    label: t('profile:right-content.cv.sections.languages.accordion.language'),
  },
  {
    key: 'level',
    type: 'select',
    label: t(
      'profile:right-content.cv.sections.languages.accordion.level.label'
    ),
    options: [
      {
        value: 'a1',
        label: t(
          'profile:right-content.cv.sections.languages.accordion.level.options.a1'
        ),
        id: 'level',
      },
      {
        value: 'a2',
        label: t(
          'profile:right-content.cv.sections.languages.accordion.level.options.a2'
        ),
        id: 'level',
      },
      {
        value: 'b1',
        label: t(
          'profile:right-content.cv.sections.languages.accordion.level.options.b1'
        ),
        id: 'level',
      },
      {
        value: 'b2',
        label: t(
          'profile:right-content.cv.sections.languages.accordion.level.options.b2'
        ),
        id: 'level',
      },
      {
        value: 'c1',
        label: t(
          'profile:right-content.cv.sections.languages.accordion.level.options.c1'
        ),
        id: 'level',
      },
      {
        value: 'c2',
        label: t(
          'profile:right-content.cv.sections.languages.accordion.level.options.c2'
        ),
        id: 'level',
      },
      {
        value: 'native',
        label: t(
          'profile:right-content.cv.sections.languages.accordion.level.options.native'
        ),
        id: 'level',
      },
    ],
  },
  {
    key: 'certificate',
    type: 'text',
    label: t(
      'profile:right-content.cv.sections.languages.accordion.certificate'
    ),
  },
  {
    key: 'deleteButton',
    type: 'deleteButton',
  },
];

export default fields;
