import React, { useEffect } from 'react';
import { PATH } from "../../shared/constants/path";
import { SnackType } from "../../shared/constants/snackType";
import { MainTable } from "../../shared/components/table/MainTable";
import { ActionIcons } from "../../shared/components/packs-icons/ActionIcons";
import { Paginations } from "../../shared/components/pagination/Pagination";
import { usePackQuery } from "./hooks/usePackQuery";
import { SetPackModal } from "../../shared/components/modal-window/SetPackModal";
import { useTableQuery } from "../../shared/hooks/useTableQuery";
import { CardsSelector } from "../../shared/components/card-selector/CardsSelector";
import { PopUpSnackbar } from "../../shared/components/popup-snackbar/PopUpSnackbar";
import { PacksSettings } from "./components/PacksSettings";
import { CircularLoader } from "../../shared/components/loader/CircilarLoader";
import { DeleteItemModal } from "../../shared/components/modal-window/DeleteItemModal";
import { TableCell, TableRow } from "@mui/material";
import { FlexContainer, Image } from "../../shared";
import defaultLogo from '../../assets/images/logo.png';

export const PacksContainer = () => {
    const {
        isLoggedIn,
        navigate,
        setSearchParams,
        onItemsSettingsChange,
        urlSearchParams,
        userData,
        editingModalItem,
        setEditingModalItem,
        deletingModalItem,
        setDeletingModalItem,
        dateFormatter } = useTableQuery()
    const {
        data,
        message,
        changePackTitle,
        deletePack,
        delLoading,
        getLoading,
        error,
        createPack } = usePackQuery(urlSearchParams)

    const createPackHandler = async (title: string, file?: string) => {
        await createPack({
            cardsPack: {
                name: title,
                deckCover: file || '',
                private: false
            }
        })
    }
    const deleteItemHandler = async (id: string) => {
        try {
            await deletePack({id})
        } catch(error) {
            console.warn(error)
        }
        setDeletingModalItem(null)
    }
    const showEditItemModal = (id: string, title: string) => {
        setEditingModalItem({ id, title })
    }
    const updateItemHandler = async (id: string, title: string) => {
        await changePackTitle({
            cardsPack: {
                _id: id,
                name: title
            }
        })
    }
    const openCardHandler = (id: string) => navigate(`/cards-table/${id}`)

    useEffect(()=>{
        if(!isLoggedIn) navigate(PATH.LOGIN)
    },[navigate, isLoggedIn])

    const tableHead = ['Name', 'Cards', 'Last Updated', 'Created by', 'Actions'].map((title,index) => (
        <TableCell align="center" key={index + title}>{title}</TableCell>
    ))
    const tableBody = data?.cardPacks.map((row) => (
        <TableRow key={row._id}>
            <TableCell onClick={()=>openCardHandler(row._id)} style={{cursor: 'pointer'}}>
                <FlexContainer justifyContent="flex-start">
                    {<Image src={row.deckCover ? row.deckCover : defaultLogo}/>}
                    {row.name}
                </FlexContainer>
            </TableCell>
            <TableCell align="center">{row.cardsCount}</TableCell>
            <TableCell align="center">{dateFormatter(row.updated)}</TableCell>
            <TableCell align="center">{row.user_name}</TableCell>
            <TableCell align="center">
                <ActionIcons
                    showEditButtons={userData._id == row.user_id}
                    onDeleteIconClick={() => setDeletingModalItem({ id: row._id, title: row.name })}
                    onEditIconClick={() => showEditItemModal(row._id, row.name)}
                    learnIconDisabled={row.cardsCount === 0}
                    onLearnIconClick={() => navigate(`/learn/${row._id}`)}/>
            </TableCell>
        </TableRow>
    ))

    return (
        <FlexContainer width="900px" margin="0 auto" flexDirection="column">
            <PacksSettings initialSettings={{slider: { minCount: data?.minCardsCount, maxCount: data?.maxCardsCount }}}
                           onSettingsChanged={onItemsSettingsChange} createPackHandler={createPackHandler} />
            <MainTable tableBody={tableBody} tableHead={tableHead}/>
            <FlexContainer height="50px" width="100%" margin="10px 0 0 0">
                <Paginations
                    pageQuantity={data ? Math.ceil(data.cardPacksTotalCount/data.pageCount) : 0}
                    currentPage={data?.page || 1}
                    onChange={(value) => setSearchParams({page: value})}/>
                <CardsSelector itemsPerPage={data?.pageCount || 5} onChange={setSearchParams}/>
            </FlexContainer>

            {editingModalItem?.title && 
                <SetPackModal
                    header={'Update pack'}
                    imageMode={false}
                    title={editingModalItem?.title}
                    isOpened={!!editingModalItem}
                    onClose={() => setEditingModalItem(null)}
                    onTitleChanged={title => editingModalItem && updateItemHandler(editingModalItem.id, title)}/>}

            <DeleteItemModal
                isOpened={!!deletingModalItem}
                onClose={() => setDeletingModalItem(null)}
                itemTitle={deletingModalItem?.title || ''}
                deleteItemHandler={() => deletingModalItem && deleteItemHandler(deletingModalItem.id)}/>

            {(getLoading || delLoading) && <CircularLoader/>}
            {error && <PopUpSnackbar error={message} popUpType={SnackType.ERROR}/>}
        </FlexContainer>
    );
};
