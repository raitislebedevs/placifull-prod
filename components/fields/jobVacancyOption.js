const jobVacancyOption = (t) => ({
  searchForm: [
    {
      key: 'vacancyOption',
      type: 'select',
      placeholder: t('job-common:work-area.label'),
      options: [
        {
          value: '',
          label: t('job-common:work-area.label'),
          id: 'vacancyOption',
        },
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
          value: 'science',
          label: t('job-common:work-area.options.science'),
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
      key: 'contractType',
      type: 'select',
      placeholder: t('job-common:contract-type.label'),
      options: [
        {
          value: 'temporarly',
          label: t('job-common:contract-type.options.temporarly'),
          id: 'contractType',
        },
        {
          value: 'fullTime',
          label: t('job-common:contract-type.options.fullTime'),
          id: 'contractType',
        },
        {
          value: 'partTime',
          label: t('job-common:contract-type.options.partTime'),
          id: 'contractType',
        },
        {
          value: 'remoteFullTime',
          label: t('job-common:contract-type.options.remoteFullTime'),
          id: 'contractType',
        },
        {
          value: 'remotePartTime',
          label: t('job-common:contract-type.options.remotePartTime'),
          id: 'contractType',
        },
        {
          value: 'other',
          label: t('job-common:contract-type.options.other'),
          id: 'contractType',
        },
      ],
    },
    {
      key: 'workingTime',
      type: 'select',
      placeholder: t('job-common:working-time.label'),
      options: [
        {
          value: 'officeHours',
          label: t('job-common:working-time.options.officeHours'),
          id: 'workingTime',
        },
        {
          value: 'shifts',
          label: t('job-common:working-time.options.shifts'),
          id: 'workingTime',
        },
        {
          value: 'flexible',
          label: t('job-common:working-time.options.flexible'),
          id: 'workingTime',
        },
        {
          value: 'other',
          label: t('job-common:working-time.options.other'),
          id: 'workingTime',
        },
      ],
    },
    {
      key: 'jobCurrency',
      type: 'currency',
    },
    {
      key: 'worldLocation',
      type: 'autocomplete',
    },
  ],
  languages: [
    {
      key: 'languagesNative',
      type: 'native',
      placeholder: t('job-search:form.languages.native'),
    },
    {
      key: 'languagesEnglish',
      type: 'english',
      placeholder: t('job-search:form.languages.english'),
    },
  ],
  accordionRight: [
    {
      label: t('job-search:form.accordion-right.hourly-rate.label'),
      key: 'hourlyRate',
      items: [
        {
          key: 'hourlySalaryFrom',
          type: 'number',
          prefix: 'currency',
          placeholder: t(
            'job-search:form.accordion-right.hourly-rate.items.from'
          ),
          min: 0,
          max: 999,
        },
        {
          key: 'hourlySalaryTo',
          type: 'number',
          prefix: 'currency',
          placeholder: t(
            'job-search:form.accordion-right.hourly-rate.items.to'
          ),
          min: 0,
          max: 999,
        },
      ],
    },
    {
      label: t('job-search:form.accordion-right.monthly-salary.label'),
      key: 'monthlySalary',
      items: [
        {
          key: 'monthlySalaryFrom',
          type: 'number',
          prefix: 'currency',
          placeholder: t(
            'job-search:form.accordion-right.monthly-salary.items.from'
          ),
          min: 0,
          max: 999999999,
        },
        {
          key: 'monthlySalaryTo',
          type: 'number',

          prefix: 'currency',
          placeholder: t(
            'job-search:form.accordion-right.monthly-salary.items.to'
          ),
          min: 0,
          max: 999999999,
        },
      ],
    },
    {
      label: t('job-search:form.accordion-right.yearly-salary.label'),
      key: 'yearlyWage',
      items: [
        {
          key: 'annualSalaryFrom',
          type: 'number',
          prefix: 'currency',
          placeholder: t(
            'job-search:form.accordion-right.yearly-salary.items.from'
          ),
          min: 0,
          max: 999999999,
        },
        {
          key: 'annualSalaryTo',
          type: 'number',
          prefix: 'currency',
          placeholder: t(
            'job-search:form.accordion-right.yearly-salary.items.to'
          ),
          min: 0,
          max: 999999999,
        },
      ],
    },
  ],
});

export default jobVacancyOption;
