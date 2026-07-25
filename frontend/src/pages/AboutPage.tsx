import { Typography, Card, Divider } from "antd";

const { Title, Paragraph , Text } = Typography;

export const AboutPage = () => {

    return (
        <Card>
            <Title level={2}>
                אודות המערכת
            </Title>

            <Paragraph>
                מערכת לניהול כיתות ותלמידים שנבנתה כחלק ממשימת פיתוח Full Stack.
                המערכת מאפשרת לצפות ברשימת הכיתות, לנווט לתלמידי כל כיתה, לבצע חיפוש וסינון מתקדמים, ולהוסיף או לערוך פרטי תלמידים.
            </Paragraph>

            <Divider />

            <Title level={4}>טכנולוגיות בשימוש:</Title>

            {/* Paragraph - פסקת טקסט */}
            {/* strong - מדגיש בבולד */}
            <Paragraph> 
                <strong>Frontend:</strong> React, TypeScript, Redux Toolkit Query (RTK Query), Ant Design, React Router
            </Paragraph>

            <Paragraph>
                <strong>Backend:</strong> NestJS, TypeScript (In-Memory Data Store)
            </Paragraph>

            <div style={{textAlign:'left' , marginTop: 220}}>
                <Text type="secondary" style={{fontSize: 14}}>
               # נבנה ותוכנת ע"י נעמי גדלביץ 
                </Text>
            </div>
        </Card>
    );
};
