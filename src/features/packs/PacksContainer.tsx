import React, { useEffect } from 'react';
import { PATH } from "../../shared/constants/path";
import { SnackType } from "../../shared/constants/snackType";
import { MainTable } from "../../shared/components/table/MainTable";
import { LearnIcon } from "../../shared/components/packs-icons/learnIcon";
import { ActionIcons } from "../../shared/components/packs-icons/ActionIcons";
import { Paginations } from "../../shared/components/pagination/Pagination";
import { usePackQuery } from "./hooks/usePackQuery";
import { SetPackModal } from "../../shared/components/modal-window/SetPackModal";
import { useTableQuery } from "../../shared/hooks/useTableQuery";
import { FlexContainer } from "../../shared";
import { CardsSelector } from "../../shared/components/card-selector/CardsSelector";
import { PopUpSnackbar } from "../../shared/utils/PopUpSnackbar";
import { PacksSettings } from "./components/PacksSettings";
import { CircularLoader } from "../../shared/components/loader/CircilarLoader";
import { DeleteItemModal } from "../../shared/components/modal-window/DeleteItemModal";
import { TableCell, TableRow } from "@mui/material";

export const PacksContainer = () => {
    const {
        isLoggedIn,
        navigate,
        setSearchParams,
        onItemsSettingsChange,
        urlSearchParams,
        userData,
        showDelModal,
        showEditModal,
        setShowDelModal,
        setShowEditModal,
        currentItem,
        setCurrentItem,
        setItemTitle,
        itemTitle,
        packsTableHead,
        dateFormatter
    } = useTableQuery()
    const {data, message, changePackTitle, deletePack, delLoading, getLoading, error} = usePackQuery(urlSearchParams)

    const onSetItemToDelete = (id: string, itemTitle: string) => {
        setCurrentItem(id)      // удаляем по id
        setItemTitle(itemTitle)  // прокидываем имя item'а в модалку, "Do you really want to delete {itemTitle} ? "
    }
    const deleteItemHandler = async(id: string) => {
        try {
            await deletePack({id})
        } catch(error) {
            console.warn(error)
        }
        setShowDelModal(false)  // удаляем Pack , подтверждая нажатием Ok в модальном окне
    }
    const onSetItemToEdit = (currentItem: string) => setCurrentItem(currentItem)  // сетаем в стейт  нужный Pack для редактирования
    const changePackTitleHandler = async (id: string, title: string) => {
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

    const tableHead = packsTableHead.map((cell,index) => <TableCell align="center" key={index}>{cell}</TableCell>)
    const tableBody = data?.cardPacks.map((row) => (
        <TableRow key={row._id}>
            <TableCell onClick={()=>openCardHandler(row._id)} style={{cursor: 'pointer'}}>{row.name}</TableCell>
            <TableCell align="center">{row.cardsCount}</TableCell>
            <TableCell align="center">{dateFormatter(row.updated)}</TableCell>
            <TableCell align="center">{row.user_name}</TableCell>
            <TableCell align="center">{userData._id == row.user_id
                ? <ActionIcons
                    id={row._id}
                    setShowEditModal={setShowEditModal}
                    setShowDelModal={setShowDelModal}
                    itemForDelete={()=>onSetItemToDelete(row._id, row.name)}
                    itemForEdit={()=>onSetItemToEdit(row._id)} />
                : <LearnIcon packId={row._id} disabled={row.cardsCount === 0}/>}
            </TableCell>
        </TableRow>
    ))

    return (
        <FlexContainer width="900px" height="700px" margin="0 auto" flexDirection="column">
            <PacksSettings initialSettings={{slider: { minCount: data?.minCardsCount, maxCount: data?.maxCardsCount }}}
                           onSettingsChanged={onItemsSettingsChange}/>
            <MainTable tableBody={tableBody} tableHead={tableHead}/>
            <FlexContainer height="50px" width="100%" margin="10px 0 0 0">
                <Paginations
                    pageQuantity={data ? Math.ceil(data.cardPacksTotalCount/data.pageCount) : 0}
                    currentPage={data?.page || 1}
                    onChange={(value) => setSearchParams({page: value})}/>
                <CardsSelector itemsPerPage={data?.pageCount || 5} onChange={setSearchParams}/>
            </FlexContainer>

            {showEditModal &&
                <SetPackModal header={'Update pack'}
                              isOpened={showEditModal}
                              setIsOpened={setShowEditModal}
                              onChangeTitle={(title)=>changePackTitleHandler(currentItem,title)} />
            }

            {showDelModal &&
                <DeleteItemModal setIsOpened={setShowDelModal}
                                 isOpened={showDelModal}
                                 itemTitle={itemTitle}
                                 deleteItemHandler={() => deleteItemHandler(currentItem)}/>
            }

            {(getLoading || delLoading) && <CircularLoader/>}

            {error && <PopUpSnackbar error={message} popUpType={SnackType.ERROR}/>}
        </FlexContainer>
    );
};
