import { Form , Button, Input, message, Alert } from "antd";
import { useCreateClassMutation, useGetAllClassesQuery, useUpdateClassMutation } from "../services/api"
import { useNavigate } from "react-router-dom";
import { GenericTable } from "../components/GenericTable";
import type { ClassModel } from "../types/index";
import React, { useState } from "react";
import { EditOutlined, PlusOutlined } from '@ant-design/icons'; //ספריה של איקונים 
import { GenericModel } from "../components/GenericModel";


//const {Title , Paragraph } = Typography;


export const ClassesPage = () => {

    const navigate = useNavigate();
    const [form] = Form.useForm(); //יצירת אוביקט של טופס

    const { data: classes, isLoading , isError , refetch} = useGetAllClassesQuery();
    const [addClass, { isLoading: isAdding }] = useCreateClassMutation();
    const [updateClass, { isLoading: isUpdating }] = useUpdateClassMutation();

        //במקרה של שגיאה
    if(isError)
        return(
            <Alert
                message='שגיאה בטעינת הנתונים'
                description='לא ניתן היה לטעון את נתוני התלמידים מהשרת'
                type='error'
                action={
                    <Button
                    size='small' type='primary' onClick={() => refetch()}
                    ></Button>
                }

                style={{margin: '20px 0'}}
            />
    );


    //סטייט לניהול הדיאלוג
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [editingClass, setEitingClass] = useState<ClassModel | null>(null);


    //     שם הכיתה	שם מזהה של הכיתה
    // שכבה	השכבה אליה משתייכת הכיתה
    // מחנכת הכיתה	שם המחנכת האחראית
    // מספר תלמידים	כמות התלמידים הרשומים בכיתה

    const columns =
        [
            //פה אנחנו נגדיר את העמודות שיהיו בטבלה 

            {
                title: 'שם הכיתה',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'שכבה',
                dataIndex: 'grade',
                key: 'grade'
            },

            {
                title: 'מחנכת הכיתה',
                dataIndex: 'homeroomTeacher',
                key: 'homeroomTeacher'
            },

            {
                title: 'מספר התלמידים',
                dataIndex: 'studentsCount',
                key: 'studentsCount'
            },

            {
                title: 'פעולות',
                key: 'actions',
                //מיועד להצגת משהו שהוא לא טקסט render 
                //לבדוק שוב על ההבדל בין unknown ל any 
                render: (_: unknown, record: ClassModel) => (
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={(e) => openToUpdate(record, e)} //מעבירים לפונקית העדכון את הרשומה שצריך לעדכן ואת ארוע הלחיצה
                        style={{color: '#222c65'}}
                    >
                        עריכה
                    </Button>
                )

            },


        ]

    //פונקציות של הדיאלוג

    //פונקציה לפתיחת הדיאלוג להוספת כיתה חדשה
    const openToCreate = () => {
        setEitingClass(null); //שמים בסטייט null שזה אומר אנחנו לא בעריכה של כיתה קיימת
        form.resetFields(); //מנקים את כל התיבות טקסט
        setIsModelOpen(true); //פתיחת הדיאלוג
    };

    //פונקציה לפתיחת הדיאלוג לעריכת כיתה קיימת 
    //e:React.MouseEvent - מגדיר ארוע לחיצת עכבר 
    const openToUpdate = (record: ClassModel, e: React.MouseEvent) => {
        e.stopPropagation();//למרות שהיתה לחיצה על שורה אומרים לו כאן לא לעבור לעמוד התלמידים
        setEitingClass(record);//שמירת הכיתה
        form.setFieldsValue(record); //ממלאים את השדות שבטופס בנתוניפ הקיימים של הכיתה
        setIsModelOpen(true); //פתיחת הדיאלוג
    };

    //פונקציה לשמירה
    //למה זה async וכל השאר לא ?
    //הפונקציה נזאת עושה פעולות שהם לא מידיות ולכן צריך לחכןת לשרת 
    const submit = async () => {

        try {
            //בדיקה שהשדות תקינים 
            //איפה קוראת הבדיקה הזאת ?
            //בהגדרות של הFORM שניצור
            const values = await form.validateFields();

            if (editingClass)//אם אנחנו בעריכה
            {
                //unwrap - מביא את התשובה האמיתית מהשרת או זורק שגיאה במקרה הצורך
                await updateClass({ id: editingClass.id, data: values }).unwrap();
                //מוסיפים הודעת הצלחה
                message.success('הכיתה עודכנה בהצלחה !');
            }

            else //הוספה
            {
                await addClass(values).unwrap();
                message.success('הכיתה נוספה בהצלחה !');
            }

            //ניקוי הטופס וסגירת המודל
            setIsModelOpen(false);
            form.resetFields();
        }

        catch (error) {
            console.error('Validation or Mutation failed:', error);
        }

    }

    return (
        <>
            <GenericTable<ClassModel> //שימוש בטבלה שיצרנו
                title="ניהול כיתות"
                columns={columns}
                data={classes}
                isLoading={isLoading}
                rowKey={"id"}
                onRowClick={
                    (selectedClass) => navigate(`/classes/${selectedClass.id}/students`)
                }
                //משתמשים בextra להוספת כפתור של הוספת כיתה חדשה 
                extra={
                    <Button type="primary" icon={<PlusOutlined />} onClick={openToCreate}>
                        הוספת כיתה חדשה
                    </Button>
                }
            />

            {/* //שימוש בדיאלוג שיצרנו */}
            <GenericModel
                isOpen={isModelOpen}
                title={editingClass ? 'עריכת כיתה' : 'הוספת כיתה חדשה'}
                onClose={() => setIsModelOpen(false)}
                onSubmit={submit}
                isLoading={isAdding || isUpdating}
            >
                {/* //פה מכניסים את הטופס  */}
                <Form form={form} layout="vertical">
                    {/* //Form.Item  - תגית בתוך הטופס */}
                    <Form.Item
                        name="name"
                        label="שם הכיתה"
                        rules={[{ required: true, message: 'נא להזין שם כיתה' }]}
                    >
                        {/* הוספת תיבת טקסט */}
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="grade"
                        label="שכבה"
                        rules={[{ required: true, message: 'נא להזין שכבה' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="homeroomTeacher"
                        label="מחנכת הכיתה"
                        rules={[{ required: true, message: 'נא להזין שם מחנכת' }]}
                    >
                        <Input />
                    </Form.Item>



                </Form>
            </GenericModel>

        </>
    )



}
