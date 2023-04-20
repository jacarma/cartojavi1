import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { Typography } from '@mui/material';
import { StyleThumbnail } from './StyleThumbnail/StyleThumbnail';
import { StyleConfig } from './StyleConfig/StyleConfig';
import { LayerDefinition } from '../../../layer/model';

export const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
  },
}));

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export function LayerConfig({
  expanded,
  onHeaderClick,
  layer,
}: {
  expanded: boolean;
  onHeaderClick: (newExpanded: boolean) => void;
  layer: LayerDefinition;
}) {
  return (
    <Accordion
      expanded={expanded}
      onChange={(_, newExpanded: boolean) => onHeaderClick(newExpanded)}
      key={layer.dataSource.id}
    >
      <AccordionSummary
        aria-controls={`${layer.dataSource.id}-content`}
        id={`${layer.dataSource.id}-header`}
      >
        <Typography>{layer.dataSource.id}</Typography>
        <StyleThumbnail style={layer.style} />
      </AccordionSummary>
      <AccordionDetails>
        <StyleConfig layer={layer} />
      </AccordionDetails>
    </Accordion>
  );
}
