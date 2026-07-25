import { Modal } from "antd";

export interface GenericModelProps {
    isOpen:boolean; 
    title:string; 
    onClose: ()=> void;
    onSubmit: ()=> void;
    isLoading?: boolean; 
    children?: React.ReactNode;
}

export const GenericModel: React.FC<GenericModelProps> = ({
    isOpen , title , onClose , onSubmit , isLoading = false , children,
}) => {

    return (
        <Modal
            title={title}
            open={isOpen}
            onCancel={onClose}
            onOk={onSubmit}
            confirmLoading={isLoading}
            okText="אישור"
            cancelText="ביטול"
        >
            {children}
        </Modal>
    )
}