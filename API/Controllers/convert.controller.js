/**
 * Le controller convert.controller convertit un SVG reçu en un fichier PDF format A4. 
 * 
 * Étapes principales :
 * 1. Le SVG est converti en image JPEG avec fond blanc via la bibliothèque Sharp.
 * 2. L’image est ensuite découpée en plusieurs pages A4.
 * 3. Chaque partie est ajoutée à une nouvelle page d’un document PDF 
 * 
 * Bibliothèques utilisées :
 * - `sharp` pour le traitement d’image
 * - `pdf-lib` pour la génération du PDF
 */

const sharp = require("sharp");
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");

const A4_WIDTH_CM = 21.0;
const A4_HEIGHT_CM = 29.7;
const CM_TO_PT = 72 / 2.54;
const A4_WIDTH_PT = A4_WIDTH_CM * CM_TO_PT;
const A4_HEIGHT_PT = A4_HEIGHT_CM * CM_TO_PT;

const convertSvgToPdf = async (req, res) => {
  try {
    const svg = req.body;

 
    const jpgBuffer = await sharp(Buffer.from(svg))
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .jpeg({ quality: 100 })
      .toBuffer();


    const metadata = await sharp(jpgBuffer).metadata();
    const imgWidth = metadata.width;
    const imgHeight = metadata.height;

    const pdfDoc = await PDFDocument.create();

  
    const cols = Math.ceil(imgWidth / A4_WIDTH_PT);
    const rows = Math.ceil(imgHeight / A4_HEIGHT_PT);

    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cropX = col * A4_WIDTH_PT;
        const cropY = row * A4_HEIGHT_PT;
        const cropWidth = Math.min(A4_WIDTH_PT, imgWidth - cropX);
        const cropHeight = Math.min(A4_HEIGHT_PT, imgHeight - cropY);

        const tileBuffer = await sharp(jpgBuffer)
          .extract({
            left: Math.floor(cropX),
            top: Math.floor(cropY),
            width: Math.floor(cropWidth),
            height: Math.floor(cropHeight),
          })
          .toBuffer();

        const page = pdfDoc.addPage([A4_WIDTH_PT, A4_HEIGHT_PT]);
        const tileImage = await pdfDoc.embedJpg(tileBuffer);

        page.drawImage(tileImage, {
          x: 0,
          y: A4_HEIGHT_PT - cropHeight, 
          width: cropWidth,
          height: cropHeight,
        });
        const rowLabel = String.fromCharCode(65 + row); 
        const colLabel = (col + 1).toString();
        const label = `${rowLabel}${colLabel}`; 

        page.drawText(label, {
          x: 300,
          y: 420,
          size: 70,
          font: font,
          color: rgb(0.5, 0.5, 0.5),
          opacity: 0.5,
        });
      }
    }

    const pdfBytes = await pdfDoc.save();
    const base64 = Buffer.from(pdfBytes).toString("base64");

    res.status(200).json({ base64 });
  } catch (error) {
    console.error("Erreur de conversion", error);
    res.status(500).send("Erreur de conversion SVG vers PDF");
  }
};

module.exports = { convertSvgToPdf };
