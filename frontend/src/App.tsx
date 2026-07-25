import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { AboutPage } from './pages/AboutPage';
import { ClassesPage } from './pages/ClassesPage';
import { ConfigProvider } from 'antd';
import { StudentsPage } from './pages/StudentsPage';

function App() {
  return (
    <ConfigProvider 
      direction='rtl'
      theme={{
        token: {
          colorPrimary: '#222c65',
          borderRadius: 8, 
        },
        components: { 
          Button: {
            primaryShadow: '0 4px 4px rgba(31, 39, 87, 0.25)',

          },
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/about" replace />} />
            
            <Route path="classes" element={<ClassesPage/>} />
            <Route path="about" element={<AboutPage/>} />
            <Route path='/classes/:classId/students' element={<StudentsPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
