import React from 'react';
import { Table, Card, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

export interface GenericTableProps<T> 
{
    title:string ; 
    columns:ColumnsType<T>; 
    data: T[] | undefined; 
    isLoading: boolean; 
    rowKey: keyof T | ((row : T)=> string | number); 
    onRowClick?:(row: T) => void; 
    extra?: React.ReactNode; 
}

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
            <Table<T>
                dataSource = {data}
                columns={columns}
                loading={isLoading}
                rowKey={rowKey as string}
                onRow={(row) => ({
                    onClick: () => onRowClick && onRowClick(row), 
                    style: {cursor: onRowClick ? 'pointer' : 'default'} 
                })}
                locale={{
                    emptyText:'לא נמצאו נתונים להצגה'
                }}
            />

        </Card>
    )
}