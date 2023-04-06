import React from 'react';
import { IconButton } from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SchoolIcon from "@mui/icons-material/School";

type PackIconsPropsType = {
    showEditButtons?: boolean
    onEditIconClick?: () => void
    onDeleteIconClick?: () => void
    learnIconDisabled?: boolean
    onLearnIconClick?: () => void
}

export const ActionIcons:React.FC<PackIconsPropsType> = (
    {
        showEditButtons,
        onDeleteIconClick,
        onEditIconClick,
        learnIconDisabled,
        onLearnIconClick,
    }) => {
    return <>
        {showEditButtons ? <>
            <IconButton onClick={() => onEditIconClick && onEditIconClick()}>
                <CreateOutlinedIcon color={'primary'} style={{cursor: "pointer"}}/>
            </IconButton>
            <IconButton onClick={() => onDeleteIconClick && onDeleteIconClick()}>
            <DeleteOutlineIcon color={'action'}  style={{cursor: "pointer"}} />
            </IconButton>
        </> : (
            <IconButton disabled={learnIconDisabled} onClick={() => onLearnIconClick && onLearnIconClick()}>
                <SchoolIcon style={{cursor: "pointer"}}/>
            </IconButton>
        )}
    </>;
};
