import React from 'react';
import { PATH } from "../../shared/constants/path";
import { MainTable } from "../../shared/components/table/MainTable";
import { ActionIcons } from "../../shared/components/packs-icons/ActionIcons";
import { Paginations } from "../../shared/components/pagination/Pagination";
import { SearchInput } from "../../shared/components/search-input/SearchInput";
import { SetCardModal } from "../../shared/components/modal-window/SetCardModal";
import { useCardsQuery } from "./hooks/useCardsQuery";
import { useTableQuery } from "../../shared/hooks/useTableQuery";
import { CardsSelector } from "../../shared/components/card-selector/CardsSelector";
import { CircularLoader } from "../../shared/components/loader/CircilarLoader";
import { DeleteItemModal } from "../../shared/components/modal-window/DeleteItemModal";
import { FlexContainer, Image } from "../../shared";
import { Button, TableCell, TableRow, Rating, Link } from "@mui/material";
import defaultLogo from '../../assets/images/logo.png';

export const CardsContainer = () => {
    const {
        navigate,
        setSearchParams,
        onItemsSettingsChange,
        urlSearchParams,
        userData,
        editingModalItem,
        setEditingModalItem,
        deletingModalItem,
        setDeletingModalItem,
        showAddModal,
        setShowAddModal,
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

    const onSetItemToEdit = (item: { id: string, title: string, answer: string }) => setEditingModalItem(item)

    const deleteCardHandler = async (id: string) => {
        await deleteCard({id})
        setDeletingModalItem(null)
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
    const addCardHandler = async (question: string, answer: string, questionImg: string) => {
        await addCard({
            card: {
                cardsPack_id: id,
                question: question,
                answer: answer,
                questionImg: questionImg
            }
        })
        setShowAddModal(false)
    }

    const cardsTHead = ['Question', 'Answer', 'Last Updated', 'Grade', 'Actions'].map((title, index) => (
        <TableCell align="center" key={index + title}>{title}</TableCell>
    ))
    const cardsTBody = cardsData?.cards.map((row) => (
        <TableRow key={row._id}>
            <TableCell align="center">
                <FlexContainer justifyContent="flex-start">
                    {<Image src={row.questionImg ? row.questionImg : defaultLogo}/>}
                    {row.question}
                </FlexContainer>
            </TableCell>
            <TableCell align="center">{row.answer}</TableCell>
            <TableCell align="center">{dateFormatter(row.updated)}</TableCell>
            <TableCell align="center">{<Rating name="read-only" value={row.grade} readOnly/>}</TableCell>
            <TableCell align="center">{userData._id == row.user_id &&
                 <ActionIcons
                    showEditButtons={true}
                    onDeleteIconClick={() => setDeletingModalItem({id: row._id})}
                    onEditIconClick={() => onSetItemToEdit({ id: row._id, title: row.question, answer: row.answer })}
                 />}
            </TableCell>
        </TableRow>
    ))

    return (
        <>
            <FlexContainer width="900px" margin="0 auto" flexDirection="column">
                <FlexContainer height="200px" justifyContent="space-between" alignItems="flex-start">
                    <FlexContainer flexDirection="column" alignItems="self-start">
                        <Link
                            onClick={() => navigate(PATH.PACKS)}
                            style={{textDecoration: 'none', cursor: 'pointer'}}>Back to Packs List
                        </Link>
                        <h2>Pack </h2>
                        <div style={{height: '100px'}}>
                            <Image height="100px" src={cardsData?.packDeckCover ? cardsData?.packDeckCover : defaultLogo}/>
                        </div>

                    </FlexContainer>

                    {userData._id === cardsData?.packUserId
                        ?   <Button
                            variant={'outlined'}
                            style={{width: '200px'}}
                            onClick={() => setShowAddModal(true)}>Add new card
                        </Button>
                        :   <Button
                            variant={'outlined'}
                            style={{width: '150px'}}
                            onClick={() => navigate(`/learn/${id}`)}>Learn card
                        </Button>
                    }
                </FlexContainer>
                <FlexContainer margin="10px 0 10px 0">
                    <SearchInput onChangeInput={value => onItemsSettingsChange({searchString: value})}/>
                </FlexContainer>

                <MainTable tableBody={cardsTBody} tableHead={cardsTHead}/>

                <FlexContainer height="50px" width="100%" margin="10px 0 0 0">
                    <Paginations
                        currentPage={cardsData?.page || 1}
                        pageQuantity={cardsData ? Math.ceil(cardsData.cardsTotalCount / cardsData.pageCount) : 0}
                        onChange={(value) => setSearchParams({page: value})}/>
                    <CardsSelector itemsPerPage={cardsData?.pageCount || 5} onChange={setSearchParams}/>
                </FlexContainer>

                {editingModalItem?.answer &&
                    <SetCardModal
                        question={editingModalItem?.title}
                        answer={editingModalItem?.answer}
                        titleModal={'Update card'}
                        isOpened={!!editingModalItem}
                        onClose={() => setEditingModalItem(null)}
                        onChange={(answer, question) => {
                        editingModalItem && editCardHandler(editingModalItem.id, answer, question)}}/>
                }
                {showAddModal &&
                    <SetCardModal
                        imageMode={true}
                        titleModal={'Add card'}
                        isOpened={showAddModal}
                        onClose={() => setShowAddModal(false)}
                        onChange={(answer, question, questionImg) => addCardHandler(answer, question, questionImg)}/>
                }

                <DeleteItemModal
                    onClose={()=>setDeletingModalItem(null)}
                    isOpened={!!deletingModalItem}
                    itemTitle={'this card'}
                    deleteItemHandler={() => deletingModalItem && deleteCardHandler(deletingModalItem.id)}/>

                {(isLoadingAdd || isLoadingEdit || getLoading) && <CircularLoader/>}
            </FlexContainer>
        </>
    );
};

