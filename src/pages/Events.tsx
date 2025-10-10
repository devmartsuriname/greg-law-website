import { useState, useEffect } from 'react';
import PageTitle from '../components/PageTitle';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface Event {
  id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time?: string;
  location?: string;
  category?: string;
  google_calendar_id?: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'upcoming' | 'past' | 'all'>('upcoming');

  useEffect(() => {
    loadEvents();
  }, [filter]);

  const loadEvents = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('events')
        .select('*')
        .eq('published', true)
        .eq('visible', true)
        .order('start_time', { ascending: filter !== 'past' });

      if (filter === 'upcoming') {
        query = query.gte('start_time', new Date().toISOString());
      } else if (filter === 'past') {
        query = query.lt('start_time', new Date().toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageTitle
        title="Events Calendar"
        breadcrumbs={[{ label: 'Events' }]}
        metaTitle="Events Calendar | VP Office"
        metaDescription="Upcoming events and public appearances by the Vice President"
      />

      <section className="events-section" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="section-title centered mb-5">
            <div className="title">Calendar</div>
            <h3>
              Upcoming Events & <span>Public Appearances</span>
            </h3>
          </div>

          {/* Filters */}
          <div className="text-center mb-4">
            <div className="btn-group" role="group">
              <button
                type="button"
                className={`btn ${filter === 'upcoming' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('upcoming')}
              >
                Upcoming
              </button>
              <button
                type="button"
                className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('all')}
              >
                All Events
              </button>
              <button
                type="button"
                className={`btn ${filter === 'past' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('past')}
              >
                Past Events
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No events scheduled at this time.</p>
            </div>
          ) : (
            <div className="row clearfix">
              {events.map((event) => (
                <div key={event.id} className="col-lg-6 col-md-12 mb-4">
                  <div className="event-block" style={{ 
                    border: '1px solid #e0e0e0', 
                    borderRadius: '8px', 
                    padding: '20px',
                    height: '100%'
                  }}>
                    <div className="d-flex">
                      <div className="event-date" style={{ 
                        minWidth: '80px', 
                        textAlign: 'center',
                        marginRight: '20px',
                        padding: '10px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px'
                      }}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                          {format(new Date(event.start_time), 'dd')}
                        </div>
                        <div style={{ fontSize: '14px', color: '#666' }}>
                          {format(new Date(event.start_time), 'MMM')}
                        </div>
                        <div style={{ fontSize: '12px', color: '#999' }}>
                          {format(new Date(event.start_time), 'yyyy')}
                        </div>
                      </div>
                      <div className="event-info flex-grow-1">
                        <h5>{event.title}</h5>
                        {event.description && (
                          <p className="text-muted mb-2">{event.description}</p>
                        )}
                        <div className="event-meta">
                          <div className="mb-1">
                            <Icon icon="mingcute:time-line" width={16} className="me-2" />
                            <small>
                              {format(new Date(event.start_time), 'hh:mm a')}
                              {event.end_time && ` - ${format(new Date(event.end_time), 'hh:mm a')}`}
                            </small>
                          </div>
                          {event.location && (
                            <div className="mb-1">
                              <Icon icon="mingcute:location-line" width={16} className="me-2" />
                              <small>{event.location}</small>
                            </div>
                          )}
                          {event.category && (
                            <span className="badge bg-primary mt-2">{event.category}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
