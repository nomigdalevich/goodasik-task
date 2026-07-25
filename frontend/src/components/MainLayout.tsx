import { Layout, Menu, Typography } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { BookOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

export const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/about',
      icon: <InfoCircleOutlined />,
      label: 'אודות',
    },
    {
      key: '/classes',
      icon: <BookOutlined />,
      label: 'ניהול כיתות',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* הילדר ראשי */}
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          backgroundColor: '#222c65', 
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Title
            level={4}
            style={{ color: '#ffffff', margin: 0, cursor: 'pointer' }}
            onClick={() => navigate('/about')}
          >
            מערכת לניהול כיתות
          </Title>

          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={({ key }) => navigate(key)}
            style={{
              backgroundColor: 'transparent',
              borderBottom: 'none',
              minWidth: '250px',
            }}
          />
        </div>
      </Header>

      <Content style={{ padding: '24px', backgroundColor: '#f5f5f5' }}>
        <Outlet />
      </Content>

      <Footer style={{ textAlign: 'center', color: '#8c8c8c' }}>
        מערכת לניהול כיתות ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};
