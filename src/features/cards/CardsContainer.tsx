import React from 'react';
import { PATH } from "../../shared/constants/path";
import { MainTable } from "../../shared/components/table/MainTable";
import { ActionIcons } from "../../shared/components/packs-icons/ActionIcons";
import { Paginations } from "../../shared/components/pagination/Pagination";
import { SearchInput } from "../../shared/components/search-input/SearchInput";
import { SetCardModal } from "../../shared/components/modal-window/SetCardModal";
import { useCardsQuery } from "./hooks/useCardsQuery";
import { FlexContainer } from "../../shared";
import { useTableQuery } from "../../shared/hooks/useTableQuery";
import { CardsSelector } from "../../shared/components/card-selector/CardsSelector";
import { CircularLoader } from "../../shared/components/loader/CircilarLoader";
import { DeleteItemModal } from "../../shared/components/modal-window/DeleteItemModal";
import { Button, TableCell, TableRow, Rating, Link } from "@mui/material";

export const CardsContainer = () => {
    const {
        navigate,
        setSearchParams,
        onItemsSettingsChange,
        urlSearchParams,
        userData,
        cardsTableHead,
        showDelModal,
        showEditModal,
        setShowDelModal,
        setShowEditModal,
        showAddModal,
        setShowAddModal,
        currentItem,
        setCurrentItem,
        dateFormatter
    } = useTableQuery()
    const {
        getLoading,
        cardsData,
        addCard,
        deleteCard,
        editCard,
        isLoadingAdd,
        isLoadingEdit,
        id,
    } = useCardsQuery(urlSearchParams)

    const deleteItemHandler = (id: string) => setCurrentItem(id)
    const onSetItemToEdit = (currentItem: string) => setCurrentItem(currentItem)  // сетаем в стейт  нужный Pack для редактирования

    const deleteCardHandler = async (id: string) => {
        await deleteCard({id})
        setShowDelModal(false)
    }
    const editCardHandler = async (id: string, question: string, answer: string) => {
        await editCard({
            card: {
                _id: id,
                question: question,
                answer: answer
            }
        })
        setShowAddModal(false)
    }
    const addCardHandler = async (question: string, answer: string) => {
        await addCard({
            card: {
                cardsPack_id: id,
                question: question,
                answer: answer
            }
        })
        setShowAddModal(false)
    }

    const cardsTHead = cardsTableHead.map((cell, index) => (
        <TableCell align="center" key={index}>{cell}</TableCell>
    ))
    const cardsTBody = cardsData?.cards.map((row) => (
        <TableRow key={row._id}>
            <TableCell align="center">{row.question}</TableCell>
            <TableCell align="center">{row.answer}</TableCell>
            <TableCell align="center">{dateFormatter(row.updated)}</TableCell>
            <TableCell align="center">{<Rating name="read-only" value={row.grade} readOnly/>}</TableCell>
            <TableCell align="center">{userData._id == row.user_id
            && <ActionIcons
                id={row._id}
                setShowEditModal={setShowEditModal}
                setShowDelModal={setShowDelModal}
                itemForDelete={() => deleteItemHandler(row._id)}
                itemForEdit={() => onSetItemToEdit(row._id)}/>
            }
            </TableCell>
        </TableRow>
    ))

    return (
        <>
            {showEditModal &&
            <SetCardModal
                titleModal={'Update card'}
                isOpened={showEditModal}
                setIsOpened={setShowEditModal}
                onChange={(answer, question) => editCardHandler(currentItem, answer, question)}/>
            }
            {showAddModal &&
            <SetCardModal
                titleModal={'Add card'}
                isOpened={showAddModal}
                setIsOpened={setShowAddModal}
                onChange={(answer, question) => addCardHandler(answer, question)}/>
            }
            {showDelModal &&
            <DeleteItemModal setIsOpened={setShowDelModal}
                             isOpened={showDelModal}
                             itemTitle={'this card'}
                             deleteItemHandler={() => deleteCardHandler(currentItem)}/>}
            <FlexContainer width="900px" height="700px" margin="0 auto" flexDirection="column">
                {(isLoadingAdd || isLoadingEdit || getLoading) &&
                <CircularLoader/>}

                <FlexContainer height="100px" justifyContent="space-between">
                    <FlexContainer flexDirection="column" alignItems="self-start">
                        <Link onClick={() => navigate(PATH.PACKS)} style={{textDecoration: 'none', cursor: 'pointer'}}>Back to Packs List</Link>
                        <h2>Pack </h2>
                    </FlexContainer>
                    {userData._id === cardsData?.packUserId
                        ? <Button variant={'outlined'} style={{width: '200px'}} onClick={() => setShowAddModal(true)}>Add new card</Button>
                        : <Button variant={'outlined'} style={{width: '150px'}} onClick={() => navigate(`/learn/${id}`)}>Learn card</Button>}
                </FlexContainer>

                <SearchInput onChangeInput={value => onItemsSettingsChange({searchString: value})}/>
                <MainTable tableBody={cardsTBody} tableHead={cardsTHead}/>

                <FlexContainer height="50px" width="100%" margin="10px 0 0 0">
                    <Paginations
                        currentPage={cardsData?.page || 1}
                        pageQuantity={cardsData ? Math.ceil(cardsData.cardsTotalCount / cardsData.pageCount) : 0}
                        onChange={(value) => setSearchParams({page: value})}/>
                    <CardsSelector itemsPerPage={cardsData?.pageCount || 5} onChange={setSearchParams}/>
                </FlexContainer>
            </FlexContainer>
        </>
    );
};

