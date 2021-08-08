import { AiOutlineFieldTime } from 'react-icons/ai';

const fields = (t) => [
  {
    key: 'schoolName',
    type: 'text',
    label: t('profile:right-content.cv.sections.education.accordion.school'),
    maxLength: '45',
  },
  {
    key: 'country',
    type: 'text',
    label: t('profile:right-content.cv.sections.education.accordion.country'),
    maxLength: '33',
  },
  {
    key: 'avarageGrade',
    type: 'text',
    label: t('profile:right-content.cv.sections.education.accordion.grade'),
    maxLength: '15',
  },
  {
    key: 'qualification',
    maxLength: '15',
    label: t(
      'profile:right-content.cv.sections.education.accordion.qualification.title'
    ),
    options: [
      {
        value: '',
        label: t(
          'profile:right-content.cv.sections.education.accordion.qualification.title'
        ),
        id: 'qualification',
      },
      {
        value: 'primary',
        label: t(
          'profile:right-content.cv.sections.education.accordion.qualification.options.primary'
        ),
        id: 'qualification',
      },
      {
        value: 'secondary',
        label: t(
          'profile:right-content.cv.sections.education.accordion.qualification.options.secondary'
        ),
        id: 'qualification',
      },
      {
        value: 'vocational',
        label: t(
          'profile:right-content.cv.sections.education.accordion.qualification.options.vocational'
        ),
        id: 'qualification',
      },
      {
        value: 'bachelors',
        label: t(
          'profile:right-content.cv.sections.education.accordion.qualification.options.bachelors'
        ),
        id: 'qualification',
      },
      {
        value: 'master',
        label: t(
          'profile:right-content.cv.sections.education.accordion.qualification.options.master'
        ),
        id: 'qualification',
      },
      {
        value: 'doctorate',
        label: t(
          'profile:right-content.cv.sections.education.accordion.qualification.options.doctorate'
        ),
        id: 'qualification',
      },
      {
        value: 'other',
        label: t(
          'profile:right-content.cv.sections.education.accordion.qualification.options.other'
        ),
        id: 'qualification',
      },
    ],
  },
  {
    key: 'studyArea',
    type: 'textHalf',
    maxLength: '42',
    label: t(
      'profile:right-content.cv.sections.education.accordion.study-area'
    ),
  },
  {
    key: 'qualificationArea',
    type: 'selectMulti',
    label: t('profile:right-content.cv.sections.education.accordion.best-fit'),
    isMulti: true,
    options: [
      {
        value: 'stockExchange',
        label: t('job-common:work-area.options.stockExchange'),
        id: 'qualificationArea',
      },
      {
        value: 'administrationAssistance',
        label: t('job-common:work-area.options.administrationAssistance'),
        id: 'qualificationArea',
      },
      {
        value: 'constructionRealEstate',
        label: t('job-common:work-area.options.constructionRealEstate'),
        id: 'qualificationArea',
      },
      {
        value: 'humanResources',
        label: t('job-common:work-area.options.humanResources'),
        id: 'qualificationArea',
      },
      {
        value: 'securityRescue',
        label: t('job-common:work-area.options.securityRescue'),
        id: 'qualificationArea',
      },
      {
        value: 'military',
        label: t('job-common:work-area.options.military'),
        id: 'qualificationArea',
      },
      {
        value: 'electronicsTelecomunication',
        label: t('job-common:work-area.options.electronicsTelecomunication'),
        id: 'qualificationArea',
      },
      {
        value: 'freelanceTemporary',
        label: t('job-common:work-area.options.freelanceTemporary'),
        id: 'qualificationArea',
      },
      {
        value: 'energyElectricity',
        label: t('job-common:work-area.options.energyElectricity'),
        id: 'qualificationArea',
      },
      {
        value: 'pharmacy',
        label: t('job-common:work-area.options.pharmacy'),
        id: 'qualificationArea',
      },
      {
        value: 'financeAccounting',
        label: t('job-common:work-area.options.financeAccounting'),
        id: 'qualificationArea',
      },
      {
        value: 'infromationTechnology',
        label: t('job-common:work-area.options.infromationTechnology'),
        id: 'qualificationArea',
      },
      {
        value: 'jurisprudenceJustice',
        label: t('job-common:work-area.options.jurisprudenceJustice'),
        id: 'qualificationArea',
      },
      {
        value: 'cultureArtEntertainemnt',
        label: t('job-common:work-area.options.cultureArtEntertainemnt'),
        id: 'qualificationArea',
      },
      {
        value: 'sports',
        label: t('job-common:work-area.options.sports'),
        id: 'qualificationArea',
      },
      {
        value: 'qualityControl',
        label: t('job-common:work-area.options.qualityControl'),
        id: 'qualificationArea',
      },
      {
        value: 'agricutureEnvironmental',
        label: t('job-common:work-area.options.agricutureEnvironmental'),
        id: 'qualificationArea',
      },
      {
        value: 'medicineSocialCare',
        label: t('job-common:work-area.options.medicineSocialCare'),
        id: 'qualificationArea',
      },
      {
        value: 'mediaPublicRelations',
        label: t('job-common:work-area.options.mediaPublicRelations'),
        id: 'qualificationArea',
      },
      {
        value: 'forestryWoodworkingMetalWorking',
        label: t(
          'job-common:work-area.options.forestryWoodworkingMetalWorking'
        ),
        id: 'qualificationArea',
      },
      {
        value: 'marketingAdvertising',
        label: t('job-common:work-area.options.marketingAdvertising'),
        id: 'qualificationArea',
      },
      {
        value: 'productionIndustry',
        label: t('job-common:work-area.options.productionIndustry'),
        id: 'qualificationArea',
      },
      {
        value: 'technicalScience',
        label: t('job-common:work-area.options.technicalScience'),
        id: 'qualificationArea',
      },
      {
        value: 'services',
        label: t('job-common:work-area.options.services'),
        id: 'qualificationArea',
      },
      {
        value: 'transportLogistics',
        label: t('job-common:work-area.options.transportLogistics'),
        id: 'qualificationArea',
      },
      {
        value: 'tourismCateringHotels',
        label: t('job-common:work-area.options.tourismCateringHotels'),
        id: 'qualificationArea',
      },
      {
        value: 'managment',
        label: t('job-common:work-area.options.managment'),
        id: 'qualificationArea',
      },
      {
        value: 'government',
        label: t('job-common:work-area.options.government'),
        id: 'qualificationArea',
      },
      {
        value: 'others',
        label: t('job-common:work-area.options.others'),
        id: 'qualificationArea',
      },
    ],
  },
  {
    key: 'fromYear',
    decorator: <AiOutlineFieldTime />,
    type: 'studyFromTime',
    label: t('profile:right-content.cv.sections.education.accordion.from-date'),
  },
  {
    key: 'toYear',
    decorator: <AiOutlineFieldTime />,
    type: 'studyToTime',
    label: t('profile:right-content.cv.sections.education.accordion.to-date'),
  },
  {
    key: 'deleteButton',
    type: 'deleteButton',
  },
];

export default fields;
