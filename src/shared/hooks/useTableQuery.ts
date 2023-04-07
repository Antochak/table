import { useState } from "react";
import { useMeQuery } from "../../features/authentification/api";
import { useAppSelector } from "../../store";
import { ButtonsSwitcherOption } from "../components/button-group/ButtonGroup";
import { useNavigate, useSearchParams } from "react-router-dom";

export const useTableQuery = () => {
    const [showAddModal, setShowAddModal] = useState(false)
    const [editingModalItem, setEditingModalItem] = useState<{ id: string, title?: string, answer?: string } | null>(null)
    const [deletingModalItem, setDeletingModalItem] = useState<{ id: string, title?: string } | null>()
    const [image, setImage] = useState<string | null>(null)

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
    let dateFormatter = (dateISO: string) => {
        let date = new Date(dateISO)
        return date.toLocaleString("en-US", {day: '2-digit', month: 'short', year: 'numeric'})
    }
    return {
        isLoggedIn,
        navigate,
        onItemsSettingsChange,
        urlSearchParams,
        setSearchParams,
        userData,
        showAddModal,
        deletingModalItem,
        setDeletingModalItem,
        setShowAddModal,
        editingModalItem,
        setEditingModalItem,
        dateFormatter,
        image,
        setImage
    }
};
