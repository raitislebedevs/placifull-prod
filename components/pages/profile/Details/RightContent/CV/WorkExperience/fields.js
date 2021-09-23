import { AiOutlineFieldTime } from 'react-icons/ai';

const fields = (t) => [
  {
    key: 'companyName',
    type: 'text',
    label: t('profile:right-content.cv.sections.expierience.company-name'),
  },
  {
    key: 'employmentSector',
    type: 'select',
    label: t('profile:right-content.cv.sections.expierience.sector'),
    options: [
      {
        value: 'intern',
        label: t('job-common:work-area.options.intern'),
        id: 'employmentSector',
      },
      {
        value: 'volunteerWork',
        label: t('job-common:work-area.options.volunteerWork'),
        id: 'employmentSector',
      },
      {
        value: 'stockExchange',
        label: t('job-common:work-area.options.stockExchange'),
        id: 'employmentSector',
      },
      {
        value: 'administrationAssistance',
        label: t('job-common:work-area.options.administrationAssistance'),
        id: 'employmentSector',
      },
      {
        value: 'constructionRealEstate',
        label: t('job-common:work-area.options.constructionRealEstate'),
        id: 'employmentSector',
      },
      {
        value: 'humanResources',
        label: t('job-common:work-area.options.humanResources'),
        id: 'employmentSector',
      },
      {
        value: 'securityRescue',
        label: t('job-common:work-area.options.securityRescue'),
        id: 'employmentSector',
      },
      {
        value: 'military',
        label: t('job-common:work-area.options.military'),
        id: 'employmentSector',
      },
      {
        value: 'electronicsTelecomunication',
        label: t('job-common:work-area.options.electronicsTelecomunication'),
        id: 'employmentSector',
      },
      {
        value: 'freelanceTemporary',
        label: t('job-common:work-area.options.freelanceTemporary'),
        id: 'employmentSector',
      },
      {
        value: 'energyElectricity',
        label: t('job-common:work-area.options.energyElectricity'),
        id: 'employmentSector',
      },
      {
        value: 'pharmacy',
        label: t('job-common:work-area.options.pharmacy'),
        id: 'employmentSector',
      },
      {
        value: 'financeAccounting',
        label: t('job-common:work-area.options.financeAccounting'),
        id: 'employmentSector',
      },
      {
        value: 'infromationTechnology',
        label: t('job-common:work-area.options.infromationTechnology'),
        id: 'employmentSector',
      },
      {
        value: 'jurisprudenceJustice',
        label: t('job-common:work-area.options.jurisprudenceJustice'),
        id: 'employmentSector',
      },
      {
        value: 'cultureArtEntertainemnt',
        label: t('job-common:work-area.options.cultureArtEntertainemnt'),
        id: 'employmentSector',
      },
      {
        value: 'sports',
        label: t('job-common:work-area.options.sports'),
        id: 'employmentSector',
      },
      {
        value: 'qualityControl',
        label: t('job-common:work-area.options.qualityControl'),
        id: 'employmentSector',
      },
      {
        value: 'agricutureEnvironmental',
        label: t('job-common:work-area.options.agricutureEnvironmental'),
        id: 'employmentSector',
      },
      {
        value: 'medicineSocialCare',
        label: t('job-common:work-area.options.medicineSocialCare'),
        id: 'employmentSector',
      },
      {
        value: 'mediaPublicRelations',
        label: t('job-common:work-area.options.mediaPublicRelations'),
        id: 'employmentSector',
      },
      {
        value: 'forestryWoodworkingMetalWorking',
        label: t(
          'job-common:work-area.options.forestryWoodworkingMetalWorking'
        ),
        id: 'employmentSector',
      },
      {
        value: 'marketingAdvertising',
        label: t('job-common:work-area.options.marketingAdvertising'),
        id: 'employmentSector',
      },
      {
        value: 'productionIndustry',
        label: t('job-common:work-area.options.productionIndustry'),
        id: 'employmentSector',
      },
      {
        value: 'seasonalWork',
        label: t('job-common:work-area.options.seasonalWork'),
        id: 'employmentSector',
      },
      {
        value: 'technicalScience',
        label: t('job-common:work-area.options.technicalScience'),
        id: 'employmentSector',
      },
      {
        value: 'services',
        label: t('job-common:work-area.options.services'),
        id: 'employmentSector',
      },
      {
        value: 'transportLogistics',
        label: t('job-common:work-area.options.transportLogistics'),
        id: 'employmentSector',
      },
      {
        value: 'tourismCateringHotels',
        label: t('job-common:work-area.options.tourismCateringHotels'),
        id: 'employmentSector',
      },
      {
        value: 'managment',
        label: t('job-common:work-area.options.managment'),
        id: 'employmentSector',
      },
      {
        value: 'government',
        label: t('job-common:work-area.options.government'),
        id: 'employmentSector',
      },
      {
        value: 'science',
        label: t('job-common:work-area.options.science'),
        id: 'employmentSector',
      },
      {
        value: 'others',
        label: t('job-common:work-area.options.others'),
        id: 'employmentSector',
      },
    ],
  },
  {
    key: 'positionName',
    type: 'text',
    label: t('profile:right-content.cv.sections.expierience.position'),
  },
  {
    key: 'seniority',
    type: 'select',
    label: t('profile:right-content.cv.sections.expierience.seniority.title'),
    options: [
      {
        value: 'volunteer',
        label: t(
          'profile:right-content.cv.sections.expierience.seniority.options.volunteer'
        ),
        id: 'seniority',
      },
      {
        value: 'intern',
        label: t(
          'profile:right-content.cv.sections.expierience.seniority.options.intern'
        ),
        id: 'seniority',
      },
      {
        value: 'junior',
        label: t(
          'profile:right-content.cv.sections.expierience.seniority.options.junior'
        ),
        id: 'seniority',
      },
      {
        value: 'intermediate',
        label: t(
          'profile:right-content.cv.sections.expierience.seniority.options.intermediate'
        ),
        id: 'seniority',
      },
      {
        value: 'senior',
        label: t(
          'profile:right-content.cv.sections.expierience.seniority.options.senior'
        ),
        id: 'seniority',
      },
      {
        value: 'executive',
        label: t(
          'profile:right-content.cv.sections.expierience.seniority.options.executive'
        ),
        id: 'seniority',
      },
      {
        value: 'ceo',
        label: t(
          'profile:right-content.cv.sections.expierience.seniority.options.ceo'
        ),
        id: 'seniority',
      },
      {
        value: 'other',
        label: t(
          'profile:right-content.cv.sections.expierience.seniority.options.other'
        ),
        id: 'seniority',
      },
    ],
  },
  {
    key: 'positionDescription',
    type: 'textarea',
    label: t(
      'profile:right-content.cv.sections.expierience.position-description'
    ),
  },
  {
    key: 'fromDate',
    decorator: <AiOutlineFieldTime />,
    type: 'fromTime',
    label: t('profile:right-content.cv.sections.expierience.from-date'),
  },
  {
    key: 'toDate',
    decorator: <AiOutlineFieldTime />,
    type: 'toTime',
    label: t('profile:right-content.cv.sections.expierience.to-date'),
  },
  {
    key: 'deleteButton',
    type: 'deleteButton',
  },
];

export default fields;
