import jsPDF from 'jspdf';
const mail = '/static/images/resume/mail.png';
const phone = '/static/images/resume/phone.png';
const calendar = '/static/images/resume/calendar.png';
const female = '/static/images/resume/female.png';
const male = '/static/images/resume/male.png';
const marker = '/static/images/resume/marker.png';

const generateResume = async () => {
  let doc = new jsPDF('portrait', 'px', 'a4');

  console.log(doc.getFontList());
  let leftPadding = 15;
  let yAxis = 20;
  let splitText = [];
  let leftMaxWide = 112;
  let dim;
  let showAge = true;
  let sex = 'male';

  doc.setFillColor(165, 42, 42);
  doc.rect(0, 0, 135, 840, 'F');

  //595 × 842 points.
  //First Last Name
  doc.setFontSize(16);
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(243, 246, 251);
  splitText = doc.splitTextToSize('Raitis Lebedevs', leftMaxWide);
  doc.text(leftPadding, yAxis, splitText);
  dim = doc.getTextDimensions(splitText);

  yAxis = yAxis + dim.h + 1;
  //Sub Text
  doc.setFontSize(12);
  doc.setFont('Helvetica', 'normal');
  splitText = doc.splitTextToSize('Software Developer', leftMaxWide);
  doc.text(leftPadding, yAxis, splitText);
  dim = doc.getTextDimensions(splitText);

  yAxis = yAxis + dim.h + 1;
  //Line
  doc.setFont('Helvetica', 'bold');
  doc.setDrawColor(243, 246, 251);
  doc.setLineWidth(2.5);
  doc.line(leftPadding, yAxis, 55, yAxis);
  yAxis = yAxis + 10;

  doc.setFont('Helvetica', 'bold');
  //General Details
  pngItems(doc, mail, 'name.other@gmail.com');
  pngItems(doc, phone, '+371 282444444');

  if (showAge) pngItems(doc, calendar, '1980-05-03');

  if (sex == 'male') {
    pngItems(doc, male, 'Male');
  }
  if (sex == 'female') {
    pngItems(doc, female, 'Female');
  }

  pngItems(doc, marker, 'Rīga, Latvia,');

  doc.save('Details.pdf');

  function pngItems(doc, png, text) {
    doc.addImage(png, 'PNG', leftPadding, yAxis, 8, 8);
    doc.setFontSize(10);
    yAxis = yAxis + 6;
    splitText = doc.splitTextToSize(text, leftMaxWide - 12);
    doc.text(leftPadding + 12, yAxis, splitText);
    dim = doc.getTextDimensions(splitText);
    yAxis = yAxis + dim.h + 3;
  }
};

export default generateResume;
