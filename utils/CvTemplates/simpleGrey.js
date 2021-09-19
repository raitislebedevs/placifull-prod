// color codes: #263741 , #E6E6E8, #DDDFDE
// let imageSecond =
//   'https://placifull-development.s3.eu-north-1.amazonaws.com/title_83761f7619.png';

import { formatMonth } from 'utils/standaloneFunctions';

const mail = '/static/images/resume/mail.png';
const phone = '/static/images/resume/phone.png';
const calendar = '/static/images/resume/calendar.png';
const female = '/static/images/resume/female.png';
const male = '/static/images/resume/male.png';
const marker = '/static/images/resume/marker.png';

const simpleGrey = async (doc, cv, t, cvCurrency, rgb, avatar) => {
  let macPageHeight = 575;
  let leftPadding = 20;
  let yAxis = 100;
  let splitText = [];
  let leftMaxWide = 110;
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

  doc.setFillColor(38, 55, 65);
  doc.rect(0, 0, 540, 67, 'F');

  doc.setFillColor(230, 230, 232);
  doc.rect(10, 0, 125, 840, 'F');

  let extension = avatar?.ext.replace('.', '').toUpperCase();
  let image = avatar.url;
  doc.addImage(image, extension, 27, 15, 82, 75);
  doc.setLineWidth(0);
  doc.setDrawColor(0);
  doc.setFillColor(255, 255, 255);

  doc.setLineWidth(20);
  doc.setDrawColor(230, 230, 232);
  doc.circle(67, 52, 47, 'S');

  doc.setLineWidth(1);
  doc.setDrawColor(38, 55, 65);
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
  doc.setFont(cvPdfBoldFont, 'normal');
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
    writeHeader(doc, t('cv:labels.education'));

    educationDetail.forEach((el, idx, array) => {
      let edu = t(`cv:qualification.${el?.qualification}`);
      if (el?.studyArea && el?.qualification) {
      }
      if (el?.avarageGrade) {
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
      if (yAxis > macPageHeight) {
        createNewPage(doc);
      }
    });
  }

  const documentName = `${cv?.cvFirstName}.${cv?.cvLasttName}.pdf`;
  doc.save(documentName);

  // HELP FUNCTIONS

  function writeText(doc, text, yHeight = 0) {
    splitText = doc.splitTextToSize(text, leftMaxWide);
    doc.text(leftPadding, yAxis, splitText);
    dim = doc.getTextDimensions(splitText);
    yAxis = yAxis + dim.h + yHeight;
  }

  function pngItems(doc, png, text) {
    doc.addImage(png, 'PNG', leftPadding, yAxis, 8, 8);
    yAxis = yAxis + 6;
    splitText = doc.splitTextToSize(text, leftMaxWide - 12);
    doc.text(leftPadding + 12, yAxis, splitText);
    dim = doc.getTextDimensions(splitText);
    yAxis = yAxis + dim.h + 3;
  }
  function writeHeader(doc, text) {
    yAxis = yAxis + 10;
    doc.setFont(cvPdfBoldFont, 'bold');
    writeText(doc, text);
    doc.setLineWidth(1);
    doc.line(leftPadding, yAxis, 125, yAxis);
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

export default simpleGrey;
