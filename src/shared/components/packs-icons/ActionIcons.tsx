import React from 'react';
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton } from "@mui/material";

type PackIconsPropsType = {
    id: string
    setShowEditModal: (value: boolean) => void
    setShowDelModal: (value: boolean) => void
    itemForEdit: (id: string)=>void
    itemForDelete: (itemId: string)=>void
}

export const ActionIcons:React.FC<PackIconsPropsType> = ({
                                                            id,
                                                            itemForDelete,
                                                            setShowEditModal,
                                                            setShowDelModal,
                                                            itemForEdit}) => {
    const editPackTitleHandler = () => {
        itemForEdit(id)
        setShowEditModal(true)
    }
    const setItemToDeleteHandler = (id: string) => {
        itemForDelete(id)
        setShowDelModal(true)
    }
    return (
        <>
           <IconButton onClick={editPackTitleHandler}>
               <CreateOutlinedIcon color={'primary'} style={{cursor: "pointer"}}/>
           </IconButton>
           <IconButton onClick={()=>setItemToDeleteHandler(id)}>
               <DeleteOutlineIcon color={'action'}  style={{cursor: "pointer"}} />
           </IconButton>
        </>
    );
};

