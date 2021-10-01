import { formatNumber, formatYear } from 'utils/standaloneFunctions';

const mail = '/static/images/resume/emailBlack.png';
const phone = '/static/images/resume/phone-call.png';
const marker = '/static/images/resume/locationBlack.png';
const background = '/static/images/resume/ResumeBackground.png';

const gradient = async (doc, cv, t, cvCurrency, rgb, avatar) => {
  let maxPageHeight = 575;
  let leftPadding = 10;
  let yAxis = 100;
  let splitText = [];
  let maxWide = 110;
  let dim;
  let pageInfo = 1;
  let pageCount = 1;
  let location = true;
  let red = rgb?.r || 52;
  let green = rgb?.g || 148;
  let blue = rgb?.b || 230;
  let cvPdfNormalFont = 'MainPdf';
  let cvPdfBoldFont = 'MainPdf';

  const educationDetail = cv?.EducationHistory;
  const workExpierience = cv?.WorkExpierience;
  const languageSkills = cv?.LanguageSkiills;
  const computerSkills = cv?.ComputerSkiills;
  const transportLicenses = cv?.TransportLicenses;
  const workExpectations = cv?.WorkExpectations;

  workExpierience?.sort((a, b) => {
    let dateA = new Date(a.fromDate),
      dateB = new Date(b.fromDate);
    return dateB - dateA;
  });
  educationDetail?.sort((a, b) => {
    let dateA = new Date(a.fromYear),
      dateB = new Date(b.fromYear);
    return dateB - dateA;
  });
  try {
    let extension = avatar?.ext.replace('.', '').toUpperCase();
    let image = avatar.url;
    doc.addImage(image, extension, 27, 14, 82, 75);
    doc.setLineWidth(0);
    doc.setDrawColor(0);
    doc.setFillColor(255, 255, 255);
  } catch (error) {}
  doc.addImage(background, 'PNG', 0, 0, 457, 631);

  doc.setLineWidth(2);
  doc.setDrawColor(255, 255, 255);
  doc.circle(68, 52, 39, 'S');

  doc.setLineWidth(1);
  doc.setDrawColor(255, 255, 255);
  doc.circle(68, 52, 43, 'S');

  doc.setFillColor(230, 230, 232);
  doc.rect(0, 97, 127, 630, 'F');

  //595 × 842 points.
  //First Last Name
  doc.setFontSize(20);
  doc.setFont(cvPdfBoldFont, 'bold');
  doc.setTextColor(243, 246, 251);
  doc.text(
    220,
    30,
    `${cv?.cvFirstName.toUpperCase()} ${cv?.cvLasttName.toUpperCase()}`
  );
  doc.setFont(cvPdfNormalFont, 'normal');
  doc.setFontSize(13);
  doc.text(220, 46, cv?.cvProfession);

  doc.setFontSize(10);
  doc.setTextColor(38, 55, 65);
  yAxis = yAxis + 15;
  if (cv?.cvPersonalEmail) {
    pngItems(doc, mail, cv?.cvPersonalEmail);
  }
  if (cv?.cvPhoneNumber) {
    pngItems(doc, phone, cv?.cvPhoneNumber);
  }

  if (cv?.country && cv?.city && cv?.state) {
    pngItems(doc, marker, `${cv?.country}, ${cv?.city}, ${cv?.state}`);
    location = false;
  }

  if (cv?.country && cv?.city && location) {
    pngItems(doc, marker, `${cv?.country}, ${cv?.city}`);
    location = false;
  }

  if (cv?.country && cv?.state && location) {
    pngItems(doc, marker, `${cv?.country}, ${cv?.state}`);
    location = false;
  }

  if (cv?.country && location) {
    pngItems(doc, marker, `${cv?.country}`);
  }

  yAxis = yAxis + 25;
  if (yAxis > maxPageHeight) {
    createNewPage(doc);
  }

  writeHeader(doc, t('cv:labels.computer-skills'));
  doc.setFont(cvPdfNormalFont, 'normal');
  doc.setFontSize(9);

  if (computerSkills.length != 0) {
    yAxis += 10;
    computerSkills.forEach((element) => {
      if (element?.skill) {
        let height = writeLanguage(doc, element?.skill);
        yAxis -= 1.5;

        writeLineSkill(doc, element);
        yAxis += height + 8.5;
        if (yAxis > maxPageHeight) {
          createNewPage(doc);
        }
      }
    });
  }
  yAxis = yAxis + 25;
  if (yAxis > maxPageHeight) {
    createNewPage(doc);
  }
  writeHeader(doc, t('cv:labels.languages'));
  doc.setFont(cvPdfNormalFont, 'normal');
  yAxis = yAxis + 5;
  doc.setFontSize(9);
  if (languageSkills.length != 0) {
    languageSkills.forEach((element) => {
      if (element?.languageName) {
        let height = writeLanguage(doc, element?.languageName);
        yAxis -= 1.5;
        writeLanguageLineSkill(doc, element?.level);
        yAxis += height + 8.5;
        if (yAxis > maxPageHeight) {
          createNewPage(doc);
        }
      }
    });
  }

  yAxis = yAxis + 25;
  if (yAxis + 50 > maxPageHeight) {
    createNewPage(doc);
  }

  if (workExpectations.length != 0) {
    writeHeader(doc, t('cv:labels.expectations'));
    workExpectations.forEach((el, idx, array) => {
      yAxis = yAxis + 10;
      doc.setFontSize(9);
      doc.setFont(cvPdfNormalFont, 'bold');
      let salaryCount = 0;
      if (el?.position) {
        writeText(doc, el?.position);
      }
      if (el?.vacancyOption) {
        writeText(doc, t(`job-common:work-area.options.${el?.vacancyOption}`));
      }
      yAxis = yAxis + 3;
      doc.setFontSize(8);
      doc.setFont(cvPdfNormalFont, 'normal');
      if (el?.hourlyRate && cvCurrency) {
        textInfo(
          doc,
          `${t(
            `job-common:salary.hourly-rate-from`
          )}: ${cvCurrency} ${formatNumber(el?.hourlyRate)}`
        );
        salaryCount++;
      }
      if (el?.monthly && cvCurrency) {
        textInfo(
          doc,
          `${t(`job-common:salary.monthly-from`)}: ${cvCurrency} ${formatNumber(
            el?.monthly
          )}`
        );
        salaryCount++;
      }

      if (el?.yearly && cvCurrency) {
        textInfo(
          doc,
          `${t(`job-common:salary.annual-from`)}: ${cvCurrency} ${formatNumber(
            el?.yearly
          )}`
        );
        salaryCount++;
      }

      if (idx === array.length - 1) {
        return;
      }
      if (yAxis > maxPageHeight) {
        createNewPage(doc);
      }
    });
  }
  doc.setPage(1);
  pageInfo = 1;
  leftPadding = 150;
  yAxis = 95;

  maxWide = 275;
  writeHeader(doc, t('cv:labels.about-me'));
  doc.setFontSize(8);
  doc.setFont(cvPdfNormalFont, 'normal');
  yAxis = yAxis + 4;
  writeText(doc, cv?.aboutMe);

  if (workExpierience.length != 0) {
    yAxis = yAxis + 20;
    if (yAxis > maxPageHeight) {
      createNewPage(doc);
    }
    writeHeader(doc, t('cv:labels.expierience'));
    yAxis = yAxis + 5;
    workExpierience.forEach((el, idx, array) => {
      doc.setFontSize(9);
      doc.setFont(cvPdfNormalFont, 'bold');
      if (el?.companyName) {
        writeText(doc, el?.companyName);
      }
      doc.setFont(cvPdfNormalFont, 'normal');
      let text = `${el?.fromDate && formatYear(el?.fromDate)} - ${
        el?.toDate ? formatYear(el?.toDate) : t(`cv:present`)
      }`;
      if (el?.fromDate) {
        writeDateCenter(doc, text);
      }

      doc.setFont(cvPdfNormalFont, 'bold');
      if (el?.positionName) {
        writeText(doc, el?.positionName);
      }

      doc.setFontSize(8);
      doc.setFont(cvPdfNormalFont, 'normal');
      if (el?.positionDescription) {
        yAxis = yAxis + 2;
        writeParagraph(doc, el?.positionDescription);
      }
      yAxis += 12;
      if (idx === array.length - 1) {
        return;
      }
      if (yAxis > maxPageHeight) {
        createNewPage(doc);
      }
    });
  }

  yAxis = yAxis + 25;
  if (yAxis + 50 > maxPageHeight) {
    createNewPage(doc);
  }

  if (educationDetail.length != 0) {
    writeHeader(doc, t('cv:labels.education'));
    yAxis = yAxis + 10;
    educationDetail.forEach((el, idx, array) => {
      let initialY = yAxis;
      doc.setFontSize(9);
      doc.setFont(cvPdfNormalFont, 'bold');
      let edu = t(`cv:qualification.${el?.qualification}`);
      if (el?.studyArea && el?.qualification) {
        writeText(doc, `${el?.studyArea}, ${edu}`);
      }
      doc.setFont(cvPdfNormalFont, 'normal');
      if (el?.schoolName) {
        writeText(doc, el?.schoolName);
      }
      if (el?.avarageGrade) {
        writeText(doc, `${t(`cv:avarage-grade`)}: ${el?.avarageGrade}`);
      }
      doc.setFont(cvPdfNormalFont, 'normal');
      let text = `${el?.fromYear && formatYear(el?.fromYear)} - ${
        el?.toYear ? formatYear(el?.toYear) : t(`cv:present`)
      }`;

      if (el?.fromYear) {
        writeDateCenter(doc, text, initialY);
      }
      yAxis = yAxis + 20;
      if (idx === array.length - 1) {
        return;
      }
      if (yAxis > maxPageHeight) {
        createNewPage(doc);
      }
    });
  }
  yAxis = yAxis + 25;
  if (yAxis > maxPageHeight) {
    createNewPage(doc);
  }

  writeHeader(doc, t('cv:labels.licenses'));
  doc.setFont(cvPdfNormalFont, 'normal');
  yAxis = yAxis + 10;
  if (transportLicenses.length != 0) {
    transportLicenses.forEach((el, idx, array) => {
      let initialY = yAxis;
      if (el?.issueCountry) {
        doc.setFontSize(10);
        doc.setFont(cvPdfNormalFont, 'normal');
        writeText(doc, el?.issueCountry);
        doc.setFontSize(8);
        writeDateCenter(
          doc,
          `${t(`cv:license-category`)}: ${el?.licence}`,
          initialY
        );
        yAxis = yAxis + 5;
      }

      if (idx === array.length - 1) {
        return;
      }
      if (yAxis > maxPageHeight) {
        createNewPage(doc);
      }
    });
  }
  // Right Page

  const documentName = `${cv?.cvFirstName}.${cv?.cvLasttName}.pdf`;
  doc.save(documentName);

  // HELP FUNCTIONS

  function writeText(doc, text, yHeight = 0) {
    splitText = doc.splitTextToSize(text, maxWide);
    doc.text(leftPadding, yAxis, splitText);
    dim = doc.getTextDimensions(splitText);
    yAxis = yAxis + dim.h + yHeight;
  }

  function textInfo(doc, text) {
    doc.setFontSize(8);
    doc.setTextColor(38, 55, 65);
    doc.setFont(cvPdfNormalFont, 'normal');
    writeText(doc, text);
  }

  function pngItems(doc, png, text) {
    doc.addImage(png, 'PNG', leftPadding, yAxis, 8, 8);
    yAxis = yAxis + 6;
    splitText = doc.splitTextToSize(text, maxWide - 12);
    doc.text(leftPadding + 12, yAxis, splitText);
    dim = doc.getTextDimensions(splitText);
    yAxis = yAxis + dim.h + 3;
  }
  function writeHeader(doc, text) {
    doc.setTextColor(red, green, blue);
    doc.setFontSize(14);
    doc.setFont(cvPdfBoldFont, 'bold');
    writeText(doc, text);
    dim = doc.getTextDimensions(splitText);
    doc.setTextColor(38, 55, 65);
  }

  function writeLanguage(doc, text) {
    splitText = doc.splitTextToSize(text, leftPadding + 50);
    doc.text(leftPadding, yAxis, splitText);
    dim = doc.getTextDimensions(splitText);

    return dim.h;
  }

  function writeDateCenter(doc, text, initialY) {
    let yPosition = initialY || yAxis;

    dim = doc.getTextDimensions(text);
    let centerWrite = (240 - dim.w) / 2;

    doc.setFillColor(230, 230, 232);
    doc.rect(
      236 + centerWrite,
      yPosition - dim.h - 1,
      dim.w + 8,
      dim.h + 4,
      'F'
    );
    doc.setDrawColor(180, 180, 180);
    doc.setLineWidth(1);
    doc.line(
      236 + centerWrite,
      yPosition + dim.h - 3,
      244 + centerWrite + dim.w,
      yPosition + dim.h - 3
    );

    doc.text(240 + centerWrite, yPosition, text);
  }

  function writeLineSkill(doc, el) {
    let knowladge = getKnowladge(el?.expierienceGathered);
    let expierience = getExpierience(el?.yearExpierience);

    doc.setDrawColor(180, 180, 180);
    doc.setLineWidth(3);
    doc.line(leftPadding + 70, yAxis, 120, yAxis);

    doc.setDrawColor(red, green, blue);
    doc.line(
      leftPadding + 70,
      yAxis,
      leftPadding + 70 + knowladge * expierience,
      yAxis
    );

    yAxis += 2;
  }

  function writeLanguageLineSkill(doc, el) {
    let expierience = getRatingValue(el);
    doc.setDrawColor(180, 180, 180);
    doc.setLineWidth(3);
    doc.line(leftPadding + 70, yAxis, 120, yAxis);

    doc.setDrawColor(red, green, blue);
    doc.line(
      leftPadding + 70,
      yAxis,
      leftPadding + 70 + 6 * expierience,
      yAxis
    );

    yAxis += 2;
  }

  function writeParagraph(doc, text) {
    doc.setFontSize(8);
    yAxis += 4;
    splitText = doc.splitTextToSize(text, 263);
    doc.text(leftPadding + 10, yAxis, splitText);
    dim = doc.getTextDimensions(splitText);
    yAxis = yAxis + dim.h;
  }

  function createNewPage(doc) {
    pageCount = doc.internal.getNumberOfPages();
    pageInfo++;
    if (pageInfo > pageCount) {
      yAxis = 20;
      doc.addPage();
      doc.setFillColor(230, 230, 232);
      doc.rect(0, 0, 127, 840, 'F');
      return;
    }

    yAxis = 20;
    doc.setPage(pageInfo++);
  }
};

const getRatingValue = (level) => {
  switch (level) {
    case 'a1':
      return 1;
    case 'a2':
      return 2;
    case 'b1':
      return 3;
    case 'b2':
      return 4;
    case 'c1':
      return 5;
    case 'c2':
      return 6;
    case 'native':
      return 7;
    default:
      return 0;
  }
};

const getKnowladge = (level) => {
  switch (level) {
    case 'selfTaught':
      return 1.5;
    case 'course':
      return 1;
    case 'freelance':
      return 2;
    case 'contractProject':
      return 2;
    case 'fullTimeJob':
      return 3;
    case 'other':
      return 1.5;
    default:
      return 1;
  }
};

const getExpierience = (level) => {
  switch (level) {
    case 'uptoOne':
      return 1;
    case 'oneToThree':
      return 3;
    case 'threeToFive':
      return 5;
    case 'fiveToTen':
      return 7;
    case 'tenToFifteen':
      return 9;
    case 'moreThanFifteen':
      return 12;
    default:
      return 1;
  }
};

export default gradient;
