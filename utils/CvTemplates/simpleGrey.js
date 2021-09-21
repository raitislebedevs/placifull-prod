import {
  formatMonth,
  formatNumber,
  formatYear,
} from 'utils/standaloneFunctions';

const mail = '/static/images/resume/emailBlack.png';
const phone = '/static/images/resume/phone-call.png';
const marker = '/static/images/resume/locationBlack.png';

const simpleGrey = async (doc, cv, t, cvCurrency, rgb, avatar) => {
  let macPageHeight = 575;
  let leftPadding = 20;
  let yAxis = 100;
  let splitText = [];
  let maxWide = 110;
  let dim;
  let pageInfo = 1;
  let pageCount = 1;
  let location = true;
  let red = rgb?.r || 38;
  let green = rgb?.g || 55;
  let blue = rgb?.b || 65;
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
  doc.rect(0, 0, 540, 67, 'F');

  doc.setFillColor(230, 230, 232);
  doc.rect(10, 0, 125, 840, 'F');

  try {
    let extension = avatar?.ext.replace('.', '').toUpperCase();
    let image = avatar.url;
    doc.addImage(image, extension, 27, 15, 82, 75);
    doc.setLineWidth(0);
    doc.setDrawColor(0);
    doc.setFillColor(255, 255, 255);
  } catch (error) {
    console.log(error);
  }
  doc.setLineWidth(20);
  doc.setDrawColor(230, 230, 232);
  doc.circle(67, 52, 47, 'S');

  doc.setLineWidth(1);
  doc.setDrawColor(red, green, blue);
  doc.circle(67, 52, 37.5, 'S');

  doc.setLineWidth(1);
  doc.setDrawColor(230, 230, 232);
  doc.circle(180, 33, 17, 'S');
  doc.line(210, 16, 210, 50, 'FD');
  doc.line(168, 45, 192, 21, 'FD');

  //Full name Letters
  doc.setFontSize(14);
  doc.setTextColor(230, 230, 232);
  doc.text(169, 31, cv?.cvFirstName.charAt(0).toUpperCase());
  doc.text(182, 42, cv?.cvLasttName.charAt(0).toUpperCase());

  //Name and position

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

  if (educationDetail.length != 0) {
    yAxis = yAxis + 15;
    if (yAxis > macPageHeight) {
      createNewPage(doc);
    }
    writeHeader(doc, t('cv:labels.education'));

    educationDetail.forEach((el, idx, array) => {
      yAxis = yAxis + 15;
      doc.setFontSize(10);
      doc.setFont(cvPdfBoldFont, 'bold');
      let edu = t(`cv:qualification.${el?.qualification}`);
      if (el?.studyArea && el?.qualification) {
        writeText(doc, `${el?.studyArea}, ${edu}`);
      }
      doc.setFontSize(8);
      doc.setFont(cvPdfNormalFont, 'normal');

      if (el?.schoolName) {
        writeText(doc, el?.schoolName);
        yAxis = yAxis + 1;
      }
      let text = `${formatMonth(el?.fromYear, t)} - ${
        el?.toYear ? formatMonth(el?.toYear, t) : t(`cv:present`)
      }`;
      if (el?.fromYear) {
        writeText(doc, text);
        yAxis = yAxis + 1;
      }

      if (el?.avarageGrade) {
        writeText(doc, `${t(`cv:avarage-grade`)}: ${el?.avarageGrade}`);
      }
      if (idx === array.length - 1) {
        return;
      }
      if (yAxis > macPageHeight) {
        createNewPage(doc);
      }
    });
  }
  yAxis = yAxis + 25;
  if (yAxis > macPageHeight) {
    createNewPage(doc);
  }
  writeHeader(doc, t('cv:labels.languages'));
  doc.setFont(cvPdfNormalFont, 'normal');
  yAxis = yAxis + 5;
  doc.setFontSize(8);
  if (languageSkills.length != 0) {
    languageSkills.forEach((element) => {
      if (element?.languageName) {
        let height = writeLanguage(doc, element?.languageName);
        yAxis -= 1.5;
        let skill = getRatingValue(element?.level);
        for (var i = 0; i < 7; i++) {
          if (skill > i) {
            doc.setFillColor(38, 55, 65);
            doc.circle(75 + i * 7.5, yAxis, 3, 'F');
            continue;
          }
          doc.setFillColor(220, 220, 220);
          doc.circle(75 + i * 7.5, yAxis, 3, 'F');
        }
        yAxis += height + 8.5;
        if (yAxis > macPageHeight) {
          createNewPage(doc);
        }
      }
    });
  }

  yAxis = yAxis + 15;
  if (yAxis > macPageHeight) {
    createNewPage(doc);
  }
  writeHeader(doc, t('cv:labels.computer-skills'));
  doc.setFont(cvPdfNormalFont, 'normal');
  yAxis = yAxis + 5;
  doc.setFontSize(8);

  if (computerSkills.length != 0) {
    yAxis += 10;
    computerSkills.forEach((element) => {
      if (element?.skill) {
        let height = writeLanguage(doc, element?.skill);
        yAxis -= 1.5;

        writeComputerSkill(doc, element);
        yAxis += height + 8.5;
        if (yAxis > macPageHeight) {
          createNewPage(doc);
        }
      }
    });
  }

  yAxis = yAxis + 25;
  if (yAxis > macPageHeight) {
    createNewPage(doc);
  }

  writeHeader(doc, t('cv:labels.licenses'));
  doc.setFont(cvPdfNormalFont, 'normal');
  yAxis = yAxis + 5;
  doc.setFontSize(8);

  if (transportLicenses.length != 0) {
    transportLicenses.forEach((el, idx, array) => {
      if (el?.issueCountry) {
        writeText(doc, el?.issueCountry);
        writeText(doc, `${t(`cv:license-category`)}: ${el?.licence}`);
        yAxis = yAxis + 2;
      }
      doc.setFont(cvPdfNormalFont, 'normal');

      if (idx === array.length - 1) {
        return;
      }
      if (yAxis > macPageHeight) {
        createNewPage(doc);
      }
    });
  }
  // Right Page

  doc.setPage(1);
  pageInfo = 1;
  leftPadding = 150;
  yAxis = 85;

  maxWide = 275;
  writeHeader(doc, t('cv:labels.about-me'));
  doc.setFontSize(8);
  doc.setFont(cvPdfNormalFont, 'normal');
  yAxis = yAxis + 4;
  writeText(doc, cv?.aboutMe);

  if (workExpierience.length != 0) {
    yAxis = yAxis + 20;
    if (yAxis > macPageHeight) {
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
      if (yAxis > macPageHeight) {
        createNewPage(doc);
      }
    });
  }

  yAxis = yAxis + 20;
  if (yAxis > macPageHeight) {
    createNewPage(doc);
  }

  if (workExpectations.length != 0) {
    writeHeader(doc, t('cv:labels.expectations'));
    yAxis = yAxis + 10;
    workExpectations.forEach((el, idx, array) => {
      doc.setFontSize(9);
      doc.setFont(cvPdfNormalFont, 'bold');
      let salaryCount = 0;
      if (el?.position) {
        writeText(doc, el?.position);
      }
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
      yAxis -= 12 * (salaryCount - 1);
      doc.setFontSize(9);
      doc.setFont(cvPdfNormalFont, 'bold');
      if (el?.vacancyOption) {
        writeText(doc, t(`job-common:work-area.options.${el?.vacancyOption}`));
      }
      yAxis += 40;
      if (idx === array.length - 1) {
        return;
      }
      if (yAxis > macPageHeight) {
        createNewPage(doc);
      }
    });
  }

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
    doc.setFont(cvPdfNormalFont, 'normal');
    writeRightCenter(doc, text, 10);
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
    doc.setFontSize(12);
    doc.setFont(cvPdfBoldFont, 'bold');
    writeText(doc, text);
    dim = doc.getTextDimensions(splitText);
    yAxis = yAxis - 6;
    doc.setDrawColor(180, 180, 180);
    doc.setLineWidth(1);
    doc.line(leftPadding, yAxis, leftPadding + dim.w, yAxis);
    yAxis = yAxis + 5;
  }

  function writeLanguage(doc, text) {
    splitText = doc.splitTextToSize(text, leftPadding + 50);
    doc.text(leftPadding, yAxis, splitText);
    dim = doc.getTextDimensions(splitText);

    return dim.h;
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

    doc.setFillColor(230, 230, 232);
    doc.rect(236 + centerWrite, yAxis - dim.h - 1, dim.w + 8, dim.h + 4, 'F');
    doc.setDrawColor(180, 180, 180);
    doc.setLineWidth(1);
    doc.line(
      236 + centerWrite,
      yAxis + dim.h - 3,
      244 + centerWrite + dim.w,
      yAxis + dim.h - 3
    );

    doc.text(240 + centerWrite, yAxis, text);
  }

  function writeComputerSkill(doc, el) {
    let knowladge = getKnowladge(el?.expierienceGathered);
    let expierience = getExpierience(el?.yearExpierience);

    doc.setDrawColor(180, 180, 180);
    doc.setLineWidth(1);
    doc.line(leftPadding + 70, yAxis, 128, yAxis);

    doc.setFillColor(38, 55, 65);
    doc.circle(leftPadding + 71 + knowladge * expierience, yAxis, 2, 'F');

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
      doc.rect(10, 0, 125, 840, 'F');
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

export default simpleGrey;
