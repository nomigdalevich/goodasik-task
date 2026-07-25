import React from 'react';
import { Table, Card, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

//פה אנחנו מחליטים על מבנה הטבלה הג'ינירית
export interface GenericTableProps<T> 
{
    title:string ; //כותרת
    columns:ColumnsType<T>; //העמודות , לפי הסוג T 
    data: T[] | undefined; //המערך של הנתונים שמגיע מהשרת
    isLoading: boolean; //האם הנתונים בטעינה
    rowKey: keyof T | ((row : T)=> string | number); //המפתח היחודי של השורה
    onRowClick?:(row: T) => void; //פונקצית לחיצה על שורה - אופציונלי
    extra?: React.ReactNode; //אפשרות למשהו נוסף כמו כפתור או אלמנט
}

//הפוקנציה שמחזירה את הדברים שבפועל יהיו על המסך
export function GenericTable<T> ({
    title , columns , data , isLoading , rowKey , onRowClick , extra ,
}: GenericTableProps<T>)
{
    return (
        <Card
            title={<Title level={3}>{title}</Title>}
            extra={extra}
            style={{marginBottom:24}}

        >
            {/* //פה באה הטבלה בעצמה */}
            <Table<T>
                dataSource = {data}
                columns={columns}
                loading={isLoading}
                rowKey={rowKey as string}
                //onRow - פונקציה שמקבלת נתונים של שורה ספציפית
                //  ומחזירה אוביקט של ארועים ועיצובים שיחולו על אותה שורה
                onRow={(row) => ({
                    onClick: () => onRowClick && onRowClick(row), //במקרה של לחיצה נעביר לפונקית הלחיצה את השורה שנלחצנ
                    style: {cursor: onRowClick ? 'pointer' : 'default'} //פה אנחנו מגדירים שאם העברנו פונקציה של לחיצה הסמן של העכבר יהפוך לסמן של יד ואם לא זה ישאר רגיל
                })}
                locale={{
                    emptyText:'לא נמצאו נתונים להצגה'
                }}
            />

        </Card>
    )
}