import { openSansBold } from 'fonts/OpenSans-Bold-bold';
import { openSansRegular } from 'fonts/OpenSans-Regular-normal';
import jsPDF from 'jspdf';
import gradient from './CvTemplates/gradient';
import placifullTemplate from './CvTemplates/placifullTemplate';
import radientBlue from './CvTemplates/radientBlue';
import simpleGrey from './CvTemplates/simpleGrey';

const generateResume = async (cv, t, cvCurrency, rgb, template, avatar) => {
  let doc = new jsPDF('portrait', 'px', 'a4');

  doc.addFileToVFS('CustomPdfFont.ttf', openSansRegular);
  doc.addFont('CustomPdfFont.ttf', 'MainPdf', 'normal');
  doc.addFileToVFS('CustomPdfFont.ttf', openSansBold);
  doc.addFont('CustomPdfFont.ttf', 'MainPdf', 'bold');

  if (template === 'placifull') placifullTemplate(doc, cv, t, cvCurrency, rgb);

  if (template === 'simpleGrey')
    simpleGrey(doc, cv, t, cvCurrency, rgb, avatar);

  if (template === 'sunsetGadient')
    gradient(doc, cv, t, cvCurrency, rgb, avatar);

  if (template === 'radientBlue')
    radientBlue(doc, cv, t, cvCurrency, rgb, avatar);
};

export default generateResume;
