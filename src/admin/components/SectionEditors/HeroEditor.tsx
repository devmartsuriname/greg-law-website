import { Form, Row, Col, Button } from 'react-bootstrap';

interface HeroEditorProps {
  data: Record<string, any>;
  onChange: (data: Record<string, any>) => void;
}

export const HeroEditor = ({ data, onChange }: HeroEditorProps) => {
  const slides = data.slides || [{ title: data.title || '', subtitle: data.subtitle || '', buttonText: data.buttonText || '', buttonLink: data.buttonLink || '', image: data.image || '' }];

  const updateSlide = (index: number, field: string, value: any) => {
    const newSlides = [...slides];
    newSlides[index] = { ...newSlides[index], [field]: value };
    onChange({ ...data, slides: newSlides });
  };

  const addSlide = () => {
    const newSlides = [...slides, { title: '', subtitle: '', buttonText: '', buttonLink: '', image: '' }];
    onChange({ ...data, slides: newSlides });
  };

  const removeSlide = (index: number) => {
    if (slides.length > 1) {
      const newSlides = slides.filter((_: any, i: number) => i !== index);
      onChange({ ...data, slides: newSlides });
    }
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Background Image URL</Form.Label>
        <Form.Control
          type="text"
          value={data.backgroundImage || ''}
          onChange={(e) => onChange({ ...data, backgroundImage: e.target.value })}
          placeholder="/images/background.jpg"
        />
      </Form.Group>

      <hr className="my-4" />
      <h5 className="mb-3">Hero Slides</h5>

      {slides.map((slide: any, index: number) => (
        <div key={index} className="border rounded p-3 mb-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="mb-0">Slide {index + 1}</h6>
            {slides.length > 1 && (
              <Button variant="danger" size="sm" onClick={() => removeSlide(index)}>
                Remove
              </Button>
            )}
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Title *</Form.Label>
            <Form.Control
              type="text"
              value={slide.title || ''}
              onChange={(e) => updateSlide(index, 'title', e.target.value)}
              placeholder="Enter slide title (HTML allowed)"
            />
            <Form.Text>You can use HTML tags like &lt;br /&gt; for line breaks</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Subtitle</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={slide.subtitle || ''}
              onChange={(e) => updateSlide(index, 'subtitle', e.target.value)}
              placeholder="Enter slide subtitle"
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Button Text</Form.Label>
                <Form.Control
                  type="text"
                  value={slide.buttonText || ''}
                  onChange={(e) => updateSlide(index, 'buttonText', e.target.value)}
                  placeholder="e.g., Learn More"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Button Link</Form.Label>
                <Form.Control
                  type="text"
                  value={slide.buttonLink || ''}
                  onChange={(e) => updateSlide(index, 'buttonLink', e.target.value)}
                  placeholder="/contact"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Slide Image URL</Form.Label>
            <Form.Control
              type="text"
              value={slide.image || ''}
              onChange={(e) => updateSlide(index, 'image', e.target.value)}
              placeholder="/images/hero-image.png"
            />
          </Form.Group>
        </div>
      ))}

      <Button variant="primary" onClick={addSlide} className="w-100">
        + Add Slide
      </Button>
    </>
  );
};