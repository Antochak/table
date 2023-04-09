import React from 'react';
import { Button } from "@mui/material";
import { MenuBar } from '../../../shared/components/menu-icon/MenuBar';
import {usePackQuery} from "../hooks/usePackQuery";
import { SearchInput } from "../../../shared/components/search-input/SearchInput";
import { ValueSlider } from "../../../shared/components/value-slider/ValueSlider";
import { SetPackModal } from "../../../shared/components/modal-window/SetPackModal";
import { useTableQuery } from "../../../shared/hooks/useTableQuery";
import { FlexContainer } from "../../../shared";
import { CircularLoader } from "../../../shared/components/loader/CircilarLoader";
import { FilterAltOffOutlined } from "@mui/icons-material";
import { ButtonsSwitcher, ButtonsSwitcherOption } from "../../../shared/components/button-group/ButtonGroup";

type PacksSettingsPropsType = {
    initialSettings: {
        switcherCurrentOption?: ButtonsSwitcherOption
        slider?: { minCount?: number, maxCount?: number }
    }
    onSettingsChanged: (settings: {
        searchString?: string
        slider?: { min: number, max: number }
        switcherOption?: ButtonsSwitcherOption
    }) => void
    createPackHandler: (title: string, file: string) => void
}

export const PacksSettings: React.FC<PacksSettingsPropsType> = ({createPackHandler, initialSettings, onSettingsChanged}) => {
    const {setShowAddModal,showAddModal,urlSearchParams,imageMode} = useTableQuery()
    const {CreateLoading} = usePackQuery(urlSearchParams)

    return (
        <>
            <FlexContainer height="100px"  justifyContent="space-between">
                <FlexContainer justifyContent="flex-start">
                    <h2>Packs list</h2>
                    <MenuBar/>
                </FlexContainer>
                <Button
                    style={{width: '150px'}}
                    variant={'outlined'}
                    onClick={()=>setShowAddModal(true)}>Add pack
                </Button>
            </FlexContainer>

            <FlexContainer margin="0 auto" height="100px" flexDirection="row">
                <SearchInput onChangeInput={value => onSettingsChanged({searchString: value})}/>
                <ButtonsSwitcher
                    onOptionChanged={option => onSettingsChanged({switcherOption: option})}
                    currentOption={initialSettings?.switcherCurrentOption || ButtonsSwitcherOption.All}/>
                <ValueSlider
                    onChangeSlider={(minValue, maxValue) => onSettingsChanged({slider: {min: minValue, max: maxValue}})}
                    max={initialSettings?.slider?.maxCount || 0}
                    min={initialSettings?.slider?.minCount || 0}/>
                <FilterAltOffOutlined/>
            </FlexContainer>

            {CreateLoading && <CircularLoader/>}
            {showAddModal && <SetPackModal header={'Create pack'}
                                           imageMode={true}
                                           title={''}
                                           isOpened={showAddModal}
                                           onClose={() => setShowAddModal(false)}
                                           onTitleChanged={(title, image) => createPackHandler(title,image)}
                                         />
            }
        </>
    );
}
