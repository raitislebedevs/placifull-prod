const fields = (t) => [
  {
    key: 'vacancyOption',
    type: 'selectVacancy',
    label: t(
      'profile:right-content.cv.sections.expectations.accordion.interest'
    ),
    options: [
      {
        value: 'intern',
        label: t('job-common:work-area.options.intern'),
        id: 'vacancyOption',
      },
      {
        value: 'volunteerWork',
        label: t('job-common:work-area.options.volunteerWork'),
        id: 'vacancyOption',
      },
      {
        value: 'stockExchange',
        label: t('job-common:work-area.options.stockExchange'),
        id: 'vacancyOption',
      },
      {
        value: 'administrationAssistance',
        label: t('job-common:work-area.options.administrationAssistance'),
        id: 'vacancyOption',
      },
      {
        value: 'constructionRealEstate',
        label: t('job-common:work-area.options.constructionRealEstate'),
        id: 'vacancyOption',
      },
      {
        value: 'humanResources',
        label: t('job-common:work-area.options.humanResources'),
        id: 'vacancyOption',
      },
      {
        value: 'securityRescue',
        label: t('job-common:work-area.options.securityRescue'),
        id: 'vacancyOption',
      },
      {
        value: 'military',
        label: t('job-common:work-area.options.military'),
        id: 'vacancyOption',
      },
      {
        value: 'electronicsTelecomunication',
        label: t('job-common:work-area.options.electronicsTelecomunication'),
        id: 'vacancyOption',
      },
      {
        value: 'freelanceTemporary',
        label: t('job-common:work-area.options.freelanceTemporary'),
        id: 'vacancyOption',
      },
      {
        value: 'energyElectricity',
        label: t('job-common:work-area.options.energyElectricity'),
        id: 'vacancyOption',
      },
      {
        value: 'pharmacy',
        label: t('job-common:work-area.options.pharmacy'),
        id: 'vacancyOption',
      },
      {
        value: 'financeAccounting',
        label: t('job-common:work-area.options.financeAccounting'),
        id: 'vacancyOption',
      },
      {
        value: 'infromationTechnology',
        label: t('job-common:work-area.options.infromationTechnology'),
        id: 'vacancyOption',
      },
      {
        value: 'jurisprudenceJustice',
        label: t('job-common:work-area.options.jurisprudenceJustice'),
        id: 'vacancyOption',
      },
      {
        value: 'cultureArtEntertainemnt',
        label: t('job-common:work-area.options.cultureArtEntertainemnt'),
        id: 'vacancyOption',
      },
      {
        value: 'sports',
        label: t('job-common:work-area.options.sports'),
        id: 'vacancyOption',
      },
      {
        value: 'qualityControl',
        label: t('job-common:work-area.options.qualityControl'),
        id: 'vacancyOption',
      },
      {
        value: 'agricutureEnvironmental',
        label: t('job-common:work-area.options.agricutureEnvironmental'),
        id: 'vacancyOption',
      },
      {
        value: 'medicineSocialCare',
        label: t('job-common:work-area.options.medicineSocialCare'),
        id: 'vacancyOption',
      },
      {
        value: 'mediaPublicRelations',
        label: t('job-common:work-area.options.mediaPublicRelations'),
        id: 'vacancyOption',
      },
      {
        value: 'forestryWoodworkingMetalWorking',
        label: t(
          'job-common:work-area.options.forestryWoodworkingMetalWorking'
        ),
        id: 'vacancyOption',
      },
      {
        value: 'marketingAdvertising',
        label: t('job-common:work-area.options.marketingAdvertising'),
        id: 'vacancyOption',
      },
      {
        value: 'productionIndustry',
        label: t('job-common:work-area.options.productionIndustry'),
        id: 'vacancyOption',
      },
      {
        value: 'seasonalWork',
        label: t('job-common:work-area.options.seasonalWork'),
        id: 'vacancyOption',
      },
      {
        value: 'technicalScience',
        label: t('job-common:work-area.options.technicalScience'),
        id: 'vacancyOption',
      },
      {
        value: 'services',
        label: t('job-common:work-area.options.services'),
        id: 'vacancyOption',
      },
      {
        value: 'transportLogistics',
        label: t('job-common:work-area.options.transportLogistics'),
        id: 'vacancyOption',
      },
      {
        value: 'tourismCateringHotels',
        label: t('job-common:work-area.options.tourismCateringHotels'),
        id: 'vacancyOption',
      },
      {
        value: 'managment',
        label: t('job-common:work-area.options.managment'),
        id: 'vacancyOption',
      },
      {
        value: 'government',
        label: t('job-common:work-area.options.government'),
        id: 'vacancyOption',
      },
      {
        value: 'others',
        label: t('job-common:work-area.options.others'),
        id: 'vacancyOption',
      },
    ],
  },
  {
    key: 'seniority',
    type: 'selectSeniority',
    label: t('profile:right-content.cv.sections.expectations.accordion.title'),
    options: [
      {
        value: 'volunteer',
        label: t(
          'profile:right-content.cv.sections.expectations.accordion.seniority.options.volunteer'
        ),
        id: 'seniority',
      },
      {
        value: 'intern',
        label: t(
          'profile:right-content.cv.sections.expectations.accordion.seniority.options.intern'
        ),
        id: 'seniority',
      },
      {
        value: 'junior',
        label: t(
          'profile:right-content.cv.sections.expectations.accordion.seniority.options.junior'
        ),
        id: 'seniority',
      },
      {
        value: 'intermediate',
        label: t(
          'profile:right-content.cv.sections.expectations.accordion.seniority.options.intermediate'
        ),
        id: 'seniority',
      },
      {
        value: 'senior',
        label: t(
          'profile:right-content.cv.sections.expectations.accordion.seniority.options.senior'
        ),
        id: 'seniority',
      },
      {
        value: 'executive',
        label: t(
          'profile:right-content.cv.sections.expectations.accordion.seniority.options.executive'
        ),
        id: 'seniority',
      },
      {
        value: 'ceo',
        label: t(
          'profile:right-content.cv.sections.expectations.accordion.seniority.options.ceo'
        ),
        id: 'seniority',
      },
      {
        value: 'other',
        label: t(
          'profile:right-content.cv.sections.expectations.accordion.seniority.options.other'
        ),
        id: 'seniority',
      },
    ],
  },
  {
    key: 'position',
    type: 'text',
    label: t(
      'profile:right-content.cv.sections.expectations.accordion.position'
    ),
  },
  {
    key: 'deleteButton',
    type: 'deleteButton',
  },
  {
    key: 'hourlyRate',
    type: 'number',
    label: t('profile:right-content.cv.sections.expectations.accordion.hourly'),
    min: 0,
    max: 99999999,
  },
  {
    key: 'monthly',
    type: 'number',
    label: t(
      'profile:right-content.cv.sections.expectations.accordion.monthly'
    ),
    min: 0,
    max: 99999999,
  },
  {
    key: 'yearly',
    type: 'number',
    label: t('profile:right-content.cv.sections.expectations.accordion.yearly'),
    min: 0,
    max: 99999999,
  },
];

export default fields;
