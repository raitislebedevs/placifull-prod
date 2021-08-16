const fields = (t) => [
  {
    key: 'cvFirstName',
    type: 'text',
    label: t(
      'profile:right-content.profile.personal-details.labels.first-name'
    ),
  },
  {
    key: 'cvLasttName',
    type: 'text',
    label: t('profile:right-content.profile.personal-details.labels.last-name'),
  },
  {
    key: 'cvPersonalEmail',
    type: 'text',
    label: t('profile:right-content.profile.personal-details.labels.email'),
  },
  {
    key: 'cvPhoneNumber',
    type: 'text',
    label: t(
      'profile:right-content.profile.personal-details.labels.phone-number'
    ),
  },
  {
    key: 'cvProfession',
    type: 'textFull',
    label: t(
      'profile:right-content.profile.personal-details.labels.profession'
    ),
  },
  {
    key: 'cvCurrency',
    type: 'currency',
  },
  {
    key: 'country',
    type: 'location',
    label: t('profile:right-content.profile.personal-details.labels.country'),
  },
  {
    key: 'state',
    type: 'location',
    label: t('profile:right-content.profile.personal-details.labels.state'),
  },
  {
    key: 'city',
    type: 'location',
    label: t('profile:right-content.profile.personal-details.labels.city'),
  },
  {
    key: 'birthDay',
    type: 'dateTime',
    label: t(
      'profile:right-content.profile.personal-details.labels.birth-date'
    ),
  },
  {
    key: 'showAge',
    type: 'select',
    label: t('profile:right-content.profile.personal-details.labels.age.label'),
    options: [
      {
        value: '',
        label: t(
          'profile:right-content.profile.personal-details.labels.age.label'
        ),
        id: 'showAge',
      },
      {
        value: 'yes',
        label: t(
          'profile:right-content.profile.personal-details.labels.age.yes'
        ),
        id: 'showAge',
      },
      {
        value: 'no',
        label: t(
          'profile:right-content.profile.personal-details.labels.age.no'
        ),
        id: 'showAge',
      },
      // {
      //   value: 'birthDateOnly',
      //   label: t(
      //     'profile:right-content.profile.personal-details.labels.age.only-birth-date'
      //   ),
      //   id: 'showAge',
      // },
    ],
  },
  {
    key: 'gender',
    type: 'select',
    label: t(
      'profile:right-content.profile.personal-details.labels.gender.label'
    ),
    options: [
      {
        value: '',
        label: t(
          'profile:right-content.profile.personal-details.labels.gender.label'
        ),
        id: 'gender',
      },
      {
        value: 'male',
        label: t(
          'profile:right-content.profile.personal-details.labels.gender.men'
        ),
        id: 'gender',
      },
      {
        value: 'women',
        label: t(
          'profile:right-content.profile.personal-details.labels.gender.women'
        ),
        id: 'gender',
      },
      {
        value: 'notSpecified',
        label: t(
          'profile:right-content.profile.personal-details.labels.gender.not-specified'
        ),
        id: 'gender',
      },
    ],
  },
  {
    key: 'aboutMe',
    type: 'textarea',
    label: t('profile:right-content.profile.personal-details.labels.about-me'),
  },
];

export default fields;
