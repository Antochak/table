import { useMeQuery } from "../../features/authentification/api/authApi";
import { useAppSelector } from "../../store";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ButtonsSwitcherOption } from "../components/button-group/ButtonGroup";
import { useState } from "react";

export const useTableQuery = () => {
    const [showAddModal, setShowAddModal] = useState(false)
    const [showDelModal, setShowDelModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    const [currentItem,setCurrentItem] = useState('')
    const [itemTitle,setItemTitle] = useState('')

    const packsTableHead = ['Name', 'Cards', 'Last Updated', 'Created by', 'Actions']
    const cardsTableHead = ['Question', 'Answer', 'Last Updated', 'Grade', 'Actions']

    const {data: userData} = useMeQuery({})
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const navigate = useNavigate()

    const [urlSearchParams, setURLSearchParams] = useSearchParams()
    const setSearchParams = (params: { [key in string]: string }) => {
        const newParams = {...Object.fromEntries(urlSearchParams), ...params}
        const paramKeysToRemove: string[] = Object.entries(params)
            .filter(([, value]) => !value)
            .map(([key]) => key)
        paramKeysToRemove.forEach(paramKey => delete newParams[paramKey])
        setURLSearchParams(newParams)
    }
    const onItemsSettingsChange = (settings: {
        searchString?: string
        slider?: { min: number, max: number }
        switcherOption?: ButtonsSwitcherOption

    }) => {
        setSearchParams({
            packName: settings.searchString ? settings.searchString : '',
            ...(settings.slider ? {
                min: settings.slider.min.toString(),
                max: settings.slider.max.toString(),
            } : {min: '', max: ''}),
            user_id: settings.switcherOption === ButtonsSwitcherOption.My ? userData?._id : undefined,
            cardQuestion: settings.searchString ? settings.searchString : '',
        })
    }
    let dateFormatter = (str: string) => {
        let a = new Date(str)
        return a.toLocaleString("en-US", {day: '2-digit', month: 'short', year: 'numeric'})
    }
    return {
        isLoggedIn,
        navigate,
        onItemsSettingsChange,
        urlSearchParams,
        setSearchParams,
        userData,
        cardsTableHead,
        showAddModal,
        showDelModal,
        showEditModal,
        setShowAddModal,
        setShowDelModal,
        setShowEditModal,
        currentItem,
        setCurrentItem,
        itemTitle,
        setItemTitle,
        packsTableHead,
        dateFormatter
    }
};

