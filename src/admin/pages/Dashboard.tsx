import { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

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
  const [stats] = useState([
    { icon: 'mingcute:news-line', title: 'News Articles', count: 24, color: 'primary' },
    { icon: 'mingcute:briefcase-line', title: 'Projects', count: 18, color: 'success' },
    { icon: 'mingcute:mic-line', title: 'Speeches', count: 12, color: 'warning' },
    { icon: 'mingcute:user-3-line', title: 'Users', count: 5, color: 'info' },
  ]);

  const chartOptions: ApexOptions = {
    chart: {
      type: 'line',
      height: 330,
      toolbar: { show: false },
    },
    series: [
      {
        name: 'Page Views',
        type: 'bar',
        data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67],
      },
      {
        name: 'Visitors',
        type: 'area',
        data: [12, 16, 11, 22, 28, 25, 15, 29, 35, 45, 42, 48],
      },
    ],
    stroke: {
      width: [0, 2],
      curve: 'smooth',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    colors: ['#7e67fe', '#17c553'],
    legend: {
      show: true,
      position: 'top',
    },
  };

  return (
    <>
      <div className="page-title-box mb-4">
        <h4 className="mb-0">Dashboard</h4>
      </div>

      <Row>
        {stats.map((stat, idx) => (
          <Col md={6} xl={3} key={idx}>
            <StatCard {...stat} />
          </Col>
        ))}
      </Row>

      <Row className="mt-4">
        <Col lg={12}>
          <Card>
            <Card.Header>
              <h4 className="card-title mb-0">Analytics Overview</h4>
            </Card.Header>
            <Card.Body>
              <ReactApexChart
                options={chartOptions}
                series={chartOptions.series}
                type="line"
                height={330}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col lg={12}>
          <Card>
            <Card.Header>
              <h4 className="card-title mb-0">Recent Activity</h4>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <table className="table table-centered table-nowrap mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Action</th>
                      <th>User</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>New article published</td>
                      <td>Admin User</td>
                      <td>2024-01-15 10:30</td>
                      <td><span className="badge bg-success">Success</span></td>
                    </tr>
                    <tr>
                      <td>Project updated</td>
                      <td>Editor</td>
                      <td>2024-01-14 15:20</td>
                      <td><span className="badge bg-success">Success</span></td>
                    </tr>
                    <tr>
                      <td>Media uploaded</td>
                      <td>Admin User</td>
                      <td>2024-01-13 09:15</td>
                      <td><span className="badge bg-success">Success</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
