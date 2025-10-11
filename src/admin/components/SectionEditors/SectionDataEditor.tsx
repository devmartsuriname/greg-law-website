import { PageSection } from '../../api/pages';
import { HeroEditor } from './HeroEditor';
import { AboutEnhancedEditor } from './AboutEnhancedEditor';
import { ServicesGridDynamicEditor } from './ServicesGridDynamicEditor';
import { CareerTimelineEditor } from './CareerTimelineEditor';
import { MetricsCounterEditor } from './MetricsCounterEditor';
import { TestimonialsEditor } from './TestimonialsEditor';
import { TeamGridEditor } from './TeamGridEditor';
import { NewsPreviewEditor } from './NewsPreviewEditor';
import { ContactCTAEditor } from './ContactCTAEditor';
import { Form } from 'react-bootstrap';

interface SectionDataEditorProps {
  section: PageSection;
  onChange: (data: Record<string, any>) => void;
}

export const SectionDataEditor = ({ section, onChange }: SectionDataEditorProps) => {
  const { type, data } = section;

  // Route to appropriate editor based on section type
  switch (type) {
    case 'hero':
      return <HeroEditor data={data} onChange={onChange} />;
    case 'about_enhanced':
      return <AboutEnhancedEditor data={data} onChange={onChange} />;
    case 'services_grid_dynamic':
      return <ServicesGridDynamicEditor data={data} onChange={onChange} />;
    case 'career_timeline':
      return <CareerTimelineEditor data={data} onChange={onChange} />;
    case 'metrics_counter':
      return <MetricsCounterEditor data={data} onChange={onChange} />;
    case 'testimonials':
      return <TestimonialsEditor data={data} onChange={onChange} />;
    case 'team_grid':
      return <TeamGridEditor data={data} onChange={onChange} />;
    case 'news_preview':
      return <NewsPreviewEditor data={data} onChange={onChange} />;
    case 'contact_cta_enhanced':
      return <ContactCTAEditor data={data} onChange={onChange} />;
    default:
      // Fallback to JSON editor for unknown types
      return (
        <Form.Group>
          <Form.Label className="small text-muted">Section Data (JSON)</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={JSON.stringify(data, null, 2)}
            onChange={(e) => {
              try {
                const parsedData = JSON.parse(e.target.value);
                onChange(parsedData);
              } catch (error) {
                // Invalid JSON, ignore
              }
            }}
            style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
          />
          <Form.Text>Edit section data as JSON</Form.Text>
        </Form.Group>
      );
  }
};
