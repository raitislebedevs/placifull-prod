const fields = (t) => [
  {
    key: 'skill',
    type: 'smallText',
    label: t('profile:right-content.cv.sections.computer.accordion.skill-name'),
  },
  {
    key: 'expierienceGathered',
    type: 'selectExp',
    label: t(
      'profile:right-content.cv.sections.computer.accordion.knowladge-gained.label'
    ),
    options: [
      {
        value: 'selfTaught',
        label: t(
          'profile:right-content.cv.sections.computer.accordion.knowladge-gained.options.selfTaught'
        ),
        id: 'expierienceGathered',
      },
      {
        value: 'course',
        label: t(
          'profile:right-content.cv.sections.computer.accordion.knowladge-gained.options.course'
        ),
        id: 'expierienceGathered',
      },
      {
        value: 'freelance',
        label: t(
          'profile:right-content.cv.sections.computer.accordion.knowladge-gained.options.freelance'
        ),
        id: 'expierienceGathered',
      },
      {
        value: 'contractProject',
        label: t(
          'profile:right-content.cv.sections.computer.accordion.knowladge-gained.options.contractProject'
        ),
        id: 'expierienceGathered',
      },
      {
        value: 'fullTimeJob',
        label: t(
          'profile:right-content.cv.sections.computer.accordion.knowladge-gained.options.fullTimeJob'
        ),
        id: 'expierienceGathered',
      },
      {
        value: 'other',
        label: t(
          'profile:right-content.cv.sections.computer.accordion.knowladge-gained.options.other'
        ),
        id: 'expierienceGathered',
      },
    ],
  },
  {
    key: 'yearExpierience',
    type: 'selectYear',
    label: t(
      'profile:right-content.cv.sections.computer.accordion.expierience.label'
    ),
    options: [
      {
        value: 'uptoOne',
        label: t(
          'profile:right-content.cv.sections.computer.accordion.expierience.uptoOne'
        ),
        id: 'yearExpierience',
      },
      {
        value: 'oneToThree',
        label: t(
          'profile:right-content.cv.sections.computer.accordion.expierience.oneToThree'
        ),
        id: 'expierienceGathered',
      },
      {
        value: 'threeToFive',
        label: t(
          'profile:right-content.cv.sections.computer.accordion.expierience.threeToFive'
        ),
        id: 'yearExpierience',
      },
      {
        value: 'fiveToTen',
        label: t(
          'profile:right-content.cv.sections.computer.accordion.expierience.fiveToTen'
        ),
        id: 'yearExpierience',
      },
      {
        value: 'tenToFifteen',
        label: t(
          'profile:right-content.cv.sections.computer.accordion.expierience.tenToFifteen'
        ),
        id: 'yearExpierience',
      },
      {
        value: 'moreThanFifteen',
        label: t(
          'profile:right-content.cv.sections.computer.accordion.expierience.moreThanFifteen'
        ),
        id: 'yearExpierience',
      },
    ],
  },
  {
    key: 'skillCertificate',
    type: 'text',
    label: t(
      'profile:right-content.cv.sections.computer.accordion.certificate'
    ),
  },
  {
    key: 'deleteButton',
    type: 'deleteButton',
  },
];

export default fields;
