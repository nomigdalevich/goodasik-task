import { Form , Button, Input, message, Alert } from "antd";
import { useCreateClassMutation, useGetAllClassesQuery, useUpdateClassMutation } from "../services/api"
import { useNavigate } from "react-router-dom";
import { GenericTable } from "../components/GenericTable";
import type { ClassModel } from "../types/index";
import React, { useState } from "react";
import { EditOutlined, PlusOutlined } from '@ant-design/icons'; 
import { GenericModel } from "../components/GenericModel";




export const ClassesPage = () => {

    const navigate = useNavigate();
    const [form] = Form.useForm(); 

    const { data: classes, isLoading , isError , refetch} = useGetAllClassesQuery();
    const [addClass, { isLoading: isAdding }] = useCreateClassMutation();
    const [updateClass, { isLoading: isUpdating }] = useUpdateClassMutation();

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


    const [isModelOpen, setIsModelOpen] = useState(false);
    const [editingClass, setEitingClass] = useState<ClassModel | null>(null);



    const columns =
        [

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
                render: (_: unknown, record: ClassModel) => (
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={(e) => openToUpdate(record, e)}
                        style={{color: '#222c65'}}
                    >
                        עריכה
                    </Button>
                )

            },


        ]

    const openToCreate = () => {
        setEitingClass(null); 
        form.resetFields();
        setIsModelOpen(true); 
    };

    const openToUpdate = (record: ClassModel, e: React.MouseEvent) => {
        e.stopPropagation();
        setEitingClass(record);
        form.setFieldsValue(record); 
        setIsModelOpen(true); 
    };

    const submit = async () => {

        try {
            const values = await form.validateFields();

            if (editingClass)
            {
                await updateClass({ id: editingClass.id, data: values }).unwrap();
                message.success('הכיתה עודכנה בהצלחה !');
            }

            else 
            {
                await addClass(values).unwrap();
                message.success('הכיתה נוספה בהצלחה !');
            }

            setIsModelOpen(false);
            form.resetFields();
        }

        catch (error) {
            console.error('Validation or Mutation failed:', error);
        }

    }

    return (
        <>
            <GenericTable<ClassModel> 
                title="ניהול כיתות"
                columns={columns}
                data={classes}
                isLoading={isLoading}
                rowKey={"id"}
                onRowClick={
                    (selectedClass) => navigate(`/classes/${selectedClass.id}/students`)
                }
                extra={
                    <Button type="primary" icon={<PlusOutlined />} onClick={openToCreate}>
                        הוספת כיתה חדשה
                    </Button>
                }
            />

            <GenericModel
                isOpen={isModelOpen}
                title={editingClass ? 'עריכת כיתה' : 'הוספת כיתה חדשה'}
                onClose={() => setIsModelOpen(false)}
                onSubmit={submit}
                isLoading={isAdding || isUpdating}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name"
                        label="שם הכיתה"
                        rules={[{ required: true, message: 'נא להזין שם כיתה' }]}
                    >
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
