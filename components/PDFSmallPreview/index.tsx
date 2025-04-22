import { Document, Page, pdfjs } from 'react-pdf';
import supabase from '@/api/supabase/createClient';
import { Flex } from '@/styles/containers';
import { UserTypeEnum } from '@/types/schema';
import { pdfFiles } from '@/utils/helpers';
import Icon from '../Icon';
import { TextWrapper } from './styles';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
const getPDFUrl = (userType: UserTypeEnum) => {
  const pdfData = pdfFiles[userType].filename;
  return supabase.storage.from('pdfs').getPublicUrl(pdfData).data.publicUrl;
};

export default function PDFSmallPreview(selectedGardenType: UserTypeEnum) {
  const url = getPDFUrl(selectedGardenType);
  return (
    <Flex
      $direction="column"
      $justify="center"
      $gap=".75rem"
      $align="center"
      $w="10.5rem"
      $minH="16rem"
      onClick={() => window.open(url, '_blank')}
    >
      <Flex
        $direction="row"
        $background="#F0F0F0"
        $pl=".5rem"
        $pr=".5rem"
        $pt="1rem"
        $pb="1rem"
        $justify="center"
        $gap=".25rem"
        $align="center"
        $radius="5px 5px 0px 0px"
        $h="3rem"
      >
        <Icon type="pdf" />
        <TextWrapper>
          {pdfFiles[selectedGardenType].label} Planting Guide
        </TextWrapper>
      </Flex>
      <Document file={getPDFUrl(selectedGardenType)}>
        <Page
          pageNumber={1}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          width={148}
        />
      </Document>
    </Flex>
  );
}
