import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Input, Tag, Typography, Select, Form, message, Alert, Space } from 'antd';
import { useCreateStudentMutation, useGetStudentsByFilterQuery, useUpdateStudentMutation } from '../services/api';
import { GenericTable } from "../components/GenericTable";
import type { StudentModel, UpdateStudentDto } from "../types/index";
import { ArrowRightOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { GenericModel } from "../components/GenericModel";
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const { Title } = Typography;

export const StudentsPage = () => {

    const { classId } = useParams<{ classId: string }>();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [search, setSearch] = useState('');
    const [status, setStatus] = useState<string | undefined>(undefined);

    const { data: FilterStudents = [], isLoading, isError, refetch } = useGetStudentsByFilterQuery({
        classId: Number(classId),
        search: search || undefined,
        status: status || undefined,
    });

    if (isError)
        return (
            <Alert
                message='שגיאה בטעינת הנתונים'
                description='לא ניתן היה לטעון את נתוני התלמידים מהשרת'
                type='error'
                action={
                    <Button
                        size='small' type='primary' onClick={() => refetch()}
                    ></Button>
                }
                style={{ margin: '20px 0' }}
            />
        );

    const [addStudent, { isLoading: isAdding }] = useCreateStudentMutation();
    const [updateStudent, { isLoading: isUpdating }] = useUpdateStudentMutation();

    const [isModelOpen, setIsModelOpen] = useState(false);
    const [editingStudent, setEidingStudent] = useState<StudentModel | null>(null);

    const columns = [
        {
            title: 'תעודת זהות',
            dataIndex: 'identityNumber',
            key: 'identityNumber'
        },
        {
            title: 'שם פרטי',
            dataIndex: 'firstName',
            key: 'firstName'
        },
        {
            title: 'שם משפחה',
            dataIndex: 'lastName',
            key: 'lastName'
        },
        {
            title: 'סטטוס',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const isActive = status === 'ACTIVE';
                const color = isActive ? 'green' : 'red';
                const text = isActive ? 'פעיל' : 'לא פעיל';
                return <Tag color={color}>{text}</Tag>;
            },
        },
        {
            title: 'פעולות',
            key: 'actions',
            render: (_: unknown, record: StudentModel) => (
                <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => openToUpdate(record)}
                >
                    עריכה
                </Button>
            )
        },
    ];

    const openToCreate = () => {
        setEidingStudent(null);
        form.resetFields();
        setIsModelOpen(true);
    };

    const openToUpdate = (record: StudentModel) => {
        setEidingStudent(record);
        form.setFieldsValue({
            ...record,
            status: record.status,
        });
        setIsModelOpen(true);
    };

    const submit = async () => {
        try {
            const values = await form.validateFields();

            if (editingStudent) {
                const updateDto: UpdateStudentDto = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    parentPhone: values.parentPhone,
                    status: values.status,
                };

                await updateStudent({ id: editingStudent.id, data: updateDto }).unwrap();
                message.success('התלמיד עודכן בהצלחה !');
            } else {
                const createDto = {
                    ...values,
                    classId: Number(classId),
                };

                await addStudent(createDto).unwrap();
                message.success('התלמיד נוסף בהצלחה !');
            }

            setIsModelOpen(false);
            form.resetFields();
        }

        catch (error) {
            const err = error as FetchBaseQueryError;

            const errorMessage =
                (err.data as { message?: string })?.message||
                'אירעה שגיאה בעת שמירת הנתונים';

            message.error(errorMessage);
        }
    };

    return (
        <>
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                    <Button
                        icon={<ArrowRightOutlined />} onClick={() => navigate('/classes')}
                    >חזרה לרשימת הכיתות</Button>
                </div>

                <Title level={3}>תלמידי הכיתה</Title>

                <GenericTable<StudentModel>
                    title=''
                    columns={columns}
                    data={FilterStudents}
                    isLoading={isLoading}
                    rowKey="id"
                    extra={
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: 12, flexWrap: 'wrap' }}>
                            <Space size="middle" wrap>
                                <Input
                                    placeholder='חיפוש לפי שם או תעודת זהות'
                                    prefix={<SearchOutlined />}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    style={{ width: 260 }}
                                    allowClear
                                />

                                <Select
                                    placeholder='סינון לפי סטטוס'
                                    value={status}
                                    onChange={(value) => setStatus(value)}
                                    style={{ width: 160 }}
                                    allowClear
                                    options={[
                                        { value: 'ACTIVE', label: 'פעיל' },
                                        { value: 'INACTIVE', label: 'לא פעיל' },
                                    ]}
                                />
                            </Space>

                            <Button type="primary" icon={<PlusOutlined />} onClick={openToCreate}>
                                הוספת תלמיד חדש
                            </Button>
                        </div>
                    }
                />
            </div>

            <GenericModel
                isOpen={isModelOpen}
                title={editingStudent ? 'עריכת תלמיד' : 'הוספת תלמיד חדש'}
                onClose={() => setIsModelOpen(false)}
                onSubmit={submit}
                isLoading={isAdding || isUpdating}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="identityNumber"
                        label='תעודת זהות'
                        rules={[{ required: true, message: 'נא להזין תעודת זהות' }]}
                    >
                        <Input disabled={!!editingStudent} />
                    </Form.Item>

                    <Form.Item
                        name="firstName"
                        label='שם פרטי'
                        rules={[{ required: true, message: 'נא להזין שם פרטי' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="lastName"
                        label='שם משפחה'
                        rules={[{ required: true, message: 'נא להזין שם משפחה' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="parentPhone"
                        label='טלפונים של ההורים'
                        rules={[{ required: false }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="status"
                        label='סטטוס'
                        rules={[{ required: true, message: 'נא לבחור סטטוס' }]}
                    >
                        <Select
                            options={[
                                { value: 'ACTIVE', label: 'פעיל' },
                                { value: 'INACTIVE', label: 'לא פעיל' },
                            ]}
                        />
                    </Form.Item>

                </Form>
            </GenericModel>
        </>
    );
};
