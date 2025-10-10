import { useEffect, useState } from 'react';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface StatCardProps {
  icon: string;
  title: string;
  count: string | number;
  color: string;
}

const StatCard = ({ icon, title, count, color }: StatCardProps) => (
  <Card>
    <Card.Body>
      <Row>
        <Col xs={6}>
          <p className="text-muted mb-0 text-truncate">{title}</p>
          <h3 className="text-dark mt-2 mb-0">{count}</h3>
        </Col>
        <Col xs={6}>
          <div className={`ms-auto avatar-md bg-soft-${color} rounded`}>
            <Icon
              icon={icon}
              className={`fs-32 avatar-title text-${color}`}
              style={{ padding: '12px' }}
            />
          </div>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    news: 0,
    projects: 0,
    speeches: 0,
    services: 0,
    quotes: 0,
    appointments: 0,
    contacts: 0,
    media: 0,
  });
  const [recentAppointments, setRecentAppointments] = useState<any[]>([]);
  const [recentContacts, setRecentContacts] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch counts
      const [
        newsCount,
        projectsCount,
        speechesCount,
        servicesCount,
        quotesCount,
        appointmentsCount,
        contactsCount,
        mediaCount,
        appointments,
        contacts,
      ] = await Promise.all([
        supabase.from('news').select('id', { count: 'exact', head: true }),
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('speeches').select('id', { count: 'exact', head: true }),
        supabase.from('services').select('id', { count: 'exact', head: true }),
        supabase.from('quotes').select('id', { count: 'exact', head: true }),
        supabase.from('appointments').select('id', { count: 'exact', head: true }),
        supabase.from('contact_submissions').select('id', { count: 'exact', head: true }),
        supabase.from('media').select('id', { count: 'exact', head: true }),
        supabase.from('appointments').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }).limit(5),
      ]);

      setStats({
        news: newsCount.count || 0,
        projects: projectsCount.count || 0,
        speeches: speechesCount.count || 0,
        services: servicesCount.count || 0,
        quotes: quotesCount.count || 0,
        appointments: appointmentsCount.count || 0,
        contacts: contactsCount.count || 0,
        media: mediaCount.count || 0,
      });

      setRecentAppointments(appointments.data || []);
      setRecentContacts(contacts.data || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartOptions: ApexOptions = {
    chart: {
      type: 'line',
      height: 330,
      toolbar: { show: false },
    },
    series: [
      {
        name: 'Content Items',
        type: 'bar',
        data: [stats.news, stats.projects, stats.speeches, stats.services, stats.quotes, stats.media],
      },
    ],
    stroke: {
      width: [0],
      curve: 'smooth',
    },
    xaxis: {
      categories: ['News', 'Projects', 'Speeches', 'Services', 'Quotes', 'Media'],
    },
    colors: ['#7e67fe'],
    legend: {
      show: false,
    },
  };

  const statCards = [
    { icon: 'mingcute:news-line', title: 'News Articles', count: stats.news, color: 'primary', link: '/admin/news' },
    { icon: 'mingcute:briefcase-line', title: 'Projects', count: stats.projects, color: 'success', link: '/admin/projects' },
    { icon: 'mingcute:mic-line', title: 'Speeches', count: stats.speeches, color: 'warning', link: '/admin/speeches' },
    { icon: 'mingcute:certificate-line', title: 'Services', count: stats.services, color: 'info', link: '/admin/services' },
    { icon: 'mingcute:quote-left-line', title: 'Quotes', count: stats.quotes, color: 'secondary', link: '/admin/quotes' },
    { icon: 'mingcute:pic-line', title: 'Media Files', count: stats.media, color: 'primary', link: '/admin/media' },
    { icon: 'mingcute:calendar-line', title: 'Appointments', count: stats.appointments, color: 'warning', link: '/admin/appointments' },
    { icon: 'mingcute:mail-line', title: 'Contact Forms', count: stats.contacts, color: 'success', link: '/admin/contacts' },
  ];

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="page-title-box mb-4">
        <h4 className="mb-0">Dashboard</h4>
      </div>

      <Row>
        {statCards.map((stat, idx) => (
          <Col md={6} xl={3} key={idx}>
            <Link to={stat.link} style={{ textDecoration: 'none' }}>
              <StatCard {...stat} />
            </Link>
          </Col>
        ))}
      </Row>

      <Row className="mt-4">
        <Col lg={8}>
          <Card>
            <Card.Header>
              <h4 className="card-title mb-0">Content Overview</h4>
            </Card.Header>
            <Card.Body>
              <ReactApexChart
                options={chartOptions}
                series={chartOptions.series}
                type="bar"
                height={330}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Header>
              <h4 className="card-title mb-0">Quick Stats</h4>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Published Content</span>
                  <strong>{stats.news + stats.projects + stats.speeches}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Pending Appointments</span>
                  <strong>{recentAppointments.filter(a => a.status === 'pending').length}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>New Contacts</span>
                  <strong>{recentContacts.filter(c => c.status === 'new').length}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Total Media</span>
                  <strong>{stats.media}</strong>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col lg={6}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h4 className="card-title mb-0">Recent Appointments</h4>
              <Link to="/admin/appointments" className="btn btn-sm btn-link">
                View All
              </Link>
            </Card.Header>
            <Card.Body>
              {recentAppointments.length === 0 ? (
                <p className="text-muted text-center py-3">No appointments yet</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-sm table-nowrap mb-0">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Subject</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentAppointments.map((apt) => (
                        <tr key={apt.id}>
                          <td>{apt.full_name}</td>
                          <td className="text-truncate" style={{ maxWidth: '150px' }}>
                            {apt.subject}
                          </td>
                          <td>
                            <Badge
                              bg={
                                apt.status === 'pending'
                                  ? 'warning'
                                  : apt.status === 'approved'
                                  ? 'success'
                                  : 'danger'
                              }
                            >
                              {apt.status}
                            </Badge>
                          </td>
                          <td>{format(new Date(apt.created_at), 'MMM dd')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h4 className="card-title mb-0">Recent Contact Submissions</h4>
              <Link to="/admin/contacts" className="btn btn-sm btn-link">
                View All
              </Link>
            </Card.Header>
            <Card.Body>
              {recentContacts.length === 0 ? (
                <p className="text-muted text-center py-3">No contact submissions yet</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-sm table-nowrap mb-0">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentContacts.map((contact) => (
                        <tr key={contact.id}>
                          <td>{contact.name}</td>
                          <td className="text-truncate" style={{ maxWidth: '150px' }}>
                            {contact.email}
                          </td>
                          <td>
                            <Badge
                              bg={
                                contact.status === 'new'
                                  ? 'primary'
                                  : contact.status === 'read'
                                  ? 'info'
                                  : 'success'
                              }
                            >
                              {contact.status}
                            </Badge>
                          </td>
                          <td>{format(new Date(contact.created_at), 'MMM dd')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
