import { Modal } from "antd";

//פה אנחנו מגדירים את המודל שלנו מה הוא יכיל
export interface GenericModelProps {
    isOpen:boolean; //פרמטר שיבדוק האם החלון פתוח או סגור
    title:string; //כותרת הדיאלוג הקופץ
    onClose: ()=> void;//תיהיה פונקציה שהיא אחראית לסגירת הדיאלוג
    onSubmit: ()=> void; //פונקציה ששומרת נתןנים
    isLoading?: boolean; //פרמטר שבודק האם הטופס בטעינה
    children?: React.ReactNode;//להשאיר מקום לעוד נתונים
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
            {/* התכולה פה */}
            {children}
        </Modal>
    )
}