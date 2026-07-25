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
          borderRadius: 8, // פינות מעט מעוגלות ומודרניות
        },
        components: { //הגדרת עיצוב לקומפוננטות השונות
          Button: {
            // lineWidth: 0,
           // הגדרת הצללה עדינה ונקייה ישירות לכפתורים הראשיים
            primaryShadow: '0 4px 4px rgba(31, 39, 87, 0.25)',

          },
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          {/* הגדרת ה-Layout הראשי כמעטפת */}
          <Route path="/" element={<MainLayout />}>
            {/* ברירת מחדל: הפניה ל-about */}
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
