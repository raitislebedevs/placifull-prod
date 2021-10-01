import {
  formatDate,
  formatMonth,
  formatNumber,
} from 'utils/standaloneFunctions';
const mail = '/static/images/resume/mail.png';
const phone = '/static/images/resume/phone.png';
const calendar = '/static/images/resume/calendar.png';
const female = '/static/images/resume/female.png';
const male = '/static/images/resume/male.png';
const marker = '/static/images/resume/marker.png';

const placifullTemplate = async (doc, cv, t, cvCurrency, rgb) => {
  let maxPageHeight = 575;
  let leftPadding = 15;
  let yAxis = 20;
  let splitText = [];
  let leftMaxWide = 112;
  let dim;
  let pageInfo = 1;
  let pageCount = 1;
  let showAge = cv?.showAge;
  let location = true;
  let red = rgb?.r || 165;
  let green = rgb?.g || 42;
  let blue = rgb?.b || 42;

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

  doc.setFillColor(red, green, blue);
  doc.rect(0, 0, 135, 840, 'F');

  //595 × 842 points.
  //First Last Name
  doc.setFontSize(16);
  doc.setFont(cvPdfBoldFont, 'bold');
  doc.setTextColor(243, 246, 251);
  if (cv?.cvFirstName || cv?.cvLasttName) {
    writeText(doc, `${cv?.cvFirstName} ${cv?.cvLasttName} `, 1);
  }
  doc.setFontSize(12);

  //Title
  if (cv?.cvProfession) {
    writeText(doc, cv?.cvProfession, 1);
  }

  doc.setFontSize(8);
  //Line
  doc.setDrawColor(243, 246, 251);
  doc.setLineWidth(2.5);
  doc.line(leftPadding, yAxis, 55, yAxis);
  yAxis = yAxis + 10;

  //Contact Information
  if (cv?.cvPersonalEmail) {
    pngItems(doc, mail, cv?.cvPersonalEmail);
  }
  if (cv?.cvPhoneNumber) {
    pngItems(doc, phone, cv?.cvPhoneNumber);
  }
  if (showAge) pngItems(doc, calendar, formatDate(new Date(cv?.birthDay), t));

  if ('male' == cv?.gender) {
    pngItems(doc, male, t(`cv:gender.${cv?.gender}`));
  }
  if ('female' == cv?.gender) {
    pngItems(doc, female, t(`cv:gender.${cv?.gender}`));
  }

  //Addresss
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

  yAxis = yAxis + 10;
  doc.setFontSize(8);
  if (cv?.aboutMe) {
    writeHeader(doc, t('cv:labels.about-me'));
    writeText(doc, cv?.aboutMe);

    yAxis += 10;
  }
  if (languageSkills.length != 0) {
    languageSkills.forEach((element) => {
      if (element?.languageName) {
        let height = writeLanguage(doc, element?.languageName);
        yAxis -= 1.5;
        let skill = getRatingValue(element?.level);
        for (var i = 0; i < 7; i++) {
          if (skill > i) {
            doc.setFillColor(243, 246, 251);
            doc.circle(75 + i * 7.5, yAxis, 3.5, 'F');
            continue;
          }
          doc.setFillColor(128, 128, 128);
          doc.circle(75 + i * 7.5, yAxis, 3.5, 'F');
        }
        yAxis += height + 8.5;
      }
    });
  }

  if (computerSkills.length != 0) {
    writeHeader(doc, t('cv:labels.computer-skills'));

    yAxis += 10;
    computerSkills.forEach((element) => {
      if (element?.skill) {
        let height = writeLanguage(doc, element?.skill);
        yAxis -= 1.5;

        writeComputerSkill(doc, element);
        yAxis += height + 8.5;
        if (yAxis > maxPageHeight) {
          createNewPage(doc);
        }
      }
    });
  }
  //Reseting for the Rigth Part
  leftMaxWide = 400;
  leftPadding = 145;
  yAxis = 15;

  doc.setPage(1);
  pageInfo = 1;

  if (educationDetail.length != 0) {
    writeMainHeader(doc, t('cv:labels.education'));

    educationDetail.forEach((el, idx, array) => {
      let edu = t(`cv:qualification.${el?.qualification}`);
      if (el?.studyArea && el?.qualification) {
        writeSubMainHeader(doc, `${el?.studyArea}, ${edu}`);
      }
      if (el?.avarageGrade) {
        writeSchoolInfo(doc, `${t(`cv:avarage-grade`)}: ${el?.avarageGrade}`);
      }
      let text = `${formatMonth(el?.fromYear, t)} - ${
        el?.toYear ? formatMonth(el?.toYear, t) : t(`cv:present`)
      }`;

      if (el?.fromYear) {
        writeSchoolInfo(doc, text);
      }
      yAxis -= 22;
      if (el?.schoolName) {
        writeText(doc, el?.schoolName);
      }
      yAxis += 10;
      if (idx === array.length - 1) {
        return;
      }
      if (yAxis > maxPageHeight) {
        createNewPage(doc);
      }
    });
  }
  if (yAxis + 50 > maxPageHeight) {
    createNewPage(doc);
  }
  if (workExpierience.length != 0) {
    writeMainHeader(doc, t('cv:labels.expierience'));

    workExpierience.forEach((el, idx, array) => {
      if (el?.companyName) {
        writeSubMainHeader(doc, el?.companyName);
      }
      doc.setFont(cvPdfNormalFont, 'normal');
      let text = `${el?.fromDate && formatMonth(el?.fromDate, t)} - ${
        el?.toDate ? formatMonth(el?.toDate, t) : t(`cv:present`)
      }`;
      if (el?.fromDate) {
        writeDateCenter(doc, text);
      }
      if (el?.positionName) {
        writeText(doc, el?.positionName);
      }
      if (el?.positionDescription) {
        writeParagraph(doc, el?.positionDescription);
      }
      yAxis += 10;
      if (idx === array.length - 1) {
        return;
      }
      if (yAxis > maxPageHeight) {
        createNewPage(doc);
      }
    });
  }
  if (yAxis + 50 > maxPageHeight) {
    createNewPage(doc);
  }
  if (transportLicenses.length != 0) {
    writeMainHeader(doc, t('cv:labels.licenses'));
    transportLicenses.forEach((el, idx, array) => {
      if (el?.issueCountry) {
        writeSubMainHeader(doc, el?.issueCountry);
      }
      doc.setFont(cvPdfNormalFont, 'normal');

      let text = `${t(`cv:license-category`)}: ${el?.licence}`;
      if (el?.yearExpierience) {
        writeDateCenter(
          doc,
          `${t(`cv:expierience.${el?.yearExpierience}`)} ${t(
            `cv:expierience.label`
          )}`
        );
      }

      if (el?.licence) {
        writeText(doc, text);
      }
      yAxis += 10;

      if (idx === array.length - 1) {
        return;
      }
      if (yAxis > maxPageHeight) {
        createNewPage(doc);
      }
    });
  }
  if (yAxis + 50 > maxPageHeight) {
    createNewPage(doc);
  }
  if (workExpectations.length != 0) {
    writeMainHeader(doc, t('cv:labels.expectations'));

    workExpectations.forEach((el, idx, array) => {
      let salaryCount = 0;
      if (el?.position) {
        writeSubMainHeader(doc, el?.position);
      }

      if (el?.hourlyRate && cvCurrency) {
        writeSchoolInfo(
          doc,
          `${t(
            `job-common:salary.hourly-rate-from`
          )}: ${cvCurrency} ${formatNumber(el?.hourlyRate)}`
        );
        salaryCount++;
      }
      if (el?.monthly && cvCurrency) {
        writeSchoolInfo(
          doc,
          `${t(`job-common:salary.monthly-from`)}: ${cvCurrency} ${formatNumber(
            el?.monthly
          )}`
        );
        salaryCount++;
      }

      if (el?.yearly && cvCurrency) {
        writeSchoolInfo(
          doc,
          `${t(`job-common:salary.annual-from`)}: ${cvCurrency} ${formatNumber(
            el?.yearly
          )}`
        );
        salaryCount++;
      }
      yAxis -= 15 * (salaryCount - 1);
      if (el?.vacancyOption) {
        writeText(doc, t(`job-common:work-area.options.${el?.vacancyOption}`));
      }
      yAxis += 40;
      if (idx === array.length - 1) {
        return;
      }
      if (yAxis > maxPageHeight) {
        createNewPage(doc);
      }
    });
  }

  const documentName = `${cv?.cvFirstName}.${cv?.cvLasttName}.pdf`;
  doc.save(documentName);

  function writeHeader(doc, text) {
    yAxis = yAxis + 10;
    doc.setFont(cvPdfBoldFont, 'bold');
    writeText(doc, text);
    doc.setLineWidth(1);
    doc.line(leftPadding, yAxis, 125, yAxis);
    yAxis = yAxis + 10;
  }

  function pngItems(doc, png, text) {
    doc.addImage(png, 'PNG', leftPadding, yAxis, 8, 8);
    yAxis = yAxis + 6;
    splitText = doc.splitTextToSize(text, leftMaxWide - 12);
    doc.text(leftPadding + 12, yAxis, splitText);
    dim = doc.getTextDimensions(splitText);
    yAxis = yAxis + dim.h + 3;
  }

  function writeText(doc, text, yHeight = 0) {
    splitText = doc.splitTextToSize(text, leftMaxWide);
    doc.text(leftPadding, yAxis, splitText);
    dim = doc.getTextDimensions(splitText);
    yAxis = yAxis + dim.h + yHeight;
  }

  function writeLanguage(doc, text) {
    splitText = doc.splitTextToSize(text, leftMaxWide);
    doc.text(leftPadding, yAxis, splitText);
    dim = doc.getTextDimensions(splitText);

    return dim.h;
  }

  function writeComputerSkill(doc, el) {
    dim = doc.getTextDimensions(t(`cv:expierience.${el?.yearExpierience}`));
    doc.text(128 - dim.w, yAxis, t(`cv:expierience.${el?.yearExpierience}`));
    yAxis += dim.h + 2;
    dim = doc.getTextDimensions(
      t(`cv:knowladge-gained.${el?.expierienceGathered}`)
    );
    doc.text(
      128 - dim.w,
      yAxis,
      t(`cv:knowladge-gained.${el?.expierienceGathered}`)
    );
    yAxis += 2;
  }

  function writeMainHeader(doc, text) {
    doc.setFontSize(12);
    doc.setTextColor(red, green, blue);
    doc.setDrawColor(red, green, blue);
    yAxis = yAxis + 10;
    doc.setFont(cvPdfNormalFont, 'normal');
    writeText(doc, text, -3);
    doc.setLineWidth(1.5);
    doc.line(leftPadding, yAxis, 425, yAxis);
    yAxis = yAxis + 15;
  }

  function writeSubMainHeader(doc, text) {
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    yAxis = yAxis + 5;
    doc.setFont(cvPdfBoldFont, 'bold');
    writeText(doc, text, -3);
    yAxis = yAxis + 10;
  }

  function writeSchoolInfo(doc, text) {
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont(cvPdfNormalFont, 'normal');
    writeRightCenter(doc, text, 10);
  }

  function writeRightCenter(doc, text, yHeight = 0) {
    dim = doc.getTextDimensions(text);
    let centerWrite = (240 - dim.w) / 2;
    yAxis -= 6;
    doc.text(240 + centerWrite, yAxis, text);
    dim = doc.getTextDimensions(text);
    yAxis = yAxis + dim.h + yHeight;
  }

  function writeDateCenter(doc, text) {
    dim = doc.getTextDimensions(text);
    let centerWrite = (240 - dim.w) / 2;
    doc.text(240 + centerWrite, yAxis, text);
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
      doc.setFillColor(red, green, blue);
      doc.rect(0, 0, 135, 840, 'F');
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

export default placifullTemplate;
